
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

/* ===========================
   Helpers
=========================== */
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function shuffle(arr) {
  return arr
    .map(v => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v);
}

function getImagesFromFolder(folder) {
  const dir = path.join(publicPath, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .map(file => `/${folder}/${file}`);
}

function getHotelImages(hotelFolder) {
  return getImagesFromFolder(hotelFolder);
}

function getTripImages(n = 3, tripFolder = 'trips') {
  const files = getImagesFromFolder(tripFolder);
  if (!files.length) return [];
  return shuffle(files).slice(0, n);
}

function getCarImages(carFolder) {
  return getImagesFromFolder(carFolder);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPrice(min, max) {
  return getRandomInt(min, max);
}
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function randomFutureRange(minStartOffset = 1, maxStartOffset = 60, minNights = 2, maxNights = 7) {
  const startOffset = getRandomInt(minStartOffset, maxStartOffset);
  const nights = getRandomInt(minNights, maxNights);
  const checkIn = addDays(new Date(), startOffset);
  const checkOut = addDays(checkIn, nights);
  return { checkIn, checkOut, nights };
}

/* ===========================
   Data
=========================== */
const roomTypes = [
  'Deluxe Suite',
  'Executive Room',
  'Standard Room',
  'Family Suite',
  'Penthouse Suite',
  'Ocean View Room',
  'Mountain View Room',
  'Presidential Suite',
  'Single Room',
  'Double Room',
];

const amenitiesList = [
  'WiFi', 'TV', 'Minibar', 'Sea View', 'Breakfast Included', 'Air Conditioner',
  'Balcony', 'Private Pool', 'Kitchen', 'Hot Tub'
];

const tripNames = [
  'Lerik macərası',
  'Masallı istirahəti',
  'Qəbələ gəzintisi',
  'Şəki turları',
  'Quba dağ havası',
  'Lənkəran spa səfəri',
  'Naftalan müalicəvi səfəri',
  'Nabran dəniz tətilləri',
  'Astara yay tətili',
  'İsmayıllı kənd turu'
];

const tripLocations = [
  'Lerik, Azerbaijan',
  'Masallı, Azerbaijan',
  'Qəbələ, Azerbaijan',
  'Şəki, Azerbaijan',
  'Quba, Azerbaijan',
  'Lənkəran, Azerbaijan',
  'Naftalan, Azerbaijan',
  'Nabran, Azerbaijan',
  'Astara, Azerbaijan',
  'İsmayıllı, Azerbaijan'
];

// Regions
const regionsData = [
  { name: 'Bakı', code: 'BAKU' },
  { name: 'Qəbələ', code: 'GBL' },
  { name: 'Şəki', code: 'SAK' },
  { name: 'Quba', code: 'QBA' },
  { name: 'Lənkəran', code: 'LNK' },
  { name: 'Naftalan', code: 'NFT' },
  { name: 'Nabran', code: 'NBR' },
  { name: 'Astara', code: 'AST' },
  { name: 'Masallı', code: 'MSL' },
  { name: 'Lerik', code: 'LRK' },
];

// RentaCar sadə demo kataloqu
const carsData = [
  { name: 'Toyota Corolla 2022', brand: 'Toyota', model: 'Corolla', year: 2022, seats: 5, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 55, photos: () => getCarImages('car1'), location: 'Bakı' },
  { name: 'Hyundai Elantra 2021', brand: 'Hyundai', model: 'Elantra', year: 2021, seats: 5, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 50, photos: () => getCarImages('car2'), location: 'Qəbələ' },
  { name: 'Kia Sportage 2020', brand: 'Kia', model: 'Sportage', year: 2020, seats: 5, transmission: 'AUTOMATIC', fuelType: 'DIESEL', pricePerDay: 70, photos: () => getCarImages('car3'), location: 'Şəki' },
  { name: 'Mercedes E200 2019', brand: 'Mercedes', model: 'E200', year: 2019, seats: 5, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 120, photos: () => getCarImages('car4'), location: 'Bakı' },
  { name: 'Nissan X-Trail 2018', brand: 'Nissan', model: 'X-Trail', year: 2018, seats: 5, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 65, photos: () => getCarImages('car5'), location: 'Quba' },
  { name: 'Mercedes E200 2019', brand: 'Mercedes', model: 'E200', year: 2019, seats: 7, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 120, photos: () => getCarImages('car4'), location: 'Bakı' },
  { name: 'BMW F50 2019', brand: 'BMW', model: 'F50', year: 2019, seats: 2, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 120, photos: () => getCarImages('car4'), location: 'Bakı' },
  { name: 'BMW F10 2019', brand: 'BMW', model: 'F10', year: 2019, seats: 4, transmission: 'AUTOMATIC', fuelType: 'GASOLINE', pricePerDay: 120, photos: () => getCarImages('car4'), location: 'Bakı' },
];

/* ===========================
   Seeds
=========================== */
async function seedUsers() {
  const usersData = [
    { email: 'alice@example.com', username: 'alice', photo: '/avatars/a1.jpg', firstName: 'Alice', lastName: 'Smith', hashedPassword: 'hashed_pw_1' },
    { email: 'bob@example.com', username: 'bob', photo: '/avatars/b1.jpg', firstName: 'Bob', lastName: 'Brown', hashedPassword: 'hashed_pw_2' },
    { email: 'carol@example.com', username: 'carol', photo: '/avatars/c1.jpg', firstName: 'Carol', lastName: 'Ng', hashedPassword: 'hashed_pw_3' },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      create: u,
      update: u,
    });
  }
}

async function seedRegions() {
  for (const r of regionsData) {
    await prisma.region.upsert({
      where: { code: r.code },
      create: r,
      update: r,
    });
  }
}

async function seedHotelsAndRooms() {
  const hotels = [
    {
      name: 'Grand Palace Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Istanbul, Turkey',
      address: '123 Bosphorus Street, Istanbul',
      rating: 4.8,
      photos: getHotelImages('hotel1'),
      pricePerNight: 250.0,
    },
    {
      name: 'Mountain View Resort',
      description: 'Perfect place to relax with a scenic mountain view.',
      location: 'Alps, Switzerland',
      address: '45 Alpine Road, Switzerland',
      rating: 4.5,
      photos: getHotelImages('hotel2'),
      pricePerNight: 180.0,
    },
    {
      name: 'Ocean Breeze Hotel',
      description: 'Enjoy a breathtaking view of the ocean.',
      location: 'Malibu, USA',
      address: '678 Pacific Coast Highway, Malibu',
      rating: 4.7,
      photos: getHotelImages('hotel3'),
      pricePerNight: 220.0,
    },
    {
      name: 'Grand Baku Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Baku, Azerbaijan',
      address: '123 Bosphorus Street, Baku',
      rating: 2,
      photos: getHotelImages('hotel1'),
      pricePerNight: 250.0,
    },
    {
      name: 'Grand Noxana Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Baku, Azerbaijan',
      address: '123 Bosphorus Street, Baku',
      rating: 2,
      photos: getHotelImages('hotel1'),
      pricePerNight: 200.0,
    },
    {
      name: 'Grand Summer Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Sumqayit, Azerbaijan',
      address: '123 Bosphorus Street, Baku',
      rating: 2,
      photos: getHotelImages('hotel2'),
      pricePerNight: 340.0,
    },
    {
      name: 'Baku Summer Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Sumqayit, Azerbaijan',
      address: '123 Bosphorus Street, Baku',
      rating: 3,
      photos: getHotelImages('hotel2'),
      pricePerNight: 340.0,
    },
    {
      name: 'Noxana Summer Hotel',
      description: 'Luxury hotel with an amazing sea view.',
      location: 'Sumqayit, Azerbaijan',
      address: '123 Bosphorus Street, Baku',
      rating: 3,
      photos: getHotelImages('hotel2'),
      pricePerNight: 340.0,
    },
  ];

  for (const hotelData of hotels) {
    const hotel = await prisma.hotel.create({ data: hotelData });

    for (let i = 0; i < 10; i++) {
      const randomAmenities = amenitiesList.sort(() => 0.5 - Math.random()).slice(0, 4);
      const randomRoomType = roomTypes[i % roomTypes.length];
      const randomPrice = getRandomPrice(100, 500);
      const roomPhotos = getHotelImages(`hotel${(hotels.indexOf(hotelData) + 1)}`);

      await prisma.room.create({
        data: {
          hotelId: hotel.id,
          type: randomRoomType,
          price: randomPrice,
          amenities: randomAmenities,
          photos: roomPhotos,
          isAvailable: Math.random() > 0.2,
        },
      });
    }
  }
}

// totalPrice = nights * SUM(selectedHotel.pricePerNight)
function computeTotalPriceForHotels(nights, hotels) {
  const perNightSum = hotels.reduce((s, h) => s + (h.pricePerNight || 0), 0);
  return nights * perNightSum;
}

async function seedTrips() {
  const users = await prisma.user.findMany();
  const hotels = await prisma.hotel.findMany();

  if (!users.length || !hotels.length) {
    throw new Error('Users və Hotels boşdur. Əvvəlcə onları seed et.');
  }

  for (let i = 0; i < 20; i++) {
    const user = users[getRandomInt(0, users.length - 1)];

    // Bu səfər üçün 1–3 hotel seç
    const shuffled = shuffle(hotels);
    const selectedHotelsCount = getRandomInt(1, Math.min(3, shuffled.length));
    const selectedHotels = shuffled.slice(0, selectedHotelsCount);

    const { checkIn, checkOut, nights } = randomFutureRange();
    const totalPrice = computeTotalPriceForHotels(nights, selectedHotels);

    const tripName = tripNames[getRandomInt(0, tripNames.length - 1)];
    const chosenLocation = tripLocations[getRandomInt(0, tripLocations.length - 1)];
    const tripPhotos = getTripImages(getRandomInt(1, 9));

    // 1) Trip yaradılır
    const trip = await prisma.trip.create({
      data: {
        name: tripName,
        userId: user.id,
        location: chosenLocation,
        checkIn,
        checkOut,
        guests: getRandomInt(1, 4),
        notes: Math.random() < 0.25 ? 'Late check-in' : null,
        totalPrice,
        currency: 'USD',
        status: 'CONFIRMED',
        photos: tripPhotos,
      },
    });

    // 2) Trip <-> Hotel bağla (upsert + hotelName)
    for (const h of selectedHotels) {
      await prisma.tripHotel.upsert({
        where: {
          tripId_hotelId: { tripId: trip.id, hotelId: h.id },
        },
        create: {
          tripId: trip.id,
          hotelId: h.id,
          hotelName: h.name,
        },
        update: {
          hotelName: h.name,
        },
      });
    }
  }
}

/* ===========================
   RentaCar + Region seeds
=========================== */
async function seedRentaCars() {
  const regions = await prisma.region.findMany();

  if (!regions.length) {
    throw new Error('Regions boşdur. Əvvəlcə regionları seed et.');
  }

  for (const c of carsData) {
    const created = await prisma.rentaCar.create({
      data: {
        name: c.name,
        brand: c.brand,
        currency: 'USD',
        model: c.model,
        year: c.year,
        seats: c.seats,
        transmission: c.transmission, // "AUTOMATIC" | "MANUAL"
        fuelType: c.fuelType,         // "GASOLINE" | ...
        pricePerDay: c.pricePerDay,
        photos: typeof c.photos === 'function' ? c.photos() : (c.photos || []),
        rating: getRandomInt(3, 5),
        location: c.location,
        available: Math.random() > 0.1,
      },
    });

    // Hər maşını 1–2 regiona bağla
    const shuffled = shuffle(regions);
    const howMany = getRandomInt(1, Math.min(2, shuffled.length));
    const selectedRegions = shuffled.slice(0, howMany);

    for (const r of selectedRegions) {
      await prisma.rentaCarRegion.upsert({
        where: {
          rentaCarId_regionId: { rentaCarId: created.id, regionId: r.id },
        },
        create: {
          rentaCarId: created.id,
          regionId: r.id,
        },
        update: {},
      });
    }
  }
}

/* ===========================
   Main
=========================== */
async function main() {
  // Təmizlə (seed-i təkrarlayanda problemsiz olsun)
  await prisma.booking.deleteMany({});
  await prisma.tripHotel.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.rentaCarRegion.deleteMany({});
  await prisma.rentaCar.deleteMany({});
  await prisma.region.deleteMany({});

  await seedRegions();
  await seedHotelsAndRooms();
  await seedUsers();
  await seedTrips();
  await seedRentaCars();

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
