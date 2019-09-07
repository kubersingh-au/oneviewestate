async function getParkData(latlngData) {
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
        let data1_info = data.features[0].attributes;
        let data2_info = data.features[1].attributes;
        
        let addr1 = `${data1_info.HOUSE_NUMBER} ${data1_info.STREET_ADDRESS}, ${data1_info.SUBURB} ${data1_info.POST_CODE}`;
        let addr2 = `${data2_info.HOUSE_NUMBER} ${data2_info.STREET_ADDRESS}, ${data2_info.SUBURB} ${data2_info.POST_CODE}`;

        let latlng1 = {
            "latitude": data1_info.LAT,
            "longitude": data1_info.LONG
        }
        let latlng2 = {
            "latitude": data2_info.LAT,
            "longitude": data2_info.LONG
        }

        let outputData = [
            {
                "name": data1_info.PARK_NAME,
                "lat": data1_info.LAT,
                "lng": data1_info.LONG,
                "address": addr1,
                "distance": Math.round(getDistanceBetweenLatLngs(latlng, latlng1)*100)/100
            },
            {
                "name": data2_info.PARK_NAME,
                "lat": data2_info.LAT,
                "lng": data2_info.LONG,
                "address": addr2,
                "distance": Math.round(getDistanceBetweenLatLngs(latlng, latlng2)*100)/100
            }
        ]
        return outputData;
    });
}