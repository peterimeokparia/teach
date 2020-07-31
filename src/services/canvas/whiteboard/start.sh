echo "Starting Whiteboard In Production..."


SCRIPTPATH=$(pwd -P)
exec node "$SCRIPTPATH/whiteboard/scripts/server.js" "$@"

