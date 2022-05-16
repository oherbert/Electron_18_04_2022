export default interface IApiConfig {
  port: number;
  routes: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    sql: string;
  };
}
