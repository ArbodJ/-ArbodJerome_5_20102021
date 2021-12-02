const url = 'http://localhost:3000/api/products';


// Recuperation de l'id du produit selectionné dans la page index
function getId() {
  let id = new URLSearchParams(window.location.search).get("id"); // id du click de index.html
  if(!id){
    alert('ERR : Api non disponible ou non trouvé');
  }
  console.log(id);
  getProduct(id); // appel de fonction pour json
}
// Appel de JSON
async function getProduct(id) {
  let requete = await fetch(url + '/' + id, {
    method  : 'GET',
  });
  console.log(requete);
  
  if(!requete.ok) {
    alert('Err : Un Prob !!!');
  }
  else {
    let canap =  await requete.json();
    console.log(canap);
    getDisplay(canap);
  }   
}
// Affichage du produit selectionné de la page index
function getDisplay(canap){ // Inserrer les elements a leurs places
  // l'image du canapé
  let productImg = document.createElement("img"); 
  productImg.setAttribute('src', canap.imageUrl);
  productImg.setAttribute('alt', canap.altTxt);
  document.getElementsByClassName('item__img')[0].append(productImg); // placement de l'image
  // Afficher le nom du canapé
  document.getElementById('title').append(canap.name); 
  // Afficher le prix du canapé
  document.getElementById('price').append(canap.price); 
  // Afficher la description du canapé
  document.getElementById('description').append(canap.description); 
  // selection de la couleur
  let selectColor = document.getElementById("colors");
  canap.colors.forEach(function(color){
    let option = document.createElement('option');
    option.setAttribute('value', color);
    option.textContent = color;
    selectColor.append(option);
  });
  // Appel du button 'ajouter au panier' et controle du click
  let btn = document.getElementById('addToCart');
  btn.idProduct = canap._id;
  btn.addEventListener('click', (event) => {
    btn.setAttribute('disabled', 'disabled');
    addToCart(event);
  });
}

function addToCart(event) {
  let btn = event.target;
  let selectedColor = document.getElementById('colors').value;
  let selectedQty = parseInt(document.getElementById('quantity').value);

  if('' === selectedColor){ // Test de choix de couleur
    alert('Err :: Couleur non selectionné');
    return false;
  }

  if(selectedQty <= 0 || selectedQty > 100){
    alert('Err :: La quantité n\'as pas été selectionné, ou superieur a 100');
    return false;
  }

  let selection = { // Creation objet : selection du produit
    idProduct : btn.idProduct,
    colorProduct : selectedColor ,
    numberProduct : selectedQty
  }

  let cart = getCart();
    if (cart.length){
      let updated = false;
      for (let i in cart) {
        if (cart[i].idProduct === selection.idProduct && cart[i].colorProduct === selection.colorProduct){
            cart[i].numberProduct += selection.numberProduct;
            updated = true;
        }
      }
      if (!updated) {
        cart.push(selection);
      } 
    } else {
      cart.push(selection);
    }
  localStorage.setItem("selectionProd", JSON.stringify(cart));
  btn.removeAttribute('disabled');
  console.log(selection);  
}

function getCart() {
  let resultAdd = [];
  
  if(!localStorage.getItem("selectionProd")){
     return resultAdd;
  }
  return JSON.parse(localStorage.getItem('selectionProd'));
}

document.addEventListener('DOMContentLoaded', () => {
  getId();
});
