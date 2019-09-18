"use strict";

module.exports.responseAPI = {

    success: function (res, data, statusCode) {
        res.status(statusCode).send({ data: data });
    },

    error: async function (res, statusCode, errorMsg) {
        res.status(statusCode).send({ message: errorMsg });
    }
}