const carController = require('../controllers/car');

module.exports = function(app) {
    const baseUrl = app.rootUrl;

    app.route(baseUrl + '/car')
        .get(carController.getFilteredCars) // RESTFul Request
}