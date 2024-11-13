let totalCompra = localStorage.getItem('totalCompra') || 0;

// Função para exibir campos de acordo com a forma de pagamento selecionada
function displayPaymentFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    document.getElementById('card-fields').style.display = paymentMethod === 'cartao' ? 'block' : 'none';
    document.getElementById('cash-fields').style.display = paymentMethod === 'dinheiro' ? 'block' : 'none';
    document.getElementById('pix-fields').style.display = paymentMethod === 'pix' ? 'block' : 'none';
    document.getElementById('pix-code').style.display = 'none';
}

// Função para gerar um código Pix aleatório
function generatePixCode() {
    const pixCode = 'PIX' + Math.random().toString(36).substr(2, 10).toUpperCase();
    document.getElementById('pix-code-text').innerText = pixCode;
    document.getElementById('pix-code').style.display = 'block';
}

// Função para calcular o troco quando pagamento for em dinheiro
document.getElementById('cash-amount').addEventListener('input', function() {
    const amountPaid = parseFloat(this.value);
    const total = parseFloat(totalCompra);
    const change = amountPaid - total;
    if (change >= 0) {
        document.getElementById('change-message').innerText = `Troco: R$ ${change.toFixed(2)}`;
    } else {
        document.getElementById('change-message').innerText = 'Valor insuficiente para o pagamento';
    }
});

// Função para confirmar o pagamento
function confirmPayment() {
    const paymentMethod = document.getElementById('payment-method').value;

    if (!paymentMethod) {
        alert('Por favor, selecione uma forma de pagamento.');
        return;
    }

    if (paymentMethod === 'cartao') {
        const name = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const cardCVC = document.getElementById('card-cvc').value;

        if (!name || !cardNumber || !cardCVC) {
            alert('Por favor, preencha todos os campos do cartão.');
            return;
        }
        alert('Pagamento com cartão confirmado!');

    } else if (paymentMethod === 'dinheiro') {
        const amountPaid = parseFloat(document.getElementById('cash-amount').value);
        const total = parseFloat(totalCompra);

        if (isNaN(amountPaid) || amountPaid < total) {
            alert('Quantia insuficiente para pagamento.');
            return;
        }
        alert('Pagamento em dinheiro confirmado! Troco: R$ ' + (amountPaid - total).toFixed(2));

    } else if (paymentMethod === 'pix') {
        alert('Pagamento via Pix confirmado!');
    }

    // Limpa o carrinho e finaliza a compra
    // localStorage.removeItem('products');
    // localStorage.removeItem('totalCompra');
    window.location.href = '../clientes/addtocart.html'; // Redireciona para a página inicial
    
}

// Armazena o total da compra no localStorage ao finalizar
function setTotalCompra(total) {
    localStorage.setItem('totalCompra', total);
}

setTotalCompra(parseFloat(document.querySelector('#total').textContent.replace('R$', '')));