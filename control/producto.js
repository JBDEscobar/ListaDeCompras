
class Producto {
    constructor(nombre, cantidad, precio) {
        this.id = Date.now();
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    obtenerTotal() {
        return (this.cantidad * this.precio).toFixed(2);
    }

    toString() {
        return `${this.nombre} - Cant: ${this.cantidad} - Total: Q${this.obtenerTotal()}`;
    }
}


function crearProducto(nombre, cantidad, precio) {
    return new Producto(nombre, cantidad, precio);
}


function validarDatosProducto(nombre, cantidad, precio) {
    return nombre && nombre.trim() !== '' && 
           cantidad > 0 && 
           precio >= 0;
}