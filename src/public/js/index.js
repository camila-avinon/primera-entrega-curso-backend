async function addToCart(pId) {
    console.log(pId)
    const reqBody = {products: {product: pId}}

    try {
        const res = await fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        });
        const data = await res.json();
        console.log(data)
        if (res.ok) {
            alert('Producto agregado al carrito');
        }
        } catch (e) {
        console.error('Error al agregar el producto al carrito:', e);
        }
    }


// const socket = io()

// let productForm = document.getElementById('form')
// let productList = document.getElementById('productList')

// socket.on('products', products=>{
//     productList.innerHTML=''

//     products.forEach(product => {
//         let card = document.createElement('div')
//         card.classList.add('m-4', 'p-3', 'shadow', 'rounded')
//         let titleAndPrice = document.createElement('div')
//         titleAndPrice.classList.add('d-flex', 'justify-content-between')

//         let title = document.createElement('h3')
//         title.innerText= product.title
//         title.classList.add('fw-normal')
//         let price = document.createElement('h3')
//         price.innerText= `$${product.price}`
//         price.classList.add('text-info', 'fw-normal')
//         titleAndPrice.appendChild(title)
//         titleAndPrice.appendChild(price)
//         let description = document.createElement('p')
//         description.innerText=product.description
//         let category = document.createElement('p')
//         category.innerText=product.category
//         category.classList.add('small', 'text-body-secondary')
//         let deleteButton = document.createElement('button')
//         deleteButton.innerText='Eliminar'
//         deleteButton.setAttribute('id', product.id)
//         deleteButton.classList.add('btn', 'btn-danger')
//         deleteButton.addEventListener('click', e=>{            
//             socket.emit('deleteProduct', deleteButton.id)
//         })
//         card.appendChild(titleAndPrice)
//         card.appendChild(description)
//         card.appendChild(category)
//         card.appendChild(deleteButton)
//         productList.appendChild(card)
//     });
// })

// form.addEventListener('submit', e=>{
//     e.preventDefault()
//     let {title, price, description, code, stock, category} = form
//     let product = {
//         title: title.value,
//         price: parseInt(price.value),
//         description: description.value,
//         code: code.value,
//         stock: parseInt(stock.value),
//         category: category.value
//     }
//     socket.emit('newProduct', product)
// })