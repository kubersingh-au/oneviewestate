async function runCode() {
    let address = getArgs();
    let llD = await getLatLongData(address);
    let parkData = await getParkData(llD);
    localStorage.setItem("park-data", JSON.stringify(parkData));
    let transitData = await getTransitData(llD);
    localStorage.setItem("transit-data", JSON.stringify(transitData));
    //window.location.href = "OneViewResults.html";
}

function getArgs() {
    let urlGet = window.location.search;
    let getArgs = urlGet.split("&");
    
    let street = getArgs[0].split("?address=")[1];
    let city = getArgs[1].split("city=")[1];
    let state = getArgs[2].split("state=")[1];
    let zip = getArgs[3].split("zip=")[1];

    let finalAddress = `${street},${city}+${zip},+${state}`;
    console.log(finalAddress);
    return finalAddress;
}

window.addEventListener("load", runCode)