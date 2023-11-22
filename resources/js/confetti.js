var rot3D = [];
var iterations = 0;
var confettiPieces;
function startConfetti() {
    for(var i=0;i<100;i++) {
        rot3D[i] = [];
        rot3D[i][0] = Math.round(Math.random()*3);
        rot3D[i][1] = Math.round(Math.random()*3);
        rot3D[i][2] = Math.round(Math.random()*3);
        rot3D[i][3] = Math.random()*180;
        document.getElementById("confettiContainer").innerHTML += `
        <div class="confettiPiece" style="transition: margin-top ${Math.random()*6+4}s linear, transform .5s linear; margin-top: -5vh;width: 20px; height: 40px; background-color:rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255});position:absolute;margin-left:${window.innerWidth*Math.random()}px;"></div>
        `;
    }
    setTimeout(function() {
        confettiPieces = document.getElementsByClassName("confettiPiece");
        for (var i = 0; i<confettiPieces.length;i++) {
            confettiPieces[i].style.marginTop = "102vh";
        }
    },500);   
    setInterval(rotateConfetti, 500);
}
function rotateConfetti() {
    if(iterations<25) {
        for (var i = 0; i<confettiPieces.length;i++) {
            confettiPieces[i].style.transform = `rotate3d(${rot3D[i][0]}, ${rot3D[i][1]}, ${rot3D[i][2]}, ${rot3D[i][3]+iterations*150}deg)`;
        }
        iterations++;
    }
}