import serverObjects from '../Server/Server.js';

const localPort = 9005;

serverObjects?.server.listen(localPort, () => {
    console.log('listening on', localPort);
});