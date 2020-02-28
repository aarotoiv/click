const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const gameSocket = require('./sockets');
let MemoryStore = require('memorystore')(session);

const app = express();
//session setup
let sessionConf = session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    secret: 's3453454sdfggdfdfsgs54g',
    name: 'clickgamesessionthingy',
    resave: true,
    saveUninitialized: true
});
//apply cors and morgan if not in prod
if(process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    }
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}
app.use(sessionConf);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//if in prod, serve the compiled vue app as static files, no matter the url
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
//this is here so it can be called and it initializes session variables correctly
app.get('/', function(req, res) {
    res.send({success: true});
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log("RUNNING IN PORT", port));
//initialize sockets
gameSocket.initSocket(server, sessionConf);