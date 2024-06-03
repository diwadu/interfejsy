document.addEventListener("DOMContentLoaded", function () {
  showPage("cars");
  document
    .getElementById("menu-toggle")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("wrapper").classList.toggle("toggled");
    });
});

function showPage(page) {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Reset content
  if (page === "cars") {
    showCars();
  } else if (page === "events") {
    showEvents();
  } else if (page === "reports") {
    showReports();
  }
}

function showCars() {
  const content = document.getElementById("content");
  let html = `<h1>Lista aut</h1><button class="btn btn-success mb-3" onclick="showAddCarForm()">Dodaj auto</button><table class="table">
    <thead><tr><th>ID</th><th>Marka</th><th>Model</th><th>Nr rej.</th><th>Kolor</th><th>Akcje</th></tr></thead><tbody>`;
  cars.forEach((car) => {
    html += `<tr><td>${car.id}</td><td>${car.brand}</td><td>${car.model}</td><td>${car.registration}</td><td>${car.color}</td>
        <td><button class="btn btn-info" onclick="showCarDetails(${car.id})">Pokaż szczegóły</button></td></tr>`;
  });
  html += "</tbody></table>";
  content.innerHTML = html;
}

function showEvents() {
  const content = document.getElementById("content");
  let html = `<h1>Lista zdarzeń pojazdu</h1><button class="btn btn-success mb-3" onclick="showAddEventForm()">Dodaj event</button><table class="table">
    <thead><tr><th>ID</th><th>Data</th><th>Nazwa</th><th>Pojazd</th><th>Rodzaj</th><th>Koszt</th><th>Akcje</th></tr></thead><tbody>`;
  events.forEach((event) => {
    const car = cars.find((car) => car.id === event.carId);
    html += `<tr><td>${event.id}</td><td>${event.date}</td><td>${event.name}</td><td>${car.brand} ${car.model}</td>
        <td>${event.type}</td><td>${event.cost}</td>
        <td><button class="btn btn-info" onclick="showEventDetails(${event.id})">Pokaż szczegóły</button></td></tr>`;
  });
  html += "</tbody></table>";
  content.innerHTML = html;
}

function showReports() {
  const content = document.getElementById("content");
  let html = `<h1>Raporty</h1><select id="car-select" class="form-select mb-3" onchange="clearReports(event)">`;
  cars.forEach((car) => {
    html += `<option value="${car.id}">${car.brand} ${car.model}</option>`;
  });
  html += `</select><button class="btn btn-primary mb-3" onclick="generateFuelReport()">Raport paliwowy</button>
    <button class="btn btn-primary mb-3" onclick="generateCostReport()">Raport kosztów</button>
    <button class="btn btn-primary mb-3" onclick="generateTimelineReport()">Raport graficzny</button><div id="report-content"></div>`;
  content.innerHTML = html;
}

function clearReports() {
  document.getElementById("report-content").innerHTML = "";
}

function showAddCarForm() {
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Dodaj auto</h1><form onsubmit="addCar(event)">
        <div class="mb-3"><label for="brand" class="form-label">Marka</label><input type="text" class="form-control" id="brand" required></div>
        <div class="mb-3"><label for="model" class="form-label">Model</label><input type="text" class="form-control" id="model" required></div>
        <div class="mb-3"><label for="registration" class="form-label">Nr rej.</label><input type="text" class="form-control" id="registration" required></div>
        <div class="mb-3"><label for="color" class="form-label">Kolor</label><input type="text" class="form-control" id="color" required></div>
        <button type="submit" class="btn btn-primary">Dodaj</button></form>`;
}

function showAddEventForm() {
  const content = document.getElementById("content");
  let html = `<h1>Dodaj zdarzenie</h1><form onsubmit="addEvent(event)">
          <div class="mb-3">
            <label for="event-date" class="form-label">Data</label>
            <input type="date" class="form-control" id="event-date" required>
          </div>
          <div class="mb-3">
            <label for="event-name" class="form-label">Nazwa</label>
            <input type="text" class="form-control" id="event-name" required>
          </div>
          <div class="mb-3">
            <label for="event-car" class="form-label">Pojazd</label>
            <select class="form-select" id="event-car" required>
              <option value="" disabled selected>Wybierz pojazd</option>`;
  cars.forEach((car) => {
    html += `<option value="${car.id}">${car.brand} ${car.model}</option>`;
  });
  html += `</select></div>
          <div class="mb-3">
            <label for="event-type" class="form-label">Rodzaj</label>
            <input type="text" class="form-control" id="event-type" required>
          </div>
          <div class="mb-3">
            <label for="event-cost" class="form-label">Koszt (opcjonalnie)</label>
            <input type="number" class="form-control" id="event-cost">
          </div>
          <button type="submit" class="btn btn-primary">Dodaj</button></form>`;
  content.innerHTML = html;
}

function addCar(event) {
  event.preventDefault();
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const registration = document.getElementById("registration").value;
  const color = document.getElementById("color").value;
  const newCar = { id: cars.length + 1, brand, model, registration, color };
  cars.push(newCar);
  showToast("Auto dodane pomyślnie!");
  showCars();
}

function addEvent(event) {
  event.preventDefault();
  const date = document.getElementById("event-date").value;
  const name = document.getElementById("event-name").value;
  const carId = parseInt(document.getElementById("event-car").value);
  const type = document.getElementById("event-type").value;
  const cost = document.getElementById("event-cost").value;

  const newEvent = {
    id: events.length + 1,
    date,
    name,
    carId,
    type,
    cost: cost ? parseFloat(cost) : null,
  };

  events.push(newEvent);
  showToast("Zdarzenie dodane pomyślnie!");
  showEvents();
}

function showCarDetails(id) {
  const car = cars.find((car) => car.id === id);
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Szczegóły auta</h1><p>ID: ${car.id}</p><p>Marka: ${car.brand}</p><p>Model: ${car.model}</p>
    <p>Nr rej.: ${car.registration}</p><p>Kolor: ${car.color}</p><button class="btn btn-primary" onclick="showCars()">Wróć</button>`;
}

