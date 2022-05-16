import getApiConfig from 'config/api';
import appServer from './AppServer';
/// ///////////////////////////// não esta sendo usado
const app = appServer.getInstance();
const { port } = getApiConfig();

const server = app.server.listen(port, () => {
  console.log(`App start ${port}`);
});

export default server;
