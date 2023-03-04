const $input = document.getElementById('search-item');
const $form = document.querySelector('form');
const $Btn = $form.querySelector('#submit-button');
const $products = document.querySelector('.product-list');

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!$input.value) return;

    for(let i = 0; i < $products.children.length; i++){
        const productName = $products.children[i].querySelector('h2').textContent;
        if(!productName.includes($input.value)) {
            $products.children[i].style.display = 'none';
        }
    }
    // $input.value = '';
});