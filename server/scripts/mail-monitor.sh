#!/bin/bash
# mail-monitor.sh - M3AAWG compliant mail health monitor
# Runs every 15 minutes via cron

LOG="/var/log/mail-monitor.log"
EXIM_LOG="/var/log/exim4/mainlog"
ALERT_EMAIL="admin@negashosting.com"
SERVER_IP="69.169.97.158"
QUEUE_THRESHOLD=50
BOUNCE_RATE_THRESHOLD=5  # percent
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

log_msg() {
    echo "[$TIMESTAMP] $1" >> "$LOG"
}

# --- Queue Size ---
QUEUE_SIZE=$(exim4 -bpc 2>/dev/null); QUEUE_SIZE=${QUEUE_SIZE:-0}
log_msg "QUEUE_SIZE=$QUEUE_SIZE"

if [ "$QUEUE_SIZE" -gt "$QUEUE_THRESHOLD" ]; then
    log_msg "ALERT: Queue size $QUEUE_SIZE exceeds threshold $QUEUE_THRESHOLD"
    echo "Mail queue has $QUEUE_SIZE messages (threshold: $QUEUE_THRESHOLD)" | \
        exim4 -f "postmaster@negashosting.com" "$ALERT_EMAIL" 2>/dev/null
fi

# --- Bounce Rate (last hour) ---
HOUR_AGO=$(date -d '1 hour ago' '+%Y-%m-%d %H:%M:%S' 2>/dev/null || date -v-1H '+%Y-%m-%d %H:%M:%S')
SENT=$(grep -c '<=' "$EXIM_LOG" 2>/dev/null); SENT=${SENT:-0}
BOUNCED=$(grep -c '\*\*' "$EXIM_LOG" 2>/dev/null); BOUNCED=${BOUNCED:-0}

if [ "$SENT" -gt 0 ]; then
    BOUNCE_RATE=$((BOUNCED * 100 / SENT))
else
    BOUNCE_RATE=0
fi

log_msg "BOUNCE_RATE=${BOUNCE_RATE}% (sent=$SENT bounced=$BOUNCED)"

if [ "$BOUNCE_RATE" -gt "$BOUNCE_RATE_THRESHOLD" ]; then
    log_msg "ALERT: Bounce rate ${BOUNCE_RATE}% exceeds threshold ${BOUNCE_RATE_THRESHOLD}%"
fi

# --- Blacklist Check ---
REVERSED=$(echo "$SERVER_IP" | awk -F. '{print $4"."$3"."$2"."$1}')
BLACKLISTS="zen.spamhaus.org bl.spamcop.net b.barracudacentral.org dnsbl.sorbs.net"

for BL in $BLACKLISTS; do
    RESULT=$(dig +short "${REVERSED}.${BL}" 2>/dev/null)
    if [ -n "$RESULT" ]; then
        log_msg "BLACKLIST: Listed on $BL ($RESULT)"
        echo "ALERT: Server IP $SERVER_IP is listed on $BL ($RESULT)" | \
            exim4 -f "postmaster@negashosting.com" "$ALERT_EMAIL" 2>/dev/null
    fi
done
log_msg "BLACKLIST_CHECK=completed"

# --- Top Senders (last hour from today's log) ---
TOP_SENDERS=$(grep '<= ' "$EXIM_LOG" 2>/dev/null | grep -oP '(?<=<= )\S+' | sort | uniq -c | sort -rn | head -5)
log_msg "TOP_SENDERS:"
echo "$TOP_SENDERS" | while read COUNT SENDER; do
    [ -n "$COUNT" ] && log_msg "  $COUNT $SENDER"
done

# --- Frozen Messages Cleanup (older than 24h) ---
FROZEN_COUNT=$(exim4 -bp 2>/dev/null | grep -c 'frozen'); FROZEN_COUNT=${FROZEN_COUNT:-0}
log_msg "FROZEN_MESSAGES=$FROZEN_COUNT"

if [ "$FROZEN_COUNT" -gt 0 ]; then
    exim4 -bp 2>/dev/null | awk '/\*\*\* frozen \*\*\*/{print $3}' | while read MSGID; do
        AGE=$(exim4 -Mvh "$MSGID" 2>/dev/null | grep -oP '(?<=-received_time_usec )\d+' | head -1)
        if [ -n "$MSGID" ]; then
            # Remove frozen messages older than 24h
            exim4 -Mrm "$MSGID" 2>/dev/null
            log_msg "FROZEN_REMOVED=$MSGID"
        fi
    done
fi

# --- Deferred Messages ---
DEFERRED=$(grep -c 'defer' "$EXIM_LOG" 2>/dev/null); DEFERRED=${DEFERRED:-0}
log_msg "DEFERRED_COUNT=$DEFERRED"

log_msg "--- monitor cycle complete ---"
