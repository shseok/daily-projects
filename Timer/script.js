$count = document.getElementById('countdown');
$playBtn = document.querySelector('.play');
$resetBtn = document.querySelector('.reset');
$down = document.querySelector('.down');

const startingMinutes = 10;
let time = startingMinutes * 60;
let intervalID;
let newHeight = 0;

const updateCountdown = () => {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0'+ seconds: seconds;
    $count.innerHTML = `${minutes}:${seconds}`;
    time -= 1;
    const halfHeight = Math.ceil(($down.offsetHeight)/2);
    const unit = +($down.offsetHeight/(startingMinutes * 60));
    console.log(time, unit); // 600~0
    if(newHeight > halfHeight){
        $count.style.color = '#000';
    }

    if(time < 0 || unit < 0){
        console.log(time, unit);
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
    $count.textContent = `${startingMinutes}:00`;
    clearInterval(intervalID);
    $playBtn.style.pointerEvents = "auto";
    $down.style.transform = `translateY(0px)`;
    time = startingMinutes * 60;
    newHeight = 0;
    $count.style.color = '#fff';
}

$playBtn.addEventListener('click', (e) => {
    const icon = $playBtn.querySelector('i');
    const iconClassList = Array.from(icon.classList);
    if(iconClassList.includes('fa-play')){
        icon.classList.replace('fa-play', 'fa-pause');
        $playBtn.style.background = "#e9e9e9";
        $playBtn.querySelector('i').style.color = '#e95949';
        intervalID = setInterval(updateCountdown, 100);
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