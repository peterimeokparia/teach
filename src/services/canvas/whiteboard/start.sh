echo  "Starting Whiteboard..."

exec pm2 start "npm run start:prod" --name whiteboard "$@"
