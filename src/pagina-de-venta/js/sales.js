//#region 1 modelos de datos (MODELS)

// Definimos la clase Sale
class Sale {
  constructor(
    id,
    tituloVenta,
    cliente,
    clienteTel,
    fechaVenta,
    vendedor,
    precioVenta
  ) {
    this.id = id; // Identificador de la venta
    this.tituloVenta = tituloVenta; //videojuego
    this.cliente = cliente; // Nombre del cliente
    this.clienteTel = clienteTel; // Teléfono del cliente
    this.fechaVenta = fechaVenta; // Fecha de la venta
    this.vendedor = vendedor; // Vendedor
    this.precioVenta = precioVenta;
  }
}

function mapAPIToSales(data) {
  return data.map((item) => {
    return new Sale(
      item.id,
      item.tituloVenta,
      item.cliente,
      item.clienteTel,
      new Date(item.fechaVenta),
      item.vendedor,
      item.precioVenta
    );
  });
}

// Definimos la clase de videojuegos con los datos necesarios
class VideojuegosDescriptor {
  constructor(id, titulo, precio) {
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
  }
}

function mapAPIToVideojuegosDescriptors(data) {
  return data.map((item) => {
    return new VBArrayeDescriptor(item.id, item.titulo, item.precio);
  });
}

//#endregion

//#region 2. Ventas (VIEW)

function displaySalesView(sales) {
  clearTable();

  showLoadingMessage();

  if (sales.length === 0) {
    showNotFoundMessage();
  } else {
    hideMessage();

    displaySalesTable(sales);
  }
}

function displayClearSalesView() {
  clearTable();

  showInitialMessage();
}

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displaySalesTable(sales) {
  const tablaBody = document.getElementById("data-table-body");

  sales.forEach((sale) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${sale.id}</td>
      <td>${sale.tituloVenta}</td>
      <td>${sale.cliente}</td>
      <td>${sale.clienteTel}</td>
      <td>${formatDate(sale.saleDate)}</td>
      <td>${sale.vendedor}</td>
      <td class="text-right">${formatCurrency(sale.salePrice)}</td>
      <td>
        <button class="btn-delete" data-sale-id="${sale.id}">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(row);
  });

  initDeleteSaleButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
  const tableBody = document.getElementById("data-table-body");

  tableBody.innerHTML = "";
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "Cargando...";

  message.style.display = "block";
}

// Funcion que muestra mensaje de carga
function showInitialMessage() {
  const message = document.getElementById("message");

  message.innerHTML = "No se ha realizado una consulta de ventas.";

  message.style.display = "block";
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.getElementById("message");

  message.innerHTML =
    "No se encontraron ventas de videojuegos con el filtro proporcionado.";

  message.style.display = "block";
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.getElementById("message");

  message.style.display = "none";
}

//#endregion

//#region 3. flitros de busqueda (VIEW)
function initFilterButtonsHandler() {
  document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    searchSales();
  });

  document
    .getElementById("reset-filters")
    .addEventListener("click", () => clearSales());
}

function clearSales() {
  document.querySelector("select.filter-field").selectedIndex = 0;
  document
    .querySelectorAll("input.filter-field")
    .forEach((input) => (input.value = ""));

  displayClearSalesView();
}

function resetSales() {
  document.querySelector("select.filter-field").selectedIndex = 0;
  document
    .querySelectorAll("input.filter-field")
    .forEach((input) => (input.value = ""));
  searchSales();
}

function searchSales() {
  const tituloVenta = document.getElementById("tituloVenta-filter").value;
  const cliente = document.getElementById("cliente-filter").value;
  const vendedor = document.getElementById("vendedor-filter").value;
  const fechaVenta = document.getElementById("fecha-filter").value;

  getSalesData(tituloVenta, cliente, vendedor, fechaVenta);
}

//#endregion

//#region 4. Funcionalidad de botones para gregar y eliminar ventas (VIEW)

function initAddSaleButtonsHandler() {
  document.getElementById("addSale").addEventListener("click", () => {
    openAddSaleModal();
  });

  document.getElementById("modal-background").addEventListener("click", () => {
    closeAddSaleModal();
  });

  document.getElementById("sale-form").addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmitSale();
  });
}

function openAddSaleModal() {
  document.getElementById("sale-form").reset();
  document.getElementById("modal-background").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

function closeAddSaleModal() {
  document.getElementById("sale-form").reset();
  document.getElementById("modal-background").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function processSubmitSale() {
  const tituloVenta = document.getElementById("titulo-field").value;
  const cliente = document.getElementById("customer-name-field").value;
  const clienteTel = document.getElementById("customer-phone-field").value;
  const fechaVenta = document.getElementById("sale-date-field").value;
  const vendedor = document.getElementById("salesman-field").value;
  const precioVenta = document.getElementById("sale-price-field").value;

  const saleToSave = new Sale(
    null,
    tituloVenta,
    cliente,
    clienteTel,
    fechaVenta,
    vendedor,
    parseFloat(precioVenta)
  );

  createSale(saleToSave);
}

function initDeleteSaleButtonHandler() {
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const saleId = button.getAttribute("data-sale-id"); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta
    });
  });
}

//#endregion

//#region 5. cargar datos de los videojuegos para el form (VIEW)

// Funcion que agrega los datos de los videojuegos a la tabla.

function displayVideojuegosOptions(videojuegos) {
  const videojuegosFilter = document.getElementById("videojuegos-filter");
  const videojuegosModal = document.getElementById("titulo-field");

  videojuegos.forEach((videojuegos) => {
    const optionFilter = document.createElement("option");

    optionFilter.value = videojuegos.titulo;
    optionFilter.text = `${videojuegos.titulo} - ${formatCurrency( videojuegos.precio )}`;

    videojuegosFilter.appendChild(optionFilter);

    const optionModal = document.createElement("option");

    optionModal.value = videojuegos.titulo;
    optionModal.text = `${videojuegos.titulo} - ${formatCurrency( videojuegos.precio )}`;

    videojuegosModal.appendChild(optionModal);
  });
}

//#endregion

//#region 6. consumo de datos desde la API

function getVideojuegosData() {
  fetchAPI(`${apiURL}/videojuegos`, 'GET')
  .then(data => {
    const videojuegosList = mapAPIToRealEstateDescriptors(data);
    displayVideojuegosOptions(videojuegosList);
  });
}

function getSalesData(tituloVenta, cliente, vendedor, fechaVenta) {

  const url = buildGetSalesDataUrl(tituloVenta, cliente, vendedor, fechaVenta);

  fetchAPI(url, 'GET')
    .then(data => {
      const salesList = mapAPIToSales(data);
      displaySalesView(salesList);
    });
}

function createSale(sale) {

  fetchAPI(`${apiURL}/venta`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      resetSales();
      window.alert(`Venta ${sale.id} creada correctamente.`);
    });
}

function deleteSale(saleId) {

  const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/sales/${saleId}`, 'DELETE')
      .then(() => {
        resetSales();
        window.alert("Venta eliminada.");
      });

  }
}

// Funcion que genera la url para consultar ventas con filtros.
function buildGetSalesDataUrl(tituloVenta, cliente, vendedor, fechaVenta) {

  const url = new URL(`${apiURL}/venta`);

  if (tituloVenta) {
    url.searchParams.append('tituloVenta', tituloVenta);
  }

  if (cliente) {
    url.searchParams.append('cliente', cliente);
  }

  if (vendedor) {
    url.searchParams.append('vendedor', vendedor);
  }

  if (fechaVenta) {
    url.searchParams.append('fechaVenta', fechaVenta);
  }

  return url;
}

//#endregion

//#region 8. inicializacion de funcionalidad (CONTROLLER)

initAddSaleButtonsHandler();

initFilterButtonsHandler();

getRealEstateData();

//#endregion