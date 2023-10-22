//region 1 modelos de datos 

// Definimos la clase Sale
class Sale {
    constructor(id, titulo, cliente, clienteTel, fechaVenta, vendedor, precio) {
      this.id = id; // Identificador de la venta
      this.titulo = titulo; //videojuego
      this.cliente = cliente; // Nombre del cliente
      this.clienteTel = clienteTel; // Teléfono del cliente
      this.fechaVenta = fechaVenta; // Fecha de la venta
      this.vendedor = vendedor; // Vendedor
      this.precio = precio;
      
    }
  }
  
  function mapAPIToSales(data) {
    return data.map(item => {
      return new Sale(
        item.id,
        item.titulo,
        item.cliente,
        item.clienteTel,
        new Date(item.fechaVenta),
        item.vendedor,
        item.precio
      );
    });
  }