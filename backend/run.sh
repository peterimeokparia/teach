echo "Starting Back End Servers."

echo "server..."
exec node "server/server.js" &

echo "index..."
exec node "start/index.js" "$@"
