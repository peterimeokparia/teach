  GNU nano 2.5.3                                                                              File: start.sh                                                                                                                                                                   

echo "Starting Whiteboard In Production..."


SCRIPTPATH=$(pwd -P)
exec node "$SCRIPTPATH/whiteboard/scripts/server.js" "$@"