const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    Swal.fire({
        title: 'Vaciaste el carrito!',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        iconColor: 'red',
        iconHtml: '<i class="bi bi-cart-x"></i>'
      })
    actualizarCarrito()
})

        
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:u$d ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="bi bi-cart-fill"></i></i></button>
    `
    contenedorProductos.appendChild(div)
   
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 1500,
            destination: "",
            newWindow: true,
            close: false,
            gravity: "top",
            position: "center", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #B279A7, #D387AB)",
            },
            onClick: function(){} 
          }).showToast();

        agregarAlCarrito(producto.id)
        
    })
}) 


const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:u$d${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="bi bi-trash-fill"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
const divDolar = document.getElementById("divDolar")

fetch("https://criptoya.com/api/dolar")
.then(response=>response.json())
.then(({blue}) =>{
    divDolar.innerHTML=`
    <h3>La cotizacion del dolar al dia de la fecha es de : $${blue}</h3>
    `
})