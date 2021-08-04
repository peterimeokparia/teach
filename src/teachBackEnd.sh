echo "Starting BackEndServer"
echo "server..."
exec node "backEnd/server/server.js" &

echo "index..."
exec node "backEnd/start/index.js" "$@"
