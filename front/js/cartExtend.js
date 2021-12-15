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
//complementProd();

function createBasket(kanap){
  // emplacement de l'affichage du et/ou des produits
  let section = document.getElementById('cart__items');
  
  // creation de la balise article
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', kanap.idProduct);
  article.setAttribute('data-color', kanap.colorProduct);
  
  
  // creation, placement et affichage div et "IMG"
  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');
  let cartImage = document.createElement('img');
  cartImage.setAttribute('src', kanap.imageProduct);
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
  title.textContent = kanap.nameProduct;
  let clr = document.createElement('p');
  clr.textContent = kanap.colorProduct;
  let price = document.createElement('p');
  price.textContent = kanap.priceProduct + ' €';
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
  nbrQty.setAttribute('value', kanap.numberProduct);
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
createBasket();

function calcul(kanap){
  let total = JSON.parse(localStorage.getItem('selectionProd'));
  let totalQty = document.querySelector('#totalQuantity');
  let totalPrice = document.querySelector('#totalPrice');
  let qtyArticle = 0;
  let prcArticle = 0;

  total.forEach(item => {
    qtyArticle += item.numberProduct;
    prcArticle +=  item.numberProduct * item.priceProduct;
    totalQty.textContent = qtyArticle; 
    totalPrice.textContent = prcArticle;
    localStorage.setItem('selectionProd', JSON.stringify(qtyArticle, prcArticle));
  });
  console.log(total);
  console.log(calcul(kanap));
}

function updateQty(event){
  console.log(event.target.value);
}

// function deletedProduct(event){
//   console.log(event.target)
//   document.querySelectorAll('.deleteItem').forEach(kanap => {
//     kanap.addEventListener('click', () => {
        
//         let article = kanap.closest('article');
//         let id = article.getAttribute("data-id", kanap.idProduct);
//         let color = article.getAttribute("data-color", kanap.colorProduct);
//         let panier = JSON.parse(localStorage.getItem('selectionProd'));
//         let newPanier = [];
  
//         /* SUPPRIMER DU LOCALSTORAGE */
//         panier.forEach(element => {
//             if(element.idProduct != id || element.colorProduct != color){
//                 newPanier.push(element);
//             }
//         })
  
//         localStorage.setItem('selectionProd', JSON.stringify(newPanier));
  
//         /* SUPPRIMER DU HTML */
//         article.remove();
//        //displayTotal();
//     });
//   });
// }