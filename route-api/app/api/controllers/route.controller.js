'use strict';

const RouteModel = require('../models/route.model');

module.exports.tolls = function(req, res) {
    const model = new RouteModel();
    model.tolls(req, res)
}