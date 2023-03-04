$count = document.getElementById('countdown');
$playBtn = document.querySelector('.play');
$resetBtn = document.querySelector('.reset');
$down = document.querySelector('.down');

const halfHeight = Math.ceil(($down.offsetHeight)/2);
const startingMinutes = 10;
let time = startingMinutes * 60;
let newHeight = 0;
let intervalID;

const updateCountdown = () => {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0'+ seconds: seconds;
    $count.innerHTML = `${minutes}:${seconds}`;
    time -= 1;

    const unit = +($down.offsetHeight/(startingMinutes * 60));
    if(newHeight > halfHeight){
        $count.style.color = '#000';
    }

    if(time < 0 || unit < 0){
        stopCountdown();
        $playBtn.style.pointerEvents = 'none';
    }
    newHeight += unit;
    $down.style.transform = `translateY(${newHeight}px)`; // (0~210)px
}

const stopCountdown = () => {
    clearInterval(intervalID);
}

const resetCountdown = () => {
    clearInterval(intervalID);

    $count.textContent = `${startingMinutes}:00`;
    $playBtn.style.pointerEvents = "auto";
    $down.style.transform = `translateY(0px)`;
    $count.style.color = '#fff';

    time = startingMinutes * 60;
    newHeight = 0;
}

$playBtn.addEventListener('click', (e) => {
    const icon = $playBtn.querySelector('i');
    const iconClassList = Array.from(icon.classList);
    if(iconClassList.includes('fa-play')){
        intervalID = setInterval(updateCountdown, 1000);
        $playBtn.style.background = "#e9e9e9";
        $playBtn.querySelector('i').style.color = '#e95949';
        icon.classList.replace('fa-play', 'fa-pause');
    }else if(iconClassList.includes('fa-pause')){
        stopCountdown();
        $playBtn.style.background = "#e95949";
        $playBtn.querySelector('i').style.color = '#fff';
        icon.classList.replace('fa-pause', 'fa-play');
    }
});

$resetBtn.addEventListener('click', () => {
    const icon = $playBtn.querySelector('i');
    const iconClassList = Array.from(icon.classList);
    if(iconClassList.includes('fa-pause')) {
        icon.classList.replace('fa-pause', 'fa-play');
    }
    resetCountdown(intervalID);
});