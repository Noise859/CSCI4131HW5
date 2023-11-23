var banner = document.getElementById("banner");
setInterval(async function() {
    const result = await fetch("/api/sale", {method: "GET"});
    const body = await result.text();
    if(result.ok) {
        if(body) {
            banner.style.padding = "15px 0";
            banner.innerHTML = body;
        }
        else {
            banner.style.padding = "0px";
            banner.innerHTML = "";
        }
    }
    else {
        console.error("Could not set banner.");
    }
}, 1000);