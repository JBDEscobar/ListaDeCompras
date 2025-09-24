// main.js - Inicializa la aplicación y maneja los eventos del DOM
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const elementos = {
        listaItems: document.querySelector('#itemList'),
        contenedorLista: document.querySelector('#listContainer'),
        botonAgregar: document.querySelector('#addButton'),
        botonDescargar: document.querySelector('#downloadButton'),
        inputItem: document.querySelector('#itemInput'),
        inputCantidad: document.querySelector('#quantityInput'),
        inputPrecio: document.querySelector('#priceInput')
    };

    // Renderizar el carrito
    function renderizarCarrito() {
        elementos.listaItems.innerHTML = '';
        carrito.obtenerProductos().forEach(renderizarProducto);
    }

    // Renderizar un producto individual
    function renderizarProducto(producto) {
        const li = document.createElement('li');
        li.innerHTML = producto.toString();

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.onclick = () => {
            carrito.eliminarProducto(producto.id);
            renderizarCarrito();
        };

        li.appendChild(botonEliminar);
        elementos.listaItems.appendChild(li);
    }

    // Manejar agregar producto
    function manejarAgregarProducto() {
        const nombre = elementos.inputItem.value.trim();
        const cantidad = parseInt(elementos.inputCantidad.value, 10) || 1;
        const precio = parseFloat(elementos.inputPrecio.value) || 0;

        if (carrito.agregarProducto(nombre, cantidad, precio)) {
            renderizarCarrito();
            // Limpiar inputs
            elementos.inputItem.value = '';
            elementos.inputCantidad.value = 1;
            elementos.inputPrecio.value = '';
            elementos.inputItem.focus();
        }
    }

    // Manejar descarga de screenshot
    function manejarDescarga() {
        if (carrito.estaVacio()) {
            alert('El carrito está vacío');
            return;
        }

        html2canvas(elementos.contenedorLista).then(canvas => {
            const enlace = document.createElement('a');
            enlace.href = canvas.toDataURL('image/png');
            enlace.download = 'lista_compras.png';
            enlace.click();
        });
    }

    // Event Listeners
    elementos.botonAgregar.addEventListener('click', manejarAgregarProducto);
    
    elementos.botonDescargar.addEventListener('click', manejarDescarga);
    
    // Soporte para tecla Enter
    elementos.inputItem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') manejarAgregarProducto();
    });

    elementos.inputPrecio.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') manejarAgregarProducto();
    });

    // Renderizar carrito al cargar
    renderizarCarrito();
});