document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const finalPrice = parseFloat(document.getElementById('finalPrice').value);
  const profit = calculateProfit(ingredients, finalPrice);
  const image = document.getElementById('image').files[0];
  const reader = new FileReader();

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
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
    e.target.reset(); // Limpar o formulário
    ingredients = [];
    document.getElementById('ingredientsList').innerHTML = ''; // Limpar a lista de ingredientes
  };

  if (image) {
    reader.readAsDataURL(image);
  }
});

let ingredients = [];

function addIngredient() {
  const name = document.getElementById('ingredient').value;
  const price = parseFloat(document.getElementById('ingredientPrice').value);
  ingredients.push({ name, price });
  document.getElementById('ingredientsList').innerHTML = ingredients.map((ing) => `<p>${ing.name} - R$ ${ing.price.toFixed(2)}</p>`).join('');
  document.getElementById('ingredient').value = '';
  document.getElementById('ingredientPrice').value = '';
}

function calculateProfit(ingredients, finalPrice) {
  const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  return finalPrice - totalCost;
}

function displayProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  document.getElementById('productsContainer').innerHTML = products.map((product, index) =>
    `<div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>${product.ingredients.map((ing) => `<span>${ing.name} - R$ ${ing.price.toFixed(2)}</span>`).join(', ')}</p>
      <p>Preço Final: R$ ${parseFloat(product.finalPrice).toFixed(2)}</p>
      <p>Lucro: R$ ${parseFloat(product.profit).toFixed(2)}</p>
      <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
      <button onclick="deleteProduct(${index})">Excluir</button>
    </div>`
  ).join('');
}

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}

// Inicializa a listagem de produtos
displayProducts();
