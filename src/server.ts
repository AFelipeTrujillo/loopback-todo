import { TodoApplication } from './application'
import { ApplicationConfig } from '@loopback/core';
import { Request, Response } from 'express';
import pEvent from 'p-event';
import * as path from 'path';
import * as express from 'express';

export class ExpressServer {
  private app: express.Application;
  private lbApp: TodoApplication;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new TodoApplication(options);
    this.app.use('/api', this.lbApp.requestHandler);

    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/home.html'));
    });

    this.app.use(express.static('public'));
  }

  async boot() {
    await this.lbApp.boot();
  }

  async start() {
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    const server = this.app.listen(port, host);
    await pEvent(server, 'listening');
  }
}
