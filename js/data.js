const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    registration: "ABC123",
    color: "Czerwony",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    registration: "XYZ789",
    color: "Niebieski",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    registration: "FOC456",
    color: "Czarny",
  },
  {
    id: 4,
    brand: "BMW",
    model: "320i",
    registration: "BMW320",
    color: "Biały",
  },
  { id: 5, brand: "Audi", model: "A4", registration: "AUD123", color: "Szary" },
  {
    id: 6,
    brand: "Mercedes",
    model: "C200",
    registration: "MER456",
    color: "Srebrny",
  },
  {
    id: 7,
    brand: "Volkswagen",
    model: "Golf",
    registration: "GOL789",
    color: "Zielony",
  },
  {
    id: 8,
    brand: "Kia",
    model: "Sportage",
    registration: "KIA123",
    color: "Niebieski",
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Tucson",
    registration: "HYU456",
    color: "Czarny",
  },
  {
    id: 10,
    brand: "Nissan",
    model: "Qashqai",
    registration: "NIS789",
    color: "Biały",
  },
];

const events = [];

// Helper function to generate random dates
function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Helper function to generate random costs
function getRandomCost(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event types
const eventTypes = [
  "Wypadek",
  "Kolizja",
  "Naprawa",
  "Tankowanie",
  "Serwis",
  "Kradzież",
];

// Generate 20 events for each car
cars.forEach((car) => {
  for (let i = 0; i < 20; i++) {
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const event = {
      id: events.length + 1,
      date: getRandomDate(new Date(2023, 0, 1), new Date())
        .toISOString()
        .split("T")[0],
      name: `Zdarzenie ${events.length + 1}`,
      carId: car.id,
      type: eventType,
      cost:
        eventType === "Tankowanie" ||
        eventType === "Naprawa" ||
        eventType === "Serwis"
          ? getRandomCost(100, 1000)
          : null,
    };
    events.push(event);
  }
});

console.log(cars);
console.log(events);
