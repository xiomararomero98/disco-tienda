// =======================
// Lista de productos
// =======================
const productos = [
  { id: 1, nombre: "Entrada General", precio: 10000, imagen: "assets/img/entradas.png", descripcion: "Acceso general a Disco Club." },
  { id: 2, nombre: "Promo Balde de Cervezas", precio: 20000, imagen: "assets/img/cervezas.png", descripcion: "6 cervezas heladas para compartir." },
  { id: 3, nombre: "Promo Balde de Whisky + bebidas", precio: 50000, imagen: "assets/img/whiskys.png", descripcion: "Whisky premium con mezclas para la noche." }
];

// =======================
// Renderizar productos en productos.html
// =======================
function cargarProductos() {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("producto");
    item.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString("es-CL")}</p>
      <a href="producto-detalle.html?id=${p.id}" class="btn">Ver detalle</a>
    `;
    contenedor.appendChild(item);
  });
}

function mostrarDetalleProducto() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const producto = productos.find(p => p.id === id);

  const contenedor = document.getElementById("detalle-producto");
  if (contenedor) {
    contenedor.innerHTML = ""; // 👈 limpia antes de inyectar
    if (producto) {
      contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-img">
        <div class="detalle-info">
          <h2>${producto.nombre}</h2>
          <p class="detalle-precio">$${producto.precio.toLocaleString("es-CL")}</p>
          <p class="detalle-descripcion">${producto.descripcion}</p>
          <button onclick="agregarCarrito(${producto.id})" class="btn">Añadir al carrito</button>
        </div>
      `;
    } else {
      contenedor.innerHTML = `<p style="color:red;">⚠️ Producto no encontrado</p>`;
    }
  }
}

// =======================
// Carrito (localStorage)
// =======================
function agregarCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad = (existe.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`${producto.nombre} agregado ✅`);
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");
  if (!lista) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((p, index) => {
    const subtotal = p.precio * (p.cantidad || 1);
    suma += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${p.imagen}" alt="${p.nombre}" width="60"></td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toLocaleString("es-CL")}</td>
      <td>
        <button onclick="cambiarCantidad(${index}, -1)" class="btn">-</button>
        <span style="margin:0 8px;">${p.cantidad}</span>
        <button onclick="cambiarCantidad(${index}, 1)" class="btn">+</button>
      </td>
      <td>$${subtotal.toLocaleString("es-CL")}</td>
      <td><button onclick="eliminarDelCarrito(${index})" class="btn">Eliminar</button></td>
    `;
    lista.appendChild(fila);
  });

  if (total) total.textContent = `Total: $${suma.toLocaleString("es-CL")}`;
}

function cambiarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!carrito[index]) return;

  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContadorCarrito();
  alert("Carrito vacío ❌");
}

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("✅ ¡Gracias por tu compra!");
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContadorCarrito();
}

// =======================
// Contador carrito (badge)
// =======================
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    let total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    contador.textContent = total;
    contador.style.display = total > 0 ? "inline-block" : "none";
  }
}

// =======================
// Ejecutar según la página
// =======================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-productos")) {
    cargarProductos();   // solo en productos.html y en index si lo usas
  }

  if (document.getElementById("detalle-producto")) {
    mostrarDetalleProducto();  // solo en producto-detalle.html
  }

  if (document.getElementById("carrito-lista")) {
    mostrarCarrito();    // solo en carrito.html
  }

  actualizarContadorCarrito(); // este sí en todas
});