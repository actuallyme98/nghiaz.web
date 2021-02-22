import express from 'express';
import { Express } from 'express';
import { AppServer } from './app-server';

export const appServer: AppServer = new AppServer();

/*
 * Start application server
 */
export async function start() {
  console.log('Starting application...');
  const app = express();
  // Create express application
  const appt = await appServer.initalize(app);

  // listening
  const port = process.env.PORT || 5000;
  appt.listen(port, () => {
    `Server started on port ${port}`;
  });
}

start();
