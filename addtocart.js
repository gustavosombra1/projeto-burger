const produto = [{
    id: 0,
    image: 'download.jfif',
    title: 'Margueritta',
    price: 30,
},
{
    id: 1,
    image: 'download2.jfif',
    title: 'Calabresa',
    price: 30,
},
{
    id: 2,
    image: 'download3.jfif',
    title: 'Portuguesa',
    price: 35,
},
{
    id: 3,
    image: 'download4.jfif',
    title: 'Frango com Catupiry',
    price: 35,
},

]
const categorias = [...new Set(produto.map((item)=>{
    return item
}))]
    let i = 0
document.querySelector('#root').innerHTML = categorias.map((item)=>{
    var {image, title, price} = item
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>R$${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Adicionar ao carrinho</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart = []
addtocart = (a)=>{
    cart.push({...categorias[a]})
    displaycart()
}

delElement = (a)=>{
    cart.splice(a,1)
    displaycart()
}
displaycart = (a)=>{
    let j = 0, total=0;
    document.querySelector('#count').innerHTML = cart.length
    if(cart.length === 0){
        document.querySelector('#cartItem').innerHTML = "Seu carrinho está vazio"
        document.querySelector('#total').innerHTML = "R$ "+0+".00"
    }else{
        document.querySelector('#cartItem').innerHTML = cart.map((items)=>{
            var {image, title, price} = items;
            total = total + price
            document.querySelector('#total').innerHTML = "R$ "+total+".00"
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style ='font-size:12px;'>${title}</p>
                <h2 style='font-size:15px;'>R$${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+(j++)+")'></i></div>"
            )
        }).join('')
    }
}