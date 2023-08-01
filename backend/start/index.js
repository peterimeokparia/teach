const { serverObjects, app } = require('../server/server.js');

const localPort = 9005;

serverObjects()?.server.listen(localPort, () => {
    console.log('listening on', localPort);
});
