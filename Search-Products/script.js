const $input = document.getElementById('search-item');
const $form = document.querySelector('form');
const $Btn = $form.querySelector('#submit-button');
const $products = document.querySelector('.product-list');

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./products.json').then((rs) => rs.json()).then(({results}) =>{
        results.forEach((each) => {
            const $product = document.createElement('div');
            $product.classList.add('product')
            const $details = document.createElement('div');
            $details.classList.add('details')
            const $name = document.createElement('h2');
            const $price = document.createElement('h3');
            $name.textContent = each.productName;
            $price.textContent = each.price;
            $details.append($name, $price);
            $product.append($details);
            $products.append($product);
        });
    });
    console.log($products)
});

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!$input.value) return;

    for(let i = 0; i < $products.children.length; i++){
        const productName = $products.children[i].querySelector('h2').textContent;
        if(!productName.includes($input.value)) {
            $products.children[i].style.display = 'none';
        }
    }
});

$input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        if(!$input.value){
            for(let i = 0; i < $products.children.length; i++){
                $products.children[i].style.display = 'block';
            }
        }else{
            $Btn.click();
        }
    }

})