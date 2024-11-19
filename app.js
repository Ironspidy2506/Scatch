const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connections");
const expressSession = require('express-session');
const flash = require('express-flash');

require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
// Kisi route pe ho aur aapne waha pe flash message create kar diya, aur phir aap redirect maar sakte ho agle route pe and aap data access karr paoge uss route se aaya hua
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Server is listening on 3000');
});
