document.addEventListener('DOMContentLoaded', () => {
  initCart();
});

function initCart(){
  if (condition) {
    
  } else {
    displayProd();
  }
  
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
    fetch('http://localhost:3000/api/products/' + item.idProduct)
      .then((res) => res.json())
      .then((kanap) => {
        kanap.qty = item.numberProduct;
        kanap.colorSelected = item.colorProduct;
        createBasket(kanap);
        calcul(kanap);
    });
  });
}

function createBasket(item){
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', item.idProduct);
  article.setAttribute('data-color', item.colorProduct);
  
  
  // creation, placement et affichage div et "IMG"
  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');
  let cartImage = document.createElement('img');
  cartImage.setAttribute('src', item.imageProduct);
  cartImage.textContent = item.imageProduct;
  cartImage.setAttribute('alt', item.altTxt);
  cartImage.textContent = item.altTxt;
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
  title.textContent = item.nameProduct;
  let clr = document.createElement('p');
  clr.textContent = item.colorProduct;
  let price = document.createElement('p');
  price.textContent = item.priceProduct + ' €';
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
  nbrQty.setAttribute('type', 'number', 'class', 'itemQuantity', 'name', 'itemQuantity');
  nbrQty.setAttribute('min', '1', 'max','100');
  nbrQty.setAttribute('value', item.numberProduct);
  nbrQty.addEventListener('change', function(event){
    updateQty(event);
    event.target.value;
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
    deletedProduct(event);
    event.target;
  });
  cartItemSettingDelete.append(deleted);
  // placement de article dans la section
  section.append(article);
}

function updateQty(event){
  console.log(event.target.value);
}

function deletedProduct(event){
  console.log(event.target)
}