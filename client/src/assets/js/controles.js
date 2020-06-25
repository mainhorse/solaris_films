let video = document.getElementById('video');
        let play = document.getElementById('play');
        let pausar = document.getElementById('pausa');
        let volume = document.getElementById('alto');
        let reversa = document.getElementById('reversa');
        let adelante = document.getElementById('adelante');
        let bajo = document.getElementById('bajo');
    
      

        var initVolume = 0.5
        var initTime = 0;

        play.addEventListener('click', () => {
            video.play();
            video.volume = initVolume;
        })

        pausar.addEventListener('click', () => {
            video.pause();
        })

        alto.addEventListener('click', () => {
            initVolume += .1;
            video.volume = initVolume;
        })

        bajo.addEventListener('click', () => {
            initVolume -= .1;
            video.volume = initVolume;
        })

        adelante.addEventListener('click', () => {
            var actualTime = video.currentTime;
            video.currentTime = actualTime + 5;
        })

        reversa.addEventListener('click', () => {
            var actualTime = video.currentTime;
            video.currentTime = actualTime - 5;
        })



// FullScreen


document.getElementById("entrar").addEventListener("click", function(e){
  getFullscreen(document.getElementById("video"));
},false);

function getFullscreen(element){
  if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
}
