/**
 *  DOMContentLoaded est emis lorsque le document HTML
 *  a été completement chargéet analysé, sans attendre
 *  que les feuilees de style, images et sous dossiers
 *  aient terminé de charger
 */
document.addEventListener('DOMContentLoaded', () => {
  initCart();
});

// ----- Fonction d'envois des données selectionné et confirmé
function initCart(){ 
  // envoyer une chaîne de données au serveur en modifiant la propriété search
  const catchUrl = window.location.search; 
  // constructeur crée et retourne un nouvel URLSearchParams objetc
  const catchOrderId = new URLSearchParams(catchUrl);
  if(catchOrderId.get('name') !== null){
    const idLocation = document.querySelector("#orderId");
    idLocation.textContent = catchOrderId.get('name');
    return false;
  }
  displayProd();
}
// ----- Fonction qui test le panier reçu
function displayProd(){
  let panier = getLS();//JSON.parse(localStorage.getItem("selectionProd"));
  if(panier === null || !panier.length){
    alert('Le panier est vide');
    return false;
  } else {
    complementProd(panier);
  }
  let addForm = document.querySelector("form");
  addForm.addEventListener('submit', function(e){
    e.preventDefault();
    form();
    return false;
  });
}
// ----- Fonction pour recupere API ----- //
function complementProd(panier){
  panier.forEach(item => {
    fetch('http://localhost:3000/api/products/' + '/' + item.idProduct)
    .then((res) => res.json())
    .then((kanap) => {
      kanap.qty = item.numberProduct;
      kanap.colorSelected = item.colorProduct;
      createBasket(kanap);
    });
  });
}
// ----- AFFICHAGE DU PANIER ----- //
function createBasket(kanap){
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', kanap._id);
  article.setAttribute('data-color', kanap.colorSelected);
  
  
  // creation, placement et affichage div et "IMG"
  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');
  let cartImage = document.createElement('img');
  cartImage.setAttribute('src', kanap.imageUrl);
  //cartImage.textContent = item.imageProduct;
  cartImage.setAttribute('alt', kanap.altTxt);
  //cartImage.textContent = item.altTxt;
  cartItemImg.append(cartImage);
  article.append(cartItemImg);

  // creation et placement div description d'un produit
  let cartItemContent = document.createElement('div');
  cartItemContent.setAttribute('class', 'cart__item__content');
  article.append(cartItemContent);

  // creation et placement div description "NAME", "COLOR", "PRICE" et de son contenu
  let cartItemContentDescription = document.createElement('div');
  cartItemContentDescription.setAttribute('class', 'cart__item__content__description');
  cartItemContent.append(cartItemContentDescription);
  let title = document.createElement('h2');
  title.textContent = kanap.name;
  let clr = document.createElement('p');
  clr.textContent = kanap.colorSelected;
  let price = document.createElement('p');
  price.textContent = kanap.price + ' €';
  cartItemContentDescription.append(title, clr, price);

  // creation et placement div setting
  let cartItemSetting = document.createElement('div');
  cartItemSetting.setAttribute('class', 'cart__item__content__settings');
  cartItemContent.append(cartItemSetting);

  // creation et placement div "QUANTITY" et son contenu
  let cartItemSettingQty = document.createElement('div');
  cartItemSettingQty.setAttribute('class', 'cart__item__content__settings__quantity');
  cartItemSetting.append(cartItemSettingQty);
  let quantity = document.createElement('p');
  quantity.textContent = 'Qté :';
  let nbrQty = document.createElement('input');
  nbrQty.setAttribute('type', 'number');
  nbrQty.setAttribute('class', 'itemQuantity');
  nbrQty.setAttribute('name', 'itemQuantity');
  nbrQty.setAttribute('min', '1');
  nbrQty.setAttribute('max','100');
  nbrQty.setAttribute('value', kanap.qty);
  nbrQty.idProduct = kanap._id;
  nbrQty.colorProduct = kanap.colorSelected;
  nbrQty.price = kanap.price;
  nbrQty.addEventListener('change', function(event){
    updateQty(event);
    //event.target.value;
  });
  cartItemSettingQty.append(quantity,nbrQty);

  // creation et placement div "SUPPRIMER" et son contenu
  let cartItemSettingDelete = document.createElement('div');
  cartItemSettingDelete.setAttribute('class', 'cart__item__content__settings__delete');
  cartItemSetting.append(cartItemSettingDelete);
  let deleted = document.createElement('p');
  deleted.setAttribute('href', '');
  deleted.textContent = 'Supprimer';
  deleted.addEventListener('click', function(event){
    deletedStorage(event);
    //event.target;
  });
  cartItemSettingDelete.append(deleted);
  // placement de article dans la section
  section.append(article);

  // Appel de la fonction calcul
  calculTtl();

}

// ----- CALCUL DU PANIER ----- //
function calculTtl(){
  let qtyTtl = 0;
  let total = 0;
  let inputs = document.getElementsByClassName('itemQuantity');
  
  for(let input of inputs) {
    qtyTtl += parseInt(input.value);
    total += parseInt(input.value) * parseInt(input.price);
  }

  document.getElementById('totalQuantity').textContent = qtyTtl;
  document.getElementById('totalPrice').textContent = total;
}

