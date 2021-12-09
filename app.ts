import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';
import {applicationRoutes} from './routes/application-routes';
import {helpers} from './utils/handlebar-util';
import {overrideMiddleware} from "./utils/method-override";
import session from 'express-session';
import {sessionUserSettings} from './utils/session-middleware';

import exphbs from 'express-handlebars';
import {Settings} from './utils/session-middleware';

//new for TS
declare global {
  namespace Express {
    interface Request {
      settings: Settings;
    }
  }
}

export const app = express();
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: "default",
  helpers: {
    ...helpers
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
app.set('defaultLayout', 'main');

app.use(express.static(path.resolve('public')));
app.use(overrideMiddleware);

app.use(express.static(path.resolve('public')));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(sessionUserSettings);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(applicationRoutes);


