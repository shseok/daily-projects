const $alarm = document.querySelector('.alarm');
const $wrapper = document.querySelector('.wrapper');
const $form = $wrapper.querySelector('form');
const $input = $form.querySelector('input');
const $infoText = $form.querySelector('p');
const $closeBtn = $wrapper.querySelector('.close');
const $copyBtn = $wrapper.querySelector('.copy');

function fetchRequest(formData, file){
    $infoText.innerText = 'QR Code 스캐닝 중...'
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body: formData
    }).then((res) => res.json()).then((result) => {
        const url =  result[0].symbol[0].data;
        $infoText.innerText = url ? '스캔을 위해 QR Code 업로드' : 'QR Code 스캔 실패😔';
        if(!url) return;
        $wrapper.querySelector('img').src = URL.createObjectURL(file)
        $wrapper.querySelector('textarea').innerText = url;
        $wrapper.classList.add('active');
    }).catch(() => {
        console.log('QR Code 스캔 실패😔')
    });
}

$input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetchRequest(formData, file);
})

$form.addEventListener('click', () => {
    $input.click();
});

let isExcute = true; // 여러번 클릭시 이벤트 겹침 방지

$copyBtn.addEventListener('click', () => {
    const text = $wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
    $alarm.classList.add('active');
    if(isExcute) {
        isExcute = false;
        setTimeout(() => {
            $alarm.classList.remove('active');
            isExcute = true;
        }, 2000);
    }
});

$closeBtn.addEventListener('click', () => {
    $wrapper.classList.remove('active');
});