async function getParkData(latlngData, numParks=2) {
    let latN = latlngData.latitude.min;
    let latX = latlngData.latitude.max;
    let lngN = latlngData.longitude.min;
    let lngX = latlngData.longitude.max;
    let latlng = {
        "latitude": (latX + latN) / 2,
        "longitude": (lngX + lngN) / 2
    }
    let url = `https://services2.arcgis.com/dEKgZETqwmDAh1rP/arcgis/rest/services/Park_Locations/FeatureServer/0/query?where=LONG%20%3E%3D%20${lngN}%20AND%20LONG%20%3C%3D%20${lngX}%20AND%20LAT%20%3E%3D%20${latN}%20AND%20LAT%20%3C%3D%20${latX}&outFields=PARK_NUMBER,PARK_NAME,HOUSE_NUMBER,STREET_ADDRESS,SUBURB,POST_CODE,LONG,LAT&outSR=4326&f=json`;
    
    return await fetch(url)
    .then(async function(response) {
        return response.json()
    })
    .then(async function(data) {
        console.log(data);
        let outputData = [];

        for (let n = 0; n < numParks; n++) {
            let data_info = data.features[n].attributes;
            let addr = `${data_info.HOUSE_NUMBER} ${data_info.STREET_ADDRESS}, ${data_info.SUBURB} ${data_info.POST_CODE}`;
            let latlngP = {
                "latitude": data_info.LAT,
                "longitude": data_info.LONG
            }
            let dist = Math.round(getDistanceBetweenLatLngs(latlng, latlngP)*100)/100;

            let outputEntry = {
                "name": data_info.PARK_NAME,
                "lat": data_info.LAT,
                "lng": data_info.LONG,
                "address": addr,
                "distance": dist
            }
            outputData.push(outputEntry);
        }

        return outputData;
    });
}