document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let i = 0;
    
    // Carregar o carrinho do localStorage ou inicializar um carrinho vazio
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelector('#root').innerHTML = products.map((item) => {
        var { name, description, finalPrice, image } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src='${image}' alt='${name}'></img>
                </div>
            <div class='bottom'>
            <p>${name}</p>
            <p>${description}</p>
            <h2>R$${finalPrice.toFixed(2)}</h2>` +
            "<button onclick='addtocart(" + (i++) + ")'>Adicionar ao carrinho</button>" +
            `</div>
            </div>`
        );
    }).join('');

    // Atualizar o localStorage sempre que o carrinho é modificado
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    addtocart = (a) => {
        cart.push({ ...products[a] });
        updateLocalStorage();
        displaycart();
    }

    delElement = (a) => {
        cart.splice(a, 1);
        updateLocalStorage();
        displaycart();
    }

    displaycart = () => {
        let j = 0, total = 0;
        document.querySelector('#count').innerHTML = cart.length;
        if (cart.length === 0) {
            document.querySelector('#cartItem').innerHTML = "Seu carrinho está vazio";
            document.querySelector('#total').innerHTML = "R$ " + 0 + ".00";
        } else {
            document.querySelector('#cartItem').innerHTML = cart.map((items, index) => {
                var { name, finalPrice, image } = items;
                total += finalPrice;
                document.querySelector('#total').innerHTML = "R$ " + total.toFixed(2);
                return (
                    `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src='${image}' alt='${name}'>
                    </div>
                    <p style ='font-size:12px;'>${name}</p>
                    <h2 style='font-size:15px;'>R$${finalPrice.toFixed(2)}</h2>` +
                    `<i class='fa-solid fa-trash' onclick='delElement(${index})'></i></div>`
                );
            }).join('');
        }
    }

    finalizePurchase = () => {
        const total = parseFloat(document.querySelector('#total').textContent.replace('R$', '').trim());
    
        if (total > 0) {
            // Salva o valor total e o carrinho separadamente no localStorage
            localStorage.setItem('totalCompra', total.toFixed(2));
            localStorage.setItem('cart', JSON.stringify(cart));  // Armazena o carrinho no localStorage
            console.log("Carrinho salvo:", cart);
            
            // Confirma que os produtos ainda estão no localStorage
            const productsCheck = JSON.parse(localStorage.getItem('products'));
            console.log("Produtos no localStorage antes de redirecionar:", productsCheck);
    
            // Redireciona para a página de pagamento
            window.location.href = '../pagamento/payment.html';
        } else {
            alert("Seu carrinho está vazio!");
        }
    }
    

    // Inicializa a exibição do carrinho
    displaycart();
});
