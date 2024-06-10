const cars = [
  { id: 1, brand: "Toyota", model: "Corolla" },
  { id: 2, brand: "Ford", model: "Focus" },
  { id: 3, brand: "Honda", model: "Civic" },
  { id: 4, brand: "Chevrolet", model: "Cruze" },
  { id: 5, brand: "Volkswagen", model: "Golf" },
  { id: 6, brand: "BMW", model: "3 Series" },
  { id: 7, brand: "Audi", model: "A4" },
  { id: 8, brand: "Mercedes-Benz", model: "C-Class" },
  { id: 9, brand: "Hyundai", model: "Elantra" },
  { id: 10, brand: "Kia", model: "Forte" },
];

const events = generateEvents(cars, 3);

function generateEvents(cars, years) {
  const types = ["Kradzież", "Przegląd", "Tankowanie", "Naprawa", "Inne"];
  const events = [];
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2025-01-01");

  cars.forEach((car) => {
    for (
      let year = startDate.getFullYear();
      year < endDate.getFullYear();
      year++
    ) {
      for (let month = 0; month < 12; month++) {
        const eventCount = types.length * 2;
        for (let i = 0; i < eventCount; i++) {
          const randomType = types[Math.floor(Math.random() * types.length)];
          let eventDate = new Date(year, month, 1);
          eventDate.setHours(Math.floor(Math.random() * 28) + 1);
          events.push({
            id: events.length + 1,
            carId: car.id,
            type: randomType,
            date: eventDate.toISOString().substring(0, 10),
            cost:
              randomType === "Kradzież"
                ? null
                : Math.floor(Math.random() * 500) + 100,
          });
        }
      }
    }
  });

  return events;
}

console.log(cars);
console.log(events);
