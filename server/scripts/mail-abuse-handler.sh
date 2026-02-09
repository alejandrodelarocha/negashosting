#!/bin/bash
# mail-abuse-handler.sh - Auto-suspend accounts exceeding rate limits
# Runs every 5 minutes via cron

LOG="/var/log/mail-abuse.log"
EXIM_LOG="/var/log/exim4/mainlog"
THRESHOLD=3  # number of rate limit hits before suspension
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
ALERT_EMAIL="admin@negashosting.com"

log_msg() {
    echo "[$TIMESTAMP] $1" >> "$LOG"
}

# Find accounts that hit rate limits in the last hour
WINDOW=$(date -d '1 hour ago' '+%Y-%m-%d %H:%M' 2>/dev/null || date -v-1H '+%Y-%m-%d %H:%M')

# Parse rate limit log entries: [limitlog]: log / email / user@domain / rate / period
grep '\[limitlog\]' "$EXIM_LOG" 2>/dev/null | grep -oP '(?<=/ email / )\S+(?= /)' | sort | uniq -c | sort -rn | while read COUNT ACCOUNT; do
    if [ "$COUNT" -ge "$THRESHOLD" ]; then
        DOMAIN=$(echo "$ACCOUNT" | cut -d@ -f2)
        LOCAL=$(echo "$ACCOUNT" | cut -d@ -f1)
        HESTIA_USER=$(stat -c '%U' "/home/*/mail/$DOMAIN" 2>/dev/null | head -1)

        if [ -z "$HESTIA_USER" ]; then
            # Try to find the HestiaCP user that owns this domain
            HESTIA_USER=$(grep -rl "$DOMAIN" /usr/local/hestia/data/users/*/mail.conf 2>/dev/null | head -1 | cut -d/ -f6)
        fi

        if [ -n "$HESTIA_USER" ] && [ -n "$LOCAL" ] && [ -n "$DOMAIN" ]; then
            # Check if already suspended
            SUSPENDED=$(grep "SUSPENDED='yes'" "/usr/local/hestia/data/users/$HESTIA_USER/mail/$DOMAIN.conf" 2>/dev/null | grep "$LOCAL")
            if [ -z "$SUSPENDED" ]; then
                log_msg "SUSPEND: $ACCOUNT (hit rate limit $COUNT times in 1 hour, user=$HESTIA_USER)"
                /usr/local/hestia/bin/v-suspend-mail-account "$HESTIA_USER" "$DOMAIN" "$LOCAL" 2>/dev/null

                # Notify admin
                echo "Auto-suspended mail account $ACCOUNT (rate limit hit $COUNT times in 1 hour). User: $HESTIA_USER" | \
                    exim4 -f "postmaster@negashosting.com" "$ALERT_EMAIL" 2>/dev/null
            fi
        else
            log_msg "WARNING: Could not find HestiaCP user for $ACCOUNT (hits=$COUNT)"
        fi
    fi
done

# Also check for PHP script abuse (web sending)
grep '\[limitlog\]' "$EXIM_LOG" 2>/dev/null | grep '/ account /' | grep -oP '(?<=/ account / )\S+(?= /)' | sort | uniq -c | sort -rn | while read COUNT ACCOUNT; do
    if [ "$COUNT" -ge "$THRESHOLD" ]; then
        log_msg "PHP_ABUSE: User $ACCOUNT sending too many emails via PHP ($COUNT rate limit hits)"
        # Suspend the web user's ability to send mail
        if [ -n "$ACCOUNT" ]; then
            /usr/local/hestia/bin/v-suspend-mail-domains "$ACCOUNT" 2>/dev/null
            log_msg "SUSPEND_DOMAINS: Suspended all mail domains for user $ACCOUNT"
            echo "Auto-suspended all mail domains for user $ACCOUNT (PHP script rate limit hit $COUNT times)" | \
                exim4 -f "postmaster@negashosting.com" "$ALERT_EMAIL" 2>/dev/null
        fi
    fi
done
