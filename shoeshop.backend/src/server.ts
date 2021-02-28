import express from 'express';
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
  console.log(`Server started on port ${port}`); // force console.log
  appt.listen(port, () => {
    `Server started on port ${port}`;
  });
}

start();
