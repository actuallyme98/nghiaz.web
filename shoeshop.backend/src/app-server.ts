import express, { NextFunction, Request, Response, Express } from 'express';
import bearerToken from 'express-bearer-token';
import session from 'express-session';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import glob from 'glob';
import dotenv from 'dotenv';
import cors from 'cors';

// load .env
dotenv.config();

export class AppServer {
  constructor(public app?: Express) {
    if (app === undefined) {
      this.app = express();
    }
  }

  // start express application
  public async initalize(app: Express) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Bearer token middleware for express.
    app.use(bearerToken());

    // logger
    app.use(morgan('dev'));

    // cors
    app.use(cors());

    // bodyParser
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // cookieParser
    app.use(cookieParser());

    // session
    let sess: session.SessionOptions = {
      secret: process.env.SESSION_SECRET || '',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: parseInt(process.env.SESSION_COOKIE_MAXAGE || '86400'),
      },
    };

    app.use(session(sess));

    // Setup express middlewares
    let middlewares = glob.sync(__dirname + '/middlewares/*.+(js|ts)');

    for (let middleware of middlewares) {
      try {
        console.log(`Loading middleware [${path.basename(middleware)}] successed`);
        await require(middleware)(app);
      } catch (err) {
        console.log(`Loading middleware [${path.basename(middleware)}] failed : ${err.message}`);
        process.exit(1);
      }
    }

    // Setup express routes
    let routes = glob.sync(__dirname + '/routes/*.+(js|ts)');
    for (let route of routes) {
      console.log('Loading route : ' + route);
      require(route)(app);
    }

    // catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      res.render('not-found', {
        title: 'Not Found',
      });
    });

    return app;
  }
}
