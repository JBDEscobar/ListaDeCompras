// carrito.js - Maneja las operaciones del carrito
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Agregar producto al carrito
    agregarProducto(nombre, cantidad, precio) {
        if (!validarDatosProducto(nombre, cantidad, precio)) return false;

        const productoExistente = this.items.find(p => 
            p.nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            const nuevoProducto = crearProducto(nombre, cantidad, precio);
            this.items.push(nuevoProducto);
        }

        this.guardar();
        return true;
    }

    // Eliminar producto del carrito
    eliminarProducto(idProducto) {
        this.items = this.items.filter(p => p.id !== idProducto);
        this.guardar();
    }

    // Guardar carrito en localStorage
    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    // Obtener todos los productos
    obtenerProductos() {
        return this.items;
    }

    // Verificar si el carrito está vacío
    estaVacio() {
        return this.items.length === 0;
    }

    // Limpiar carrito
    limpiar() {
        this.items = [];
        this.guardar();
    }
}


const carrito = new Carrito();