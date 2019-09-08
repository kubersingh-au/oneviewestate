let loadingStatusElement;

async function runCode() {
    loadingStatusElement = document.getElementById("loading-state");

    let address = getArgs();
    let llD = await getLatLongData(address);
    loadingStatusElement.innerHTML += "Converted address to GPS<br/>"
    
    parkAPI(llD);
    await transitAPI(llD);
    
    window.setTimeout(function() {
        window.location.href = "OneViewResults.html";
    }, 500);
}

async function parkAPI(llD) {
    let parkDataP = getParkData(llD);
    let parkData = await parkDataP;
    localStorage.setItem("park-data", JSON.stringify(parkData));
    loadingStatusElement.innerHTML += "Found all nearby parks<br/>";
}

async function transitAPI(llD) {
    let transitDataP = getTransitData(llD);
    let transitData = await transitDataP;
    localStorage.setItem("transit-data", JSON.stringify(transitData));
    loadingStatusElement.innerHTML += "Found all nearby transit stations<br/>";
}

function getArgs() {
    let urlGet = window.location.search;
    let getArgs = urlGet.split("&");
    
    let street = getArgs[0].split("?address=")[1];
    let city = getArgs[1].split("suburb=")[1];
    let state = getArgs[2].split("state=")[1];
    let zip = getArgs[3].split("zip=")[1];

    let finalAddress = `${street},${city}+${zip},+${state}`;
    loadingStatusElement.innerHTML += "Got Address from Input<br/>"
    return finalAddress;
}

window.addEventListener("load", runCode)