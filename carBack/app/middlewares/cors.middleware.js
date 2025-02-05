exports.allowCrossOriginRequestsMiddleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // allow all origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Authorization header
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE'); // request types
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // for options request
    }
    next();
};