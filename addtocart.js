document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let i = 0;
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
        )
    }).join('');

    var cart = [];

    addtocart = (a) => {
        cart.push({ ...products[a] });
        displaycart();
    }

    delElement = (a) => {
        cart.splice(a, 1);
        displaycart();
    }

    displaycart = () => {
        let j = 0, total = 0;
        document.querySelector('#count').innerHTML = cart.length;
        if (cart.length === 0) {
            document.querySelector('#cartItem').innerHTML = "Seu carrinho está vazio";
            document.querySelector('#total').innerHTML = "R$ " + 0 + ".00";
        } else {
            document.querySelector('#cartItem').innerHTML = cart.map((items) => {
                var { name, finalPrice, image } = items;
                total = total + finalPrice;
                document.querySelector('#total').innerHTML = "R$ " + total.toFixed(2);
                return (
                    `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src='${image}' alt='${name}'>
                    </div>
                    <p style ='font-size:12px;'>${name}</p>
                    <h2 style='font-size:15px;'>R$${finalPrice.toFixed(2)}</h2>` +
                    "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
                )
            }).join('');
        }
    }
});
