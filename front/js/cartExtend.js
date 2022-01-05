document.addEventListener('DOMContentLoaded', () => {
  initCart();
});

function initCart(){ 
  displayProd();
}

function displayProd(){
  let panier = JSON.parse(localStorage.getItem("selectionProd"));
  if(panier === ''){
    alert('Le panier est vide');
    return false;
  } else {
    complementProd(panier);
  }
}

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
  calculTtl();
}
// ----- CALCUL DU PANIER ----- //
function calculTtl(){
  let qtyTtl = 0;
  let total = 0;
  let inputs = document.getElementsByClassName('itemQuantity');
  // tableau qui contient objet
  // let inputs = [{value: xxx , price: xxx}, {value: xxx , price: xxx}, {value: xxx , price: xxx} ]
  for(let input of inputs) {
    qtyTtl += parseInt(input.value);
    total += parseInt(input.value) * parseInt(input.price);
  }
  //});
  document.getElementById('totalQuantity').textContent = qtyTtl;
  document.getElementById('totalPrice').textContent = total;
  console.log(qtyTtl);
  console.log(total);
  console.log(inputs);
}
// ----- MODIFIER LA VALEUR (+ / -) DU/DES PRODUIT(S) DU PANIER ----- //
function updateQty(event){
  let recupStorage = JSON.parse(localStorage.getItem('selectionProd'));
  // let array = ['un', 'deux', 'trois']; array[0];
  // recupStorage = [{idProduct: xxx, colorProduct: xxxx, NumberProduct: xxx},{idProduct: xxx, colorProduct: xxxx, NumberProduct: xxx}]
  // let object = {
  // voiture: renault,
  // couleur: rouge
  //}object.voiture; object['voiture'];
  recupStorage.forEach(item => {
    if(item.idProduct == event.target.idProduct && item.colorProduct == event.target.colorProduct){
      item.numberProduct = parseInt(event.target.value);//<= rajout de parseInt()
    }
  })
  
  localStorage.setItem('selectionProd', JSON.stringify(recupStorage));// <= rajout de stringify  
  console.log(event.target.value);
  calculTtl();
}
// ----- SUPPRIMER DU PANIER ----- //
function deletedStorage(event){
  
  let articleDel = event.target.closest('article');
  let idDel = articleDel.getAttribute('data-id');
  let colorDel = articleDel.getAttribute('data-color');
  // let deleted = document.getElementsByClassName('deleteItem');
  console.log(articleDel);
  console.log(idDel);
  console.log(colorDel);
  
  let delStorage = JSON.parse(localStorage.getItem('selectionProd'));
  let newPanier = [];
  
  for(let item of delStorage) {
    if(item.idProduct == idDel && item.colorProduct == colorDel) {
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
function form() {
  // Prenom
  let firstName = document.getElementById('firstName');
  let badFirstName = document.getElementById('firstNameErrorMsg');
  let regex = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

  firstName.addEventListener('input', (e) => {
    e.preventDefault();
    if(!regex.test(firstName.value)){
      badFirstName.textContent = "ERREUR : Prénom non renseigné ou prenom invalide";
    } else {
      badFirstName.textContent = 'Prénom valide';
    }
  })
  // Nom
  let lastName = document.getElementById('lastName');
  let badLastName = document.getElementById('lastNameErrorMsg');
  //let regexLstNm = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

  lastName.addEventListener('input', (e) => {
    e.preventDefault();
    if(!regex.test(lastName.value)){
      badLastName.textContent= "ERREUR : Nom non renseigné ou nom invalide";
    } else {
      badLastName.textContent= "Nom valide";
    }
  })
  // Adresse
  let address = document.getElementById('address');
  let badAddress = document.getElementById('addressErrorMsg');
  let regexAdrs = /^[a-zA-Z0-9\s,'-]*$/;

  address.addEventListener('input', (e) =>{
    e.preventDefault();
    if(!regexAdrs.test(address.value)){
      badAddress.textContent = "ERREUR : Adresse non rensigne ou adresse invalide";
    } else {
      badAddress.textContent = "Adresse valide";
    }
  })
  // Ville
  let town = document.getElementById('city');
  let badTown = document.getElementById('cityErrorMsg');
  //let regexTwn =  /^[a-zA-Z',.\s-]{1,35}$/;

  town.addEventListener('input', (e) => {
    if(!regex.test(town.value)){
      badTown.textContent = "ERREUR : Ville non renseigné ou ville invalide";
    } else {
      badTown.textContent = "Ville valide";
    }
  })
  // E-mail
  let email = document.getElementById('email');
  let badEmail = document.getElementById('emailErrorMsg');
  let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  email.addEventListener('input', (e) => {
    if(!regexEmail.test(email.value)){
      badEmail.textContent = "ERREUR : Email non renseigné ou email invalid";
    } else {
      badEmail.textContent = "Email valide";
    }
  })
  console.log(firstName, lastName, address, town, email);
  formAdd();// <= envoi des infos client au localstorage
}

// Recuperation et envoi des infos client et panier au click du button Commander
function formAdd() { 
  let btn = document.getElementById('order'); // <= recuperation de l'element du DOM
  btn.addEventListener('click', () => { 
    // recuperer le form
    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let addressInput = document.getElementById('address');
    let townInput = document.getElementById('city');
    let emailInput = document.getElementById('email');
    
    // ajouter le panier(localStorage)
    // faire l'envoi a page confirmation
  });
}
