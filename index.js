const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const gameSocket = require('./sockets');
let MemoryStore = require('memorystore')(session);

const app = express();

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

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}
app.use(sessionConf);
app.use(cors(corsOptions));
if(process.env.NODE !== 'production') 
    app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}
app.get('/', function(req, res) {
    res.send({success: true});
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log("RUNNING IN PORT", port));

gameSocket.initSocket(server, sessionConf);