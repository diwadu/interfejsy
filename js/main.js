document.addEventListener("DOMContentLoaded", function () {
  showPage("dashboard");
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
  } else if (page === "dashboard") {
    showDashboard();
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

function showDashboard() {
  const content = document.getElementById("content");
  let html = `<h1>Dashboardy</h1>
    <div class="row">
      <div class="col-12">
        <div class="card dashboard-card">
          <div class="card-body">
            <h5 class="card-title">Zdarzenia na linii czasu</h5>
            <canvas id="carCountChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card dashboard-card">
          <div class="card-body">
            <h5 class="card-title">Koszty Zdarzeń</h5>
            <canvas id="eventCostChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card dashboard-card">
          <div class="card-body">
            <h5 class="card-title">Zdarzenia wg Rodzaju</h5>
            <canvas id="eventTypeChart"></canvas>
          </div>
        </div>
      </div>
    </div>`;
  content.innerHTML = html;
  renderCarCountChart();
  renderEventCostChart();
  renderEventTypeChart();
}

function renderCarCountChart() {
  const ctx = document.getElementById("carCountChart").getContext("2d");

  // Sortowanie zdarzeń według daty
  const sortedEvents = events
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Grupowanie zdarzeń według miesiąca i typu
  const eventsByMonthAndType = {};
  sortedEvents.forEach((event) => {
    const monthYear = `${new Date(event.date).getFullYear()}-${
      new Date(event.date).getMonth() + 1
    }`;
    if (!eventsByMonthAndType[monthYear]) {
      eventsByMonthAndType[monthYear] = {
        Kradzież: 0,
        Naprawa: 0,
        Tankowanie: 0,
        Przegląd: 0,
        Inne: 0,
      };
    }
    eventsByMonthAndType[monthYear][event.type]++;
  });

  // Przygotowanie intensywnych kolorów dla kategorii zdarzeń
  const eventColors = {
    Kradzież: "rgba(255, 0, 0, 1)", // Czerwony
    Naprawa: "rgba(255, 165, 0, 1)", // Pomarańczowy
    Tankowanie: "rgba(0, 0, 255, 1)", // Niebieski
    Przegląd: "rgba(0, 128, 0, 1)", // Zielony
    Inne: "rgba(128, 0, 128, 1)", // Fioletowy
  };

  // Przygotowanie danych do wykresu
  const labels = Object.keys(eventsByMonthAndType);
  const datasets = Object.keys(eventColors).map((type) => ({
    label: type,
    backgroundColor: eventColors[type],
    borderWidth: 0,
    data: labels.map((label) => eventsByMonthAndType[label][type] || 0),
  }));

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Miesiąc",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Liczba Zdarzeń",
          },
        },
      },
    },
  });
}

function renderEventCostChart() {
  const ctx = document.getElementById("eventCostChart").getContext("2d");

  // Pobieranie kosztów zdarzeń dla każdego samochodu
  const carEventCosts = cars.map((car) => {
    const carEvents = events.filter((event) => event.carId === car.id);
    return carEvents.reduce((total, event) => total + (event.cost || 0), 0);
  });

  // Przygotowanie intensywnych kolorów
  const eventColors = [
    "rgba(255, 99, 132, 0.8)", // Czerwony
    "rgba(54, 162, 235, 0.8)", // Niebieski
    "rgba(255, 205, 86, 0.8)", // Żółty
    "rgba(75, 192, 192, 0.8)", // Zielony
    "rgba(153, 102, 255, 0.8)", // Fioletowy
    "rgba(255, 159, 64, 0.8)", // Pomarańczowy
  ];

  // Tworzenie wykresu
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: cars.map((car) => `${car.brand} ${car.model}`),
      datasets: [
        {
          label: "Koszty Zdarzeń",
          data: carEventCosts,
          backgroundColor: eventColors.slice(0, cars.length),
          borderColor: eventColors.map((color) => color.replace("0.8", "1")),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}

function renderEventTypeChart() {
  const ctx = document.getElementById("eventTypeChart").getContext("2d");

  // Pobieranie unikalnych typów zdarzeń
  const eventTypes = [...new Set(events.map((event) => event.type))];

  // Liczenie liczby zdarzeń dla każdego typu
  const eventTypeCounts = eventTypes.map(
    (type) => events.filter((event) => event.type === type).length
  );

  // Przygotowanie intensywnych kolorów
  const eventColors = [
    "rgba(255, 99, 132, 0.8)", // Czerwony
    "rgba(54, 162, 235, 0.8)", // Niebieski
    "rgba(255, 205, 86, 0.8)", // Żółty
    "rgba(75, 192, 192, 0.8)", // Zielony
    "rgba(153, 102, 255, 0.8)", // Fioletowy
    "rgba(255, 159, 64, 0.8)", // Pomarańczowy
  ];

  // Tworzenie wykresu
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: eventTypes,
      datasets: [
        {
          label: "Zdarzenia wg Rodzaju",
          data: eventTypeCounts,
          backgroundColor: eventColors.slice(0, eventTypes.length),
          borderColor: eventColors.map((color) => color.replace("0.8", "1")),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}

// Funkcja generująca losowy kolor z jasnością powyżej 50
function getRandomColor() {
  const r = Math.floor(Math.random() * 205) + 50;
  const g = Math.floor(Math.random() * 205) + 50;
  const b = Math.floor(Math.random() * 205) + 50;
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
}
