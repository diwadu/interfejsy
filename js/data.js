const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    registration: "AB 123",
    color: "Czerwony",
  },
  {
    id: 2,
    brand: "Ford",
    model: "Focus",
    registration: "GT 54345",
    color: "Zielony",
  },
  {
    id: 3,
    brand: "Honda",
    model: "Civic",
    registration: "CD 123",
    color: "Biały",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Cruze",
    registration: "EF 456",
    color: "Biały",
  },
  {
    id: 5,
    brand: "Volkswagen",
    model: "Golf",
    registration: "GH 778",
    color: "Czerwony",
  },
  {
    id: 6,
    brand: "BMW",
    model: "3 Series",
    registration: "IJ 555",
    color: "Zielony",
  },
  {
    id: 7,
    brand: "Audi",
    model: "A4",
    registration: "KL 123",
    color: "Czarny",
  },
  {
    id: 8,
    brand: "Mercedes-Benz",
    model: "C-Class",
    registration: "MN 332",
    color: "Czerwony",
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Elantra",
    registration: "OP 444",
    color: "Biały",
  },
  {
    id: 10,
    brand: "Kia",
    model: "Forte",
    registration: "RS 123",
    color: "Biały",
  },
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
            name: "Zgłoszono " + randomType,
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
