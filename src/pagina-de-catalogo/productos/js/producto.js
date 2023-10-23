    function mostrarModal() {
        var modal = document.getElementById("modal");
        modal.style.display = "flex";
    }

    function ocultarModal() {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    document.getElementById("cantidad-field").addEventListener("input", function () {
        const cantidad = parseFloat(document.getElementById("cantidad-field").value);
        const precioJuego = 25;
        const total = cantidad * precioJuego;
        document.getElementById("total-field").value = total;
    });

        function hacerCompra() {
        const titulo = document.getElementById("titulo-field").value;
        const nombre = document.getElementById("customer-name-field").value;
        const telefono = document.getElementById("customer-phone-field").value;
        const fecha = document.getElementById("sale-date-field").value;
        const vendedor = document.getElementById("salesman-field").value;
        const totalString = document.getElementById("total-field").value;
        
        const total = parseFloat(totalString);
        
        const data = {
            tituloVenta: titulo,
            cliente: nombre,
            clienteTel: telefono,
            fechaVenta: fecha,
            vendedor: vendedor,
            precioVenta: total,
        };

        console.log("Datos de la compra:", data);

        fetch("https://6532f89ed80bd20280f63155.mockapi.io/api/venta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("Respuesta de la API:", response);
            return response.json()})
        .then(data => {
            console.log("Compra realizada con éxito. Datos de la compra:", data);
        })
        .catch(error => {
            console.error("Error al realizar la compra:", error);
        });

        ocultarModal(); 
    }