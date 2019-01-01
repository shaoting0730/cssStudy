window.onload = function () {
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");

    
    
    var music = document.getElementById("music");
    var audio = document.getElementsByTagName("audio")[0];

    // 音乐停止,停止光盘
    audio.addEventListener("ended", function (event) {
        music.setAttribute("class", "");
    }, false);

    music.onclick = function () {
        if (audio.paused) {
            audio.play();
            this.setAttribute("class", "play");
        } else {
            audio.pause();
            this.setAttribute("class", "");
        }
    };

    page1.addEventListener("touchstart",function(event) {
            page1.style.display = 'none';
            page2.style.display = 'block';
            page3.style.display = 'block';
            page3.style.top = '100%';

            setTimeout(function(){
                page2.setAttribute("class", "page fadeOut");
                page3.setAttribute("class", "page fadeIn");

            },5500);
    },false);
}
