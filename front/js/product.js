const url = 'http://localhost:3000/api/products';


// Recuperation de l'id du produit selectionné dans la page index
function getId() {
  // permet d'acceder aux arguments decodés de la requete GET contenu dans URL
  let id = new URLSearchParams(window.location.search).get("id"); 
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
/**
 *  Affichage et insertion des elements du DOM
 *  du produit selectionné de la page index.html 
 */
function getDisplay(canap){ 
  // ----- l'image du canapé ----- //
  let productImg = document.createElement("img"); 
  productImg.setAttribute('src', canap.imageUrl);
  productImg.setAttribute('alt', canap.altTxt);
  document.getElementsByClassName('item__img')[0].append(productImg); // placement de l'image
  // ----- Afficher le nom du canapé ----- //
  document.getElementById('title').textContent = canap.name; 
  // ----- Afficher le prix du canapé ----- //
  document.getElementById('price').textContent = canap.price; 
  // ----- Afficher la description du canapé ----- //
  document.getElementById('description').textContent = canap.description; 
  // ----- selection de la couleur ----- //
  let selectColor = document.getElementById("colors");
  canap.colors.forEach(function(color){
    let option = document.createElement('option');
    option.setAttribute('value', color);
    option.textContent = color;
    selectColor.append(option);
  });

  // ----- Appel du button 'ajouter au panier' et evenement du click ----- //
  let btn = document.getElementById('addToCart');
  btn.idProduct = canap._id;
  btn.nameProduct = canap.name;
  btn.priceProduct = canap.price;
  btn.imageProduct = canap.imageUrl;
  btn.altProduct = canap.altTxt;
  // ----- Evenement sur le bouton ----- //
  btn.addEventListener('click', (event) => {
    btn.setAttribute('disabled', 'disabled');
    addToCart(event);
  });
}

// ----- Ajouter au panier ----- //
function addToCart(event) {
  let btn = event.target; // on se refere a l'element 'btn' cliqué
  let selectedColor = document.getElementById('colors').value;
  let selectedQty = parseInt(document.getElementById('quantity').value);
  
  // ----- Creation objet : selection du produit ----- //
  let selection = { 
    idProduct : btn.idProduct,
    colorProduct : selectedColor ,
    numberProduct : selectedQty
  }

  btn.removeAttribute('disabled');
  // Test du choix de couleur
  if('' === selectedColor){ 
    alert('Err :: Couleur non selectionné');
    btn.removeAttribute('disabled');
    return false;
  }

  // Test de la quantitée choisie
  if(selectedQty <= 0 || selectedQty > 100){
    alert('Err :: le nombre d\'article doit être compris entre 1 et 100');
    btn.removeAttribute('disabled');
    return false;
  }
  // On test et on calcul si il une modification sur l'element choisit
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
  // on creer le nouveau localstorage
  localStorage.setItem("selectionProd", JSON.stringify(cart)); 
}
// ----- Sauvegarde des données selectionnés ----- //
function getCart() {
  let resultAdd = [];
  // si different du localstorage selectionné
  if(!localStorage.getItem("selectionProd")){
    alert('ERR :: Un probleme est survenue')
    return resultAdd; // On arrete le processus
  }
  alert('Votre achat a bien été ajouter au panier.')
  // sinon on retourne le localstorage selectionné
  return JSON.parse(localStorage.getItem("selectionProd"));
}
/**
 *  DOMContentLoaded est emis lorsque le document HTML
 *  a été completement chargé et analysé, sans attendre
 *  que les feuilees de style, images et sous dossiers
 *  aient terminé de charger
 */
document.addEventListener('DOMContentLoaded', () => {
  getId();
});
