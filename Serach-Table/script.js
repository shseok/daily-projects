const $searchInput = document.querySelector('.search-wrapper input');
const $userInfos = document.querySelectorAll('tbody tr');

$searchInput.addEventListener('input', (e) => {
    const target = e.target.value;
    console.log(target);
    if(!target || target.trim() === ''){
        $userInfos.forEach((userInfo,idx) =>{
            userInfo.classList.remove('hide');
            userInfo.style.backgroundColor = idx%2 === 0 ? '#f3f5f9' : '#ffffff';
        });
        return;
    }
    $userInfos.forEach((userInfo, idx) => {
        userInfo.classList.toggle('hide', !userInfo.textContent.toLowerCase().includes(target.toLowerCase()));
        userInfo.style.transitionDelay = `${idx/25}s`;
    });

    document.querySelectorAll('tbody tr:not(.hide)').forEach((userInfo, i) => userInfo.style.background =
        i%2 === 0 ? '#f3f5f9' : '#ffffff');

})