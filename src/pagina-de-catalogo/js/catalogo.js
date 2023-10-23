// #region 1.variables globales 
const imagePath = `./imgs/`;

//#endregion


function buscarProductos() {
    let inputBusqueda = document.getElementById("inputBusqueda");
    let textoBusqueda = inputBusqueda.value.toLowerCase();
    let productos = document.querySelectorAll(".producto");
    let productosEncontrados = false; 


    productos.forEach(function(producto) {
        let nombreProducto = producto.querySelector(".producto__nombre").textContent.toLowerCase();

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = "block"; 
            productosEncontrados = true; 
        } else {
            producto.style.display = "none"; 
        }
    });

    let mensajeNoResultados = document.getElementById("mensajeNoResultados");
    if (!productosEncontrados) {
        mensajeNoResultados.style.display = "flex";
        mensajeNoResultados.style.padding = "1rem";
        mensajeNoResultados.style.margin = "1rem 0rem";
        mensajeNoResultados.style.display = "flex";
        mensajeNoResultados.style.flexDirection = "column";
        mensajeNoResultados.style.justifyContent = "center";
        mensajeNoResultados.style.alignItems = "center";
    } else {
        mensajeNoResultados.style.display = "none";
    }
}


        function restablecerProductos() {
            let productos = document.querySelectorAll(".producto");

            productos.forEach(function(producto) {
                producto.style.display = "block"; 
            });

            let mensajeNoResultados = document.getElementById("mensajeNoResultados");
            mensajeNoResultados.style.display = "none";

            
            let inputBusqueda = document.getElementById("inputBusqueda");
            inputBusqueda.value = "";
        }