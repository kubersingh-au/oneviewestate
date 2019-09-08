async function getTransitData(latlngData, numStops=5) {
    let latN = latlngData.latitude.min;
    let latX = latlngData.latitude.max;
    let lngN = latlngData.longitude.min;
    let lngX = latlngData.longitude.max;
    let latlng = {
        "latitude": (latX + latN) / 2,
        "longitude": (lngX + lngN) / 2
    }
    
    var outputData = [];

    let count = 0;
    let data = getRelevantData();
    for (let d = 0; d < data[0].length; d++) {
        if ((data[1][d] < latX) && (data[1][d] > latN) && (data[2][d] < lngX) && (data[2][d] > lngN)) {
            count++;
            let latlngS = {
                "latitude": data[1][d],
                "longitude": data[2][d]
            }
            let dist = Math.round(getDistanceBetweenLatLngs(latlng, latlngS)*100)/100;
            let addr = await getAddressData(latlngS);
            let outputEntry = {
                "name": data[0][d].replace('"', ''),
                "lat": data[1][d],
                "lng": data[2][d],
                "address": addr,
                "distance": dist
            }
            outputData.push(outputEntry);
        }
        if (count >= numStops) {
            break;
        }
    }

    console.log(outputData);
    return outputData;
}

function getRelevantData() {
    let transit_stops = getStopsCSV();
    let transit_stops_split = transit_stops.split(",");
    let stop_names = [];
    let stop_lat = [];
    let stop_lng = [];
    transit_stops_split.forEach((value, index) => {
        if ((value.indexOf("-2") !== -1) || (value.indexOf("-3") !== -1)) {
            stop_names.push(`${transit_stops_split[index-3]}:${transit_stops_split[index-2]}`);
            stop_lat.push(parseFloat(value));
            stop_lng.push(parseFloat(transit_stops_split[index+1]));
        }
    });

    return [stop_names, stop_lat, stop_lng];
}