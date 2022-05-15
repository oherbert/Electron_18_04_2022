import appServer from './AppServer';

const app = appServer.getInstance();

const server = app.server.listen(4000, () => {
  console.log('App start');
});

export default server;
