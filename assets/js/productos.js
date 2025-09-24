const productos = [
  { id: 1, nombre: "Entrada General", precio: 5000, imagen: "assets/img/entrada.jpg" },
  { id: 2, nombre: "Promo 2x1 Cerveza", precio: 6000, imagen: "assets/img/cerveza.jpg" },
  { id: 3, nombre: "Whisky + Energética", precio: 15000, imagen: "assets/img/whisky.jpg" }
];

const listaProductos = document.getElementById("lista-productos");

if (listaProductos) {
  productos.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("producto");
    item.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">Añadir al carrito</button>
    `;
    listaProductos.appendChild(item);
  });
}

function agregarCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  if (confirm(`${producto.nombre} agregado ✅\n¿Quieres ir al carrito?`)) {
    window.location.href = "carrito.html";
  }
}

