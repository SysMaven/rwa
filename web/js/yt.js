// Youtube

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '2c7NV66YzKA',
        playerVars: {
            autoplay: 1,
            loop: 0,
            controls: 0,
            showinfo: 0,
            autohide: 1,
            playsinline: 1,
            mute: 1,
            modestbranding: 1,
            vq: 'hd1080'
        },
        events: {
            'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
        }
    });

    //Custom
    const iframe = player.g;
    iframe.classList.add('rounded');
}

function onPlayerReady(event) {
    event.target.mute();
    setTimeout(function() {
        event.target.playVideo();
    }, 0);
}

function onPlayerStateChange(event) {
    console.log(event.data);
}