async function runCode() {
    let llD = await getLatLongData("Broadwater%20Road,Brisbane", 5);
    let parkData = await getParkData(llD);
    localStorage.setItem("park-data", JSON.stringify(parkData))
}

window.addEventListener("load", runCode)