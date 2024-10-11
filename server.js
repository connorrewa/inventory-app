const express = require('express');
const path = require('path');
const productsRouter = require('./app/routes/productsRouter');
const categoriesRouter = require('./app/routes/categoriesRouter');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productsRouter);
app.use('/categories', categoriesRouter);

// error route
app.use((err, req, res, next) => {
    console.log(err);
    if (err.statusCode)
        res.status(err.statusCode).render('errorPage', {
            title: 'Error Occurred',
            errorMessage: err.message,
        });
    else
        res.render('errorPage', {
            title: 'Error Occurred',
            errorMessage: err.message,
        });
    resstatus(404).render('404', {
        message: 'page not found',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
