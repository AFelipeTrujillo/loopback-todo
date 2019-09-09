import { TodoApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { ExpressServer } from './server';

export { TodoApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new ExpressServer(options);
  await app.boot();
  await app.start();
  console.log('Server is running at http://127.0.0.1:3000');
  return app;
}
