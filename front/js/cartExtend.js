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
        calcul(kanap);
    });
  });
}

function createBasket(kanap){
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', kanap._id);
  article.setAttribute('data-color', kanap.colorProduct);
  
  
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
}

function calcul(kanap){
  let total = JSON.parse(localStorage.getItem('selectionProd'));
  let totalQty = document.querySelector('#totalQuantity');
  let totalPrice = document.querySelector('#totalPrice');
  let qtyArticle = 0;
  let prcArticle = 0;

  total.forEach(item => {
    qtyArticle += parseInt(item.numberProduct);
    prcArticle +=  parseInt(item.numberProduct) * parseInt(kanap.price);
    totalQty.textContent = qtyArticle; 
    totalPrice.textContent = prcArticle;
  });
}

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

function calculTtl(){
  let qtyTtl = 0;
  let total = 0;
  let inputs = document.getElementsByClassName('itemQuantity');
  // tableau qui contient objet
  // let inputs = [{value: xxx , price: xxx}, {value: xxx , price: xxx}, {value: xxx , price: xxx} ]
  inputs.forEach(input => {
    qtyTtl += parseInt(input.value);
    total += parseInt(input.value) * (input.price);
  });
  document.getElementById('totalQuantity').textContent = qtyTtl;
  document.getElementById('totalPrice').textContent = total;
  console.log(qtyTtl);
  console.log(total);
  
  
}
calculTtl();

function deletedStorage(event){
  document.getElementsByTagName('deleteItem');
 
  let deleted = JSON.parse(localStorage.getItem('selectionProd'));

  deleted.forEach(button => {

  });
  
}