function showEventDetails(id) {
  const event = events.find((event) => event.id === id);
  const car = cars.find((car) => car.id === event.carId);
  const content = document.getElementById("content");
  content.innerHTML = `<h1>Szczegóły zdarzenia</h1><p>ID: ${event.id}</p><p>Data: ${event.date}</p><p>Nazwa: ${event.name}</p>
    <p>Pojazd: ${car.brand} ${car.model}</p><p>Rodzaj: ${event.type}</p><p>Koszt: ${event.cost}</p><button class="btn btn-primary" onclick="showEvents()">Wróć</button>`;
}

function generateFuelReport() {
  const carId = document.getElementById("car-select").value;
  const carEvents = events.filter(
    (event) => event.carId === parseInt(carId) && event.type === "Tankowanie"
  );
  let html = `<h2>Raport paliwowy</h2><table class="table"><thead><tr><th>ID</th><th>Data</th><th>Nazwa</th><th>Koszt</th></tr></thead><tbody>`;
  carEvents.forEach((event) => {
    html += `<tr><td>${event.id}</td><td>${event.date}</td><td>${event.name}</td><td>${event.cost}</td></tr>`;
  });
  html += `</tbody></table><button class="btn btn-secondary" onclick="exportToExcel()">Eksportuj do Excel</button>
    <button class="btn btn-secondary" onclick="exportToPdf()">Eksportuj do PDF</button>`;
  document.getElementById("report-content").innerHTML = html;
}

function generateCostReport() {
  const carId = document.getElementById("car-select").value;
  const carEvents = events.filter(
    (event) => event.carId === parseInt(carId) && event.cost
  );
  let html = `<h2>Raport kosztów</h2><table class="table"><thead><tr><th>ID</th><th>Data</th><th>Nazwa</th><th>Rodzaj</th><th>Koszt</th></tr></thead><tbody>`;
  carEvents.forEach((event) => {
    html += `<tr><td>${event.id}</td><td>${event.date}</td><td>${event.name}</td><td>${event.type}</td><td>${event.cost}</td></tr>`;
  });
  html += `</tbody></table><button class="btn btn-secondary" onclick="exportToExcel()">Eksportuj do Excel</button>
    <button class="btn btn-secondary" onclick="exportToPdf()">Eksportuj do PDF</button>`;
  document.getElementById("report-content").innerHTML = html;
}

function generateTimelineReport() {
  const carId = document.getElementById("car-select").value;
  const carEvents = events.filter((event) => event.carId === parseInt(carId));
  let html = `<h2>Raport graficzny</h2><div class="timeline">`;
  carEvents.forEach((event) => {
    html += `<div class="timeline-item"><div class="timeline-date">${
      event.date
    }</div><div class="timeline-content">
        <h3>${event.name}</h3><p>${event.type}</p><p>${
      event.cost ? `Koszt: ${event.cost}` : ""
    }</p></div></div>`;
  });
  html += `</div><button class="btn btn-secondary" onclick="exportToExcel()">Eksportuj do Excel</button>
    <button class="btn btn-secondary" onclick="exportToPdf()">Eksportuj do PDF</button>`;
  document.getElementById("report-content").innerHTML = html;
}

function showToast(message) {
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  toastContainer.innerHTML = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header"><strong class="me-auto">Informacja</strong><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div>
    <div class="toast-body">${message}</div></div>`;
  document.body.appendChild(toastContainer);
  const toast = new bootstrap.Toast(toastContainer.querySelector(".toast"));
  toast.show();
}

function exportToExcel() {
  showToast("Eksport do Excel wkrótce dostępny!");
}

function exportToPdf() {
  showToast("Eksport do PDF wkrótce dostępny!");
}
