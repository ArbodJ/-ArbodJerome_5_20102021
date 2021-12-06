// Recuperation de la selection de product.js
let catchProduct = JSON.parse(localStorage.getItem("selectionProd"));
console.log(catchProduct);

// Affichage de la selection de product.js
catchProduct.forEach(item => {
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article =document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', item.idProduct);
  article.setAttribute('data-color', item.colorProduct);
  article.textContent = item.colorProduct ;
  
  // creation, placement et affichage div et img
  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');
  let cartImage = document.createElement('img');
  cartImage.setAttribute('src', item.imageProduct);
  cartImage.textContent = item.imageProduct;
  //cartImage.setAttribute('alt', item.altTxt);
  cartItemImg.append(cartImage);
  article.append(cartItemImg);

  // creation et placement div description d'un produit
  let cartItemContent = document.createElement('div');
  cartItemContent.setAttribute('class', 'cart__item__content');
  article.append(cartItemContent);

  // creation et placement div description et de son contenu
  let cartItemContentDescription = document.createElement('div');
  cartItemContentDescription.setAttribute('class', 'cart__item__content__description');
  cartItemContent.append(cartItemContentDescription);
  let title = document.createElement('h2');
  title.textContent = item.nameProduct;
  let price = document.createElement('p');
  price.textContent = item.priceProduct;
  cartItemContentDescription.append(title, price);

  // creation et placement div setting
  let cartItemSetting = document.createElement('div');
  cartItemSetting.setAttribute('class', 'cart__item__content__settings');
  cartItemContent.append(cartItemSetting);

  // creation et placement div quantity et son contenu
  let cartItemSettingQty = document.createElement('div');
  cartItemSettingQty.setAttribute('class', 'cart__item__content__settings__quantity');
  cartItemSetting.append(cartItemSettingQty);
  let quantity = document.createElement('p');
  quantity.textContent = 'Qté :';
  let nbrQty = document.createElement('input');
  nbrQty.setAttribute('type', 'number', 'class', 'itemQuantity', 'name', 'itemQuantity');
  nbrQty.setAttribute('min', '1', 'max','100');
  nbrQty.setAttribute('value', item.numberProduct);
  cartItemSettingQty.append(quantity,nbrQty);

  // creation et placement div supprimer et son contenu
  let cartItemSettingDelete = document.createElement('div');
  cartItemSettingDelete.setAttribute('class', 'cart__item__content__settings__delete');
  cartItemSetting.append(cartItemSettingDelete);
  let deleted = document.createElement('p');
  deleted.setAttribute('href', '');
  deleted.textContent = 'Supprimer';
  cartItemSettingDelete.append(deleted);

  section.append(article);// placement de article dans la section

  // Selection et mise en place du nombre(s) d'articles(s) et prix total
  let totalQty = document.getElementById('totalQuantity');
  totalQty.textContent = item.numberProduct; //affichage nombre article(s)
  let totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = item.numberProduct * item.priceProduct;

  //changeQty()
});

// function changeQty(){
//   let otherQty = document.querySelector('.itemQuantity');
//   otherQty.addEventListener('change', () => {
    
//   });
// }