const url = 'http://localhost:3000/api/products';// etape1 adresse de l' API

async function addImage() { //declaration de le fonction

  let requete = await fetch(url, { 
    method  : 'GET'
    
  });
  console.log(requete);
  
  if(!requete.ok) {

    alert('Err : Un Prob !!!');

  }
  else {
    let findImage = await requete.json();
    
    console.log(findImage);
    findImage.map((product)=> {
      create(product);

    })

  }

}

function create(product) {

  let link = document.createElement('a'); // creation du lien balise <a> </a>
  link.setAttribute('href', './product.html?id=' + product._id); // adresse sur product.html
  console.log(link);

  let article = document.createElement('article');

  let img = document.createElement('img');
  img.setAttribute('src', product.imageUrl);
  img.setAttribute('alt', product.altTxt);

  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'productName');
  h3.textContent = product.name;

  let p = document.createElement('p');
  p.setAttribute('class', 'productDescription');
  p.textContent = product.description;

  article.append(img, h3, p);
  link.append(article);

  document.getElementById('items').append(link);

}

addImage();

