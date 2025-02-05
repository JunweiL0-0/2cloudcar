const express = require('express');
const { allowCrossOriginRequestsMiddleware } = require('../app/middlewares/cors.middleware');
const bodyParser = require('body-parser');
const logger = require("../app/middlewares/logger");
const multer = require('multer');
const rawBodyParser = require('../app/middlewares/rawbodyparser');


// Determine correct body parser to use
const jsonParser = bodyParser.json();
const rawParser = rawBodyParser.rawParser;
const upload = multer({ limits: { fileSize: 20e6 } });
const multipartParser = upload.single('csv');  // 20 MB

function dynamicBodyParser(req, res, next) {
    const contentType = req.header('Content-Type') || '';
    if (contentType === 'image/jpeg' || contentType === 'image/png' || contentType === 'image/gif' || contentType === 'text/plain') {
        rawParser(req, res, next);
    } else if (contentType.startsWith('multipart/form-data')) {
        multipartParser(req, res, next);
    } else {
        jsonParser(req, res, next);
    }
}

module.exports = function () {
    const app = express();
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(express.json()); // Json parser
    // app.use(bodyParser.urlencoded({ extended: false })); // Body parser
    // app.use(bodyParser.json());
    app.use(dynamicBodyParser); // needed for mix request images and json
    app.use(logger); // Pretty printing
    app.use((req, res, next) => {
        console.log(`##### ${req.method} ${req.path} #####`);
        next();
    });
    app.rootUrl = '/api'

    // ROUTES //
    require('../app/routes/car')(app);

    return app;
}