import serverObjects from '../server/server.js';

const localPort = 9001;

serverObjects?.server.listen(localPort, () => {
    console.log('listening on', localPort);
});