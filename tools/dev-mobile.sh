#!/usr/bin/env bash
# Serve the dev site to phones on the same Wi-Fi at http://portfolio.local:<port>.
set -euo pipefail

NAME="${DEV_MOBILE_NAME:-portfolio}"
PORT="${DEV_MOBILE_PORT:-4321}"

# The interface holding the default route is the one the phone can reach.
lan_ip() {
  local iface
  iface=$(route -n get default 2>/dev/null | awk '/interface: /{print $2}')
  [ -n "$iface" ] && ipconfig getifaddr "$iface" 2>/dev/null && return
  ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null
}

IP=$(lan_ip || true)
if [ -z "$IP" ]; then
  echo "dev-mobile: no LAN address found. Are you on Wi-Fi?" >&2
  exit 1
fi

# The Bonjour record pins one port, so pick a free one before advertising it;
# otherwise Astro slides to the next port and the URL below is a lie.
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  echo "dev-mobile: port $PORT is busy, trying $((PORT + 1))" >&2
  PORT=$((PORT + 1))
done

# Proxy-register $NAME.local at this machine: no sudo, no system hostname change.
dns-sd -P "$NAME" _http._tcp local "$PORT" "$NAME.local" "$IP" >/dev/null 2>&1 &
DNS_PID=$!
trap 'kill "$DNS_PID" 2>/dev/null || true' EXIT INT TERM

printf '\n  Phone URL:  \033[1mhttp://%s.local:%s\033[0m   (%s)\n\n' "$NAME" "$PORT" "$IP"

exec npx astro dev --host --port "$PORT"
