const $wrapper = document.querySelector('.wrapper');
const $qrInput = document.querySelector('.form input');
const $generatorBtn = document.getElementById('btn');
const $qrImg = document.querySelector('.qr-code img');

function generateQRCode(){
    const qrValue = $qrInput.value;
    if(!qrValue || qrValue.trim().length === 0) return;
    $generatorBtn.innerHTML = 'QR Code 생성중...';
    $qrImg.src = ` https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    $qrImg.addEventListener('load', () => {
        $wrapper.classList.add('active');
        $generatorBtn.innerHTML = 'QR Code 생성하기...';
    });
}

$generatorBtn.addEventListener('click', generateQRCode);

$qrInput.addEventListener('keyup', (e) => {
    const qrValue = $qrInput.value;
    if(e.keyCode === 13){
        e.preventDefault();
        $generatorBtn.click();
    }
    if(!qrValue || qrValue.trim().length === 0){
        $wrapper.classList.remove('active');
    }
});