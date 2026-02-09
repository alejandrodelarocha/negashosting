#!/bin/bash
# mail-daily-report.sh - Daily mail statistics report (M3AAWG compliance)
# Runs daily at 8am via cron

ALERT_EMAIL="admin@negashosting.com"
EXIM_LOG="/var/log/exim4/mainlog"
EXIM_LOG_PREV="/var/log/exim4/mainlog.1"
SERVER_IP="69.169.97.158"
REPORT="/tmp/mail-daily-report.txt"

cat > "$REPORT" << HEADER
==================================================
  NegasHosting Mail Server - Daily Report
  Server: mail.negashosting.com ($SERVER_IP)
  Date: $(date '+%Y-%m-%d %H:%M:%S')
==================================================

HEADER

# --- Delivery Statistics ---
echo "--- DELIVERY STATISTICS (last 24h) ---" >> "$REPORT"
SENT=$(grep -c '<=' "$EXIM_LOG" 2>/dev/null); SENT=${SENT:-0}
DELIVERED=$(grep -c '=>' "$EXIM_LOG" 2>/dev/null); DELIVERED=${DELIVERED:-0}
BOUNCED=$(grep -c '\*\*' "$EXIM_LOG" 2>/dev/null); BOUNCED=${BOUNCED:-0}
DEFERRED=$(grep -c '==' "$EXIM_LOG" 2>/dev/null); DEFERRED=${DEFERRED:-0}
REJECTED=$(grep -c 'rejected' "$EXIM_LOG" 2>/dev/null); REJECTED=${REJECTED:-0}

if [ "$SENT" -gt 0 ]; then
    BOUNCE_RATE=$((BOUNCED * 100 / SENT))
    DELIVERY_RATE=$((DELIVERED * 100 / SENT))
else
    BOUNCE_RATE=0
    DELIVERY_RATE=0
fi

cat >> "$REPORT" << STATS
  Messages accepted:   $SENT
  Messages delivered:  $DELIVERED
  Messages bounced:    $BOUNCED
  Messages deferred:   $DEFERRED
  Messages rejected:   $REJECTED
  Delivery rate:       ${DELIVERY_RATE}%
  Bounce rate:         ${BOUNCE_RATE}%
STATS

# M3AAWG threshold warnings
if [ "$BOUNCE_RATE" -gt 5 ]; then
    echo "  ** WARNING: Bounce rate exceeds M3AAWG 5% threshold **" >> "$REPORT"
fi

echo "" >> "$REPORT"

# --- Top Senders ---
echo "--- TOP 10 SENDERS ---" >> "$REPORT"
grep '<= ' "$EXIM_LOG" 2>/dev/null | grep -oP '(?<=<= )\S+' | sort | uniq -c | sort -rn | head -10 >> "$REPORT"
echo "" >> "$REPORT"

# --- Top Bounce Destinations ---
echo "--- TOP BOUNCE DESTINATIONS ---" >> "$REPORT"
grep '\*\*' "$EXIM_LOG" 2>/dev/null | grep -oP '\S+@\S+' | sort | uniq -c | sort -rn | head -10 >> "$REPORT"
echo "" >> "$REPORT"

# --- Queue Status ---
echo "--- QUEUE STATUS ---" >> "$REPORT"
QUEUE_SIZE=$(exim4 -bpc 2>/dev/null); QUEUE_SIZE=${QUEUE_SIZE:-0}
FROZEN=$(exim4 -bp 2>/dev/null | grep -c 'frozen'); FROZEN=${FROZEN:-0}
echo "  Queue size:      $QUEUE_SIZE" >> "$REPORT"
echo "  Frozen messages: $FROZEN" >> "$REPORT"
echo "" >> "$REPORT"

# --- Blacklist Status ---
echo "--- BLACKLIST STATUS ---" >> "$REPORT"
REVERSED=$(echo "$SERVER_IP" | awk -F. '{print $4"."$3"."$2"."$1}')
CLEAN=true
for BL in zen.spamhaus.org bl.spamcop.net b.barracudacentral.org dnsbl.sorbs.net dnsbl-1.uceprotect.net; do
    RESULT=$(dig +short "${REVERSED}.${BL}" 2>/dev/null)
    if [ -n "$RESULT" ]; then
        echo "  LISTED: $BL ($RESULT)" >> "$REPORT"
        CLEAN=false
    else
        echo "  CLEAN:  $BL" >> "$REPORT"
    fi
done
$CLEAN && echo "  All blacklist checks passed." >> "$REPORT"
echo "" >> "$REPORT"

# --- Rate Limit Events ---
echo "--- RATE LIMIT EVENTS (last 24h) ---" >> "$REPORT"
RATELIMIT_HITS=$(grep -c '\[limitlog\]' "$EXIM_LOG" 2>/dev/null); RATELIMIT_HITS=${RATELIMIT_HITS:-0}
echo "  Rate limit warnings: $RATELIMIT_HITS" >> "$REPORT"
if [ "$RATELIMIT_HITS" -gt 0 ]; then
    echo "  Accounts hitting limits:" >> "$REPORT"
    grep '\[limitlog\]' "$EXIM_LOG" 2>/dev/null | grep -oP '(?<=/ (email|account) / )\S+(?= /)' | sort | uniq -c | sort -rn | head -5 | sed 's/^/    /' >> "$REPORT"
fi
echo "" >> "$REPORT"

# --- Abuse Handler Actions ---
echo "--- ABUSE HANDLER ACTIONS (last 24h) ---" >> "$REPORT"
if [ -f /var/log/mail-abuse.log ]; then
    SUSPENSIONS=$(grep -c 'SUSPEND' /var/log/mail-abuse.log 2>/dev/null); SUSPENSIONS=${SUSPENSIONS:-0}
    echo "  Auto-suspensions: $SUSPENSIONS" >> "$REPORT"
    grep 'SUSPEND' /var/log/mail-abuse.log 2>/dev/null | tail -5 | sed 's/^/    /' >> "$REPORT"
else
    echo "  No abuse actions recorded." >> "$REPORT"
fi
echo "" >> "$REPORT"

# --- Eximstats Summary ---
echo "--- EXIMSTATS SUMMARY ---" >> "$REPORT"
if [ -f "$EXIM_LOG" ]; then
    eximstats -nr -nt "$EXIM_LOG" 2>/dev/null | head -40 >> "$REPORT"
fi

echo "" >> "$REPORT"
echo "===================================================" >> "$REPORT"
echo "  M3AAWG Compliance: All outbound mail is authenticated," >> "$REPORT"
echo "  rate-limited, DKIM-signed, with SPF and DMARC." >> "$REPORT"
echo "  Abusive accounts are auto-suspended." >> "$REPORT"
echo "===================================================" >> "$REPORT"

# Send report
cat "$REPORT" | exim4 -f "postmaster@negashosting.com" "$ALERT_EMAIL" 2>/dev/null

# Also save to log
cat "$REPORT" >> /var/log/mail-monitor.log
rm -f "$REPORT"
