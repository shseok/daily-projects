const $sec = document.querySelector('.sec');
const $min = document.querySelector('.min');
const $hr = document.querySelector('.hr');

const intervalId = setInterval(() => {
    const dayJs = new dayjs();
    const sec = dayJs.second() * 6; // 360도를 돌아야함
    const min = dayJs.minute() * 6; // 360도를 돌아야함 (60*6)
    const hr = dayJs.hour() * 30; // (24*30) > 720도는 360도를 의미
    $sec.style.transform = `rotateZ(${sec}deg`;
    $min.style.transform = `rotateZ(${min}deg`;
    $hr.style.transform = `rotateZ(${hr+(min/12)}deg`;
});