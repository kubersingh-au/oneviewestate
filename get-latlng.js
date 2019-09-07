async function getLatLongData(address, range=1) {
    const API_KEY = "afec3173bc3b4d5fae15bc5646cfe2a9";

    let url = `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${address}`;
    let rangeDeg = rangeToDeg(range);
    return await fetch(url)
    .then(async function(request) {
        return request.json();
    })
    .then(async function(data) {
        console.log(data);
        let latN = data.results[0].geometry.lat - rangeDeg;
        let latX = data.results[0].geometry.lat + rangeDeg;
        let lngN = data.results[0].geometry.lng - rangeDeg;
        let lngX = data.results[0].geometry.lng + rangeDeg;
        let output = {
            "latitude": {
                "min": latN,
                "max": latX
            }, 
            "longitude": {
                "min": lngN,
                "max": lngX
            }, 
        }
        return output;
    })
}

function rangeToDeg(km) {
    const circumference_earth = 2 * 3.14159 * 6350;
    return 360 * (km / circumference_earth)
}

function degToKm(deg) {
    const circumference_earth = 2 * 3.14159 * 6350;
    return (deg / 360) * circumference_earth;
}

function getDistanceBetweenLatLngs(latlng1, latlng2) {
    let lat1 = latlng1.latitude;
    let lng1 = latlng1.longitude;
    let lat2 = latlng2.latitude;
    let lng2 = latlng2.longitude;

    let diffLat = lat2 - lat1;
    let diffLng = lng2 - lng1;

    let distDeg = Math.sqrt(Math.pow(degToKm(diffLat), 2) + Math.pow(degToKm(diffLng), 2));
    return distDeg;
}