  GNU nano 4.8                                              editor.sh                                                         
#!/bin/sh
# Prepare the environment
src/bin/installDeps.sh "$@" || exit 1

# Move to the node folder and start
log "Starting Etherpad..."

exec node src/node/server.js "$@"