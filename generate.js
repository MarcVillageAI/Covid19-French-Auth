window.addEventListener("DOMContentLoaded", (event) => {
    var data = window.location.hash.substr(1);
    if(!data){
        // Stay compatible with previous version search param
        data = window.location.search;
    }
    const urlParams = new URLSearchParams(data);
    document.getElementById("field-firstname").value = urlParams.get("f"); //firstname
    document.getElementById("field-lastname").value = urlParams.get("l"); //lastname
    document.getElementById("field-birthday").value = urlParams.get("b"); //birthday
    document.getElementById("field-placeofbirth").value = urlParams.get("p"); //place of born
    document.getElementById("field-address").value = urlParams.get("a"); //address
    document.getElementById("field-city").value = urlParams.get("c"); //city
    document.getElementById("field-zipcode").value = urlParams.get("z"); //zipcode

    const reason = urlParams.get("r"); //reason
    document.getElementById("radio-travail").checked = (reason==='travail');
    document.getElementById("radio-sante").checked = (reason==='sante');
    document.getElementById("radio-famille").checked = (reason==='famille');
    document.getElementById("radio-handicap").checked = (reason==='handicap');
    document.getElementById("radio-convocation").checked = (reason==='convocation');
    document.getElementById("radio-missions").checked = (reason==='missions');
    document.getElementById("radio-transits").checked = (reason==='transits');
    document.getElementById("radio-animaux").checked = (reason==='animaux');

    var now = new Date()
    if (urlParams.has("t")) {
        const timedelta = urlParams.get("t"); //timedelta (in minutes)
        now = new Date(now - timedelta * 60000)
    }
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Paris"

    document.getElementById('field-datesortie').value = now.toJSON().slice(0,10);
    document.getElementById('field-heuresortie').value = now.toLocaleString("fr-FR", {timeZone: timeZone
        , hour: "2-digit", minute: "2-digit", hour12: false});
    setTimeout(() => {
        document.getElementById("generate-btn").click()
    }, 500)
    setTimeout(() => {
        document.getElementById("loading").style.display = "none"
        if (isFacebookBrowser()) {
            document.getElementById("facebook").style.display = "block"
        } else {
            document.getElementById("done").style.display = "block"
        }
    }, 1500)
});

function badScriptLoading(event) {
    console.log("Official JS is not working. Patching using local copy.")
    let script = document.createElement('script');
    script.src = "attestation-couvre-feu-covid-19/main.36f6dadf.js";
    document.head.append(script)
}

function isFacebookBrowser () {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    return ua.indexOf('FBAN') !== -1 || ua.indexOf('FBAV') !== -1
}

