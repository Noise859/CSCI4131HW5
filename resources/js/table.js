var tableBody = document.getElementById("tableBody");
var message = document.getElementById("message");

async function removeEntry(ind) {
    const result = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": ind})
    });
    const body = await result.text();
    if(result.ok){
        document.getElementById("contact-" + ind).remove();
        message.innerHTML = "Row successfully deleted.";
    }
    else if(result.status == 404){
        try {
            document.getElementById("contact-" + ind).remove();
        }
        catch {
            console.error("Index does not exist");
        }

        message.innerHTML = "ID did not exist. Removing from table";
    }
    else {
        message.innerHTML = "Error removing table row.<br>Error: " + body;
    }
    
}

async function setSale(){
    const result = await fetch("/api/sale", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"message": document.getElementById("sale-message").value})
    });
    const body = await result.json();
    
    if(result.ok) {
        message.innerHTML = "Banner set to: " + body.message;
    }
    else {
        message.innerHTML = "Error setting banner: " + body.message;
    }
}

async function clearSale(){
    const result = await fetch("/api/sale", {method: "DELETE"});
    
    if(result.ok) {
        message.innerHTML = "Cleared banner";
    }
    else {
        message.innerHTML = "Error clearing banner.";
    }
}

setTimeTo();

setInterval( () => {
    setTimeTo();
}, 1000);

function setTimeTo(){
    var times = document.getElementsByClassName("times");
    var date = Date.parse(new Date());
    for(var i = 0; i < times.length; i++) {
        var prefDate = times[i].innerHTML.split(" ")[0];
        var prefDateMS = Date.parse(prefDate);
        if(prefDateMS != NaN) {
            if(prefDateMS - date < 0) {
                times[i].innerHTML = prefDate + " - PAST";
            }
            else {
                times[i].innerHTML = prefDate + " - " + MStoDHMS(prefDateMS - date);
            }
        }
    }
}

function MStoDHMS (ms) {
    var days = Math.floor(ms / (86400000));
    var hours = Math.floor((ms - days*86400000) / 3600000);
    var minutes = Math.floor((ms - days*86400000 - hours*3600000) / 60000);
    var sec = Math.floor((ms - days*86400000 - hours*3600000 - minutes*60000) / 1000);
    return days + " days, " + hours + " hours, " + minutes + " minutes, " + sec + " seconds left";
  }