// ----- MODIFIER LA VALEUR (+ / -) DU/DES PRODUIT(S) DU PANIER ----- //
function updateQty(event){1
  
  // on recupere le localstorage
  let recupStorage = getLS();// => JSON.parse(localStorage.getItem('selectionProd'));
  // on recuperer les attribut a calculer
  recupStorage.forEach(item => {
    if(item.idProduct == event.target.idProduct && item.colorProduct == event.target.colorProduct){
      let qty = event.target.value;
      if(qty <= 0 || qty > 100 || !qty){
        event.target.value = item.numberProduct;
      } else {
        item.numberProduct = parseInt(event.target.value);
      }
    }
  });
  // on remet a jour le localstorage
  localStorage.setItem('selectionProd', JSON.stringify(recupStorage));  
  console.log(event.target.value);
  calculTtl();
}

// ----- SUPPRIMER DU PANIER ----- //
function deletedStorage(event){
  
  let articleDel = event.target.closest('article');
  let idDel = articleDel.getAttribute('data-id');
  let colorDel = articleDel.getAttribute('data-color');
  
  let delStorage = getLS();//JSON.parse(localStorage.getItem('selectionProd'));
  let newPanier = [];
  
  for(let item of delStorage) {
    if(item.idProduct == idDel 
      && item.colorProduct == colorDel
      && confirm('Etes-vous certain de vouloir supprimer cet article ?')
      ) {
      articleDel.remove();
      
    }else {
      newPanier.push(item);
    }
    console.log(item);
  }
  localStorage.setItem('selectionProd', JSON.stringify(newPanier));
  calculTtl();
  console.log(delStorage);
}

// ---------- PARTIE FORMULAIRE : INFO CLIENT---------- //
// Regex
function testRgx(name) {
  let regexTest = /^(((?=.{3,50}$)[A-Za-zéèàôï]+[,.]?[ ]?|[a-z]+['-]?)+)*$/mg;

  return regexTest.test(name);
}

function form() {
  // PRENOM
  let firstName = document.getElementById('firstName');
  let badFirstName = document.getElementById('firstNameErrorMsg');
  //let regexFirstNm = /^(((?=.{3,50}$)[A-Za-zéèàôï]+[,.]?[ ]?|[a-z]+['-]?)+)*$/mg;
  // NOM
  let lastName = document.getElementById('lastName');
  let badLastName = document.getElementById('lastNameErrorMsg');
  //let regexLstNm = /^(((?=.{3,50}$)[A-Za-zéèàôï]+[,.]?[ ]?|[a-z]+['-]?)+)*$/mg;
  // ADRESSE
  let address = document.getElementById('address');
  let badAddress = document.getElementById('addressErrorMsg');
  let regexAdrs = /^(?=.{3,50}$)[a-zA-Z0-9\s,'-]*$/;
  //VILLE
  let town = document.getElementById('city');
  let badTown = document.getElementById('cityErrorMsg');
  //let regexTwn =  /^(((?=.{3,50}$)[A-Za-zéèàôï]+[,.]?[ ]?|[a-z]+['-]?)+)*$/mg;
  // E-MAIL
  let email = document.getElementById('email');
  let badEmail = document.getElementById('emailErrorMsg');
  let regexEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/
  
  let testValue = true;
  let contact = {};

  // TEST PRENOM
  if('' === firstName.value || !testRgx(firstName.value)) {
    badFirstName.textContent = "ERREUR : Prénom non renseigné ou invalide";
    testValue &= false;
  } else {
    badFirstName.textContent = 'Prénom valide';
    contact.firstName = firstName.value;
    console.log(firstName.value);
  }
    
  //TEST NOM
  if('' === lastName.value || !testRgx(lastName.value)) {
    badLastName.textContent= "ERREUR : Nom non renseigné ou nom invalide";
    testValue &= false;
  } else {
    badLastName.textContent= "Nom valide";
    contact.lastName = lastName.value;
  }
       
  //TEST ADRESSE
  if('' === address.value || !regexAdrs.test(address.value)) {
    badAddress.textContent = "ERREUR : Adresse non rensigne ou adresse invalide";
    testValue &= false;
  } else {
    badAddress.textContent = "Adresse valide";
    contact.address = address.value
  }
    
  //TEST VILLE
  if('' === town.value || !testRgx(town.value)) {
    badTown.textContent = "ERREUR : Ville non renseigné ou ville invalide";
    testValue &= false;
  } else {
    badTown.textContent = "Ville valide";
    contact.city = town.value;
  }
    
  // TEST E-MAIL
  if('' === email.value || !regexEmail.test(email.value)) {
    badEmail.textContent = "ERREUR : Email non renseigné ou email invalid";
    testValue &= false;
  } else {
    badEmail.textContent = "Email valide";
    contact.email = email.value;
  }
  // TEST du formulaire rempli
  if(!testValue) {
    alert('le formulaire n\'as pas été bien rempli');
    return false;
  }

  // ----- Partie de l'envoi du formulaire ----- //
  let products = getProducts();
  
  const sendForm = {
    contact,
    products
  };
  sendToApi(sendForm);
}

function sendToApi(sendForm) {
  // TEST des informations envoyer
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendForm),
  })
  .then((response) => response.json())
  .then((order) => {
    localStorage.setItem('orderId', order.orderId);
    window.location.href =
      'confirmation.html' + '?' + 'name' + '=' + order.orderId;
    localStorage.clear();
  })
  .catch((err) => console.log('Il y a eu un problème: ', err));
}

function getProducts(){
  let products = [];

  let panier = getLS();
  for (i = 0; i < panier.length; i++) { 
    products.push(panier[i].idProduct);
  }

  return products;
}

function getLS() {
  return JSON.parse(localStorage.getItem("selectionProd"));
}