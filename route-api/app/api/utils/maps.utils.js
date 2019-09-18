'use stricts'
const GooglePolyline = require( 'google-polyline' )

module.exports = {
    getLatLngPolyline: function(polyline) {
        return GooglePolyline.decode(polyline)
    },

    getDistancePoints: function(lat1, lng1, lat2, lng2) {
        let R = 6371

        let dLat = (lat2 - lat1) * (Math.PI / 180)
        let dLon = (lng2 - lng1) * (Math.PI / 180)

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let d = R * c

        return d
    }
}