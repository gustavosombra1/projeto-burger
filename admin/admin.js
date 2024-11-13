document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const finalPrice = parseFloat(document.getElementById('finalPrice').value);
  const profit = calculateProfit(ingredients, finalPrice);
  const image = document.getElementById('image').files[0];
  const reader = new FileReader();
  const productId = document.getElementById('productId').value;

  reader.onloadend = () => {
    const product = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      ingredients: ingredients,
      finalPrice: isNaN(finalPrice) ? 0 : finalPrice,
      profit: isNaN(profit) ? 0 : profit,
      image: reader.result,
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (productId) {
      products[productId] = product;
    } else {
      products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
    e.target.reset(); // Limpar o formulário
    ingredients = [];
    document.getElementById('ingredientsList').innerHTML = ''; // Limpar a lista de ingredientes
    document.getElementById('productId').value = '';
    document.getElementById('profit').value = '';
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    alert('Por favor, selecione uma imagem.');
  }
});

let ingredients = [];

function addIngredient() {
  const name = document.getElementById('ingredient').value;
  const price = parseFloat(document.getElementById('ingredientPrice').value);
  if (name && !isNaN(price)) {
    ingredients.push({ name, price });
  }
  document.getElementById('ingredientsList').innerHTML = ingredients.map((ing) => `<p>${ing.name} - R$ ${ing.price.toFixed(2)}</p>`).join('');
  document.getElementById('ingredient').value = '';
  document.getElementById('ingredientPrice').value = '';
  updateProfit();
}

function calculateProfit(ingredients, finalPrice) {
  const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  return finalPrice - totalCost;
}

function updateProfit() {
  const finalPrice = parseFloat(document.getElementById('finalPrice').value);
  const profit = calculateProfit(ingredients, finalPrice);
  document.getElementById('profit').value = isNaN(profit) ? '' : `R$ ${profit.toFixed(2)}`;
}

function displayProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  document.getElementById('productsContainer').innerHTML = products.map((product, index) =>
      `<div class="product">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>${product.ingredients.map((ing) => `<span>${ing.name} - R$ ${ing.price.toFixed(2)}</span>`).join(', ')}</p>
          <p>Preço Final: R$ ${parseFloat(product.finalPrice).toFixed(2)}</p>
          <p>Lucro: R$ ${parseFloat(product.profit).toFixed(2)}</p>
          <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
          <div>
              <button class="btn" onclick="editProduct(${index})">Editar</button>
              <button class="btn" onclick="deleteProduct(${index})">Excluir</button>
          </div>
      </div>`
  ).join('');

  // Confirma que os produtos estão carregados corretamente
  console.log("Produtos carregados no displayProducts:", products);
}

// Inicializa a listagem de produtos
displayProducts();



function editProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products[index];
  
  document.getElementById('productId').value = index;
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('finalPrice').value = product.finalPrice;
  
  ingredients = product.ingredients || [];
  document.getElementById('ingredientsList').innerHTML = ingredients.map((ing) => `<p>${ing.name} - R$ ${ing.price.toFixed(2)}</p>`).join('');
  updateProfit();
}

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}

// Inicializa a listagem de produtos
displayProducts();
