'use strict';
const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const ErroException = require('../helpers/httpErroException');
const RouteRepository = require('../repositories/tolls.repository')
const Utils = require('../utils/maps.utils')

class RouteModel {
    constructor() {}

    async tolls(req, res) {
        try {
            let result = []

            const polyline = req.body.polyline;
            const points = Utils.getLatLngPolyline(polyline)
            
            const repository = new RouteRepository();
            const tolls = await repository.getTolls();

            for (let i = 0; i < tolls.length; i++) {
                for (let j = 0; j < points.length; j++) {
                    let distance = Utils.getDistancePoints(tolls[i].latitude, tolls[i].longitude, points[j][0], points[j][1])
                    if (distance <= 1) {
                        result.push(tolls[i]);
                        break;
                    }
                }
            }

            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        }
        catch (err) {
            if (err instanceof ErroException) {
                Response.responseAPI.error(res, HttpStatusCode.UNPROCESSABLE_ENTITY, err.message);
            } else {
                Response.responseAPI.error(res, HttpStatusCode.INTERNAL_SERVER_ERROR, err.message);
            }
        }
    }
}

module.exports = RouteModel;