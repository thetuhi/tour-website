/**
 * ANTALYA JOURNEY experience catalog — single source of truth.
 *
 * Migrated from the retired Spring Boot backend (DataInitializer META map +
 * seed catalog) on 2026-07-19. Content edits happen here and ship with the
 * next deploy; array order is the editorial display order within a category.
 *
 * To route an experience to a specific representative, add a
 * `contactPhone: '90XXXXXXXXXX'` field — the WhatsApp helper falls back to
 * the agency default number when absent.
 *
 * `coverImage` overrides which photo listing cards show, without disturbing
 * the gallery order in `imageUrls`. Omit it and the first image is used.
 */

export const TOURS = [
  // ═══════════════════════════════════════════
  // YACHT — Private yacht escapes
  // ═══════════════════════════════════════════
  {
    id: 1,
    slug: 'lusca-vip-yacht-tour',
    category: 'YACHT',
    titleEn: 'Lusca VIP Yacht Tour',
    titleRu: 'VIP Прогулка на Яхте Lusca',
    descriptionEn:
      'Experience the pinnacle of Mediterranean luxury aboard the Lusca — a world-class VIP yacht. Enjoy complete privacy, gourmet dining prepared by an onboard chef, premium open bar, and crystal-clear swimming stops in secluded turquoise coves. Professional crew, snorkeling gear, and sunset champagne service included. An unforgettable day on the Turkish Riviera.',
    descriptionRu:
      'Испытайте вершину средиземноморской роскоши на борту Lusca — яхты VIP-класса мирового уровня. Полная конфиденциальность, изысканная кухня от бортового шеф-повара, премиальный открытый бар и остановки для купания в уединённых бирюзовых бухтах. Профессиональная команда, снаряжение для сноркелинга и шампанское на закате включены. Незабываемый день на Турецкой Ривьере.',
    locationEn: 'Antalya Marina',
    locationRu: 'Марина Анталии',
    durationEn: '4-5 Hours',
    durationRu: '4-5 часов',
    imageUrls: [
      '/images/tours/lusca-vip-yacht-tour/lusca-1.webp',
      '/images/tours/lusca-vip-yacht-tour/lusca-2.webp',
    ],
    includedItems: [
      'VIP Captain & Crew',
      'Gourmet Lunch',
      'Premium Open Bar',
      'Snorkeling Equipment',
      'Sunset Champagne',
      'Fuel & Insurance',
    ],
  },
  {
    id: 2,
    slug: 'brabus-vip-yacht-tour',
    category: 'YACHT',
    titleEn: 'Brabus VIP Yacht Tour',
    titleRu: 'VIP Тур на Яхте Brabus',
    descriptionEn:
      'Command the coastline aboard the Brabus — a high-performance luxury day yacht that pairs supercar DNA with open-sea freedom. Carve across the turquoise waters of the Turkish Riviera, drop anchor in hidden coves for swimming and snorkeling, and enjoy premium refreshments served by your private crew. For guests who want their day on the water to feel as thrilling as it is exclusive.',
    descriptionRu:
      'Покорите побережье на борту Brabus — высокопроизводительной люксовой яхты, соединившей ДНК суперкара со свободой открытого моря. Пронеситесь по бирюзовым водам Турецкой Ривьеры, бросьте якорь в укромных бухтах для купания и сноркелинга и насладитесь премиальными напитками от личной команды. Для гостей, которые хотят, чтобы день на воде был столь же захватывающим, сколь и эксклюзивным.',
    locationEn: 'Antalya Marina',
    locationRu: 'Марина Анталии',
    durationEn: '4-5 Hours',
    durationRu: '4-5 часов',
    imageUrls: [
      '/images/tours/brabus-vip-yacht-tour/brabus-1.webp',
      '/images/tours/brabus-vip-yacht-tour/brabus-2.webp',
      '/images/tours/brabus-vip-yacht-tour/brabus-3.webp',
      '/images/tours/brabus-vip-yacht-tour/brabus-4.webp',
      '/images/tours/brabus-vip-yacht-tour/brabus-5.webp',
      '/images/tours/brabus-vip-yacht-tour/brabus-6.webp',
    ],
    coverImage: '/images/tours/brabus-vip-yacht-tour/brabus-5.webp',
    includedItems: [
      'Private Captain & Crew',
      'Premium Refreshments',
      'Swimming & Snorkeling Stops',
      'Sound System On Board',
      'Fuel & Insurance',
    ],
  },
  {
    id: 3,
    slug: 'kemer-group-yacht-tour',
    category: 'YACHT',
    titleEn: 'Kemer Group Yacht Tour',
    titleRu: 'Групповой Тур на Яхте из Кемера',
    descriptionEn:
      'Set sail from Kemer on a spacious group yacht and spend the day among the most beautiful bays of the Turkish Riviera. Swim in crystal-clear waters beneath the Taurus Mountains, soak up the sun on deck, and enjoy a freshly prepared lunch on board. An easygoing, social way to experience the magic of the Mediterranean.',
    descriptionRu:
      'Отправляйтесь из Кемера на просторной яхте и проведите день среди красивейших бухт Турецкой Ривьеры. Купайтесь в кристально чистой воде у подножия Таврских гор, загорайте на палубе и наслаждайтесь свежеприготовленным обедом на борту. Лёгкий и дружеский способ ощутить магию Средиземноморья.',
    locationEn: 'Kemer Marina',
    locationRu: 'Марина Кемера',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: ['/images/tours/kemer-group-yacht-tour/kemer-1.webp'],
    includedItems: [
      'Lunch on Board',
      'Swimming Stops',
      'Professional Crew',
      'Round-Trip Transfer',
      'Insurance',
    ],
  },

  // ═══════════════════════════════════════════
  // INCITY — Antalya & immediate surroundings
  // ═══════════════════════════════════════════
  {
    id: 4,
    slug: 'green-canyon-boat-tour',
    category: 'INCITY',
    titleEn: 'Green Canyon Boat Tour',
    titleRu: 'Прогулка на Катере по Грин-Каньону',
    descriptionEn:
      "Cruise the emerald waters of Green Canyon — Turkey's largest canyon reservoir, framed by the pine-covered peaks of the Taurus Mountains. Glide past dramatic cliffs on a comfortable boat, swim in refreshing spring-fed waters, and enjoy a lakeside lunch surrounded by pure mountain silence. A serene escape just beyond Antalya.",
    descriptionRu:
      'Прогулка по изумрудным водам Грин-Каньона — крупнейшего каньонного водохранилища Турции в окружении сосновых вершин Таврских гор. Проплывите мимо величественных скал на комфортабельном катере, искупайтесь в освежающей родниковой воде и пообедайте на берегу в окружении горной тишины. Умиротворяющее путешествие совсем рядом с Анталией.',
    locationEn: 'Manavgat, Antalya',
    locationRu: 'Манавгат, Анталия',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/green-canyon/green-canyon-1.webp',
      '/images/tours/green-canyon/green-canyon-2.webp',
    ],
    includedItems: [
      'Boat Cruise',
      'Lunch',
      'Swimming Stops',
      'Round-Trip Transfer',
      'Professional Guide',
      'Insurance',
    ],
  },
  {
    id: 5,
    slug: 'triple-thrill-adventure-canyon-safari-rafting',
    category: 'INCITY',
    titleEn: 'Triple Thrill Adventure: Canyon, Safari, Rafting',
    titleRu: 'Тройное приключение: Каньон, Сафари, Рафтинг',
    descriptionEn:
      'Combine three heart-pounding adventures into one epic day. Start with white-water rafting on the roaring Köprüçay River, continue with an off-road jeep safari through the rugged Taurus Mountains, and finish with a breathtaking trek along the cliffs of Tazi Canyon. All safety equipment, professional guides, lunch, and round-trip hotel transfer included.',
    descriptionRu:
      'Три захватывающих приключения в одном эпическом дне. Рафтинг по бурным водам реки Кёпрючай, джип-сафари по суровым Таврским горам и захватывающий дух поход вдоль скал каньона Тази. Всё снаряжение, профессиональные гиды, обед и трансфер из отеля включены.',
    locationEn: 'Köprülü & Tazı Canyon',
    locationRu: 'Каньоны Кёпрюлю и Тазы',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/triple-thrill-adventure-canyon-safari-rafting/tazi-kanyon.webp',
      '/images/tours/triple-thrill-adventure-canyon-safari-rafting/rafting.webp',
      '/images/tours/triple-thrill-adventure-canyon-safari-rafting/jeep-safari.webp',
      '/images/tours/triple-thrill-adventure-canyon-safari-rafting/monster-jet.webp',
    ],
    includedItems: [
      'Rafting Equipment',
      'Jeep Safari',
      'Canyon Trek',
      'Professional Guide',
      'Lunch',
      'Round-Trip Transfer',
      'Insurance',
    ],
  },
  {
    id: 6,
    slug: 'land-of-legends-theme-park',
    category: 'INCITY',
    titleEn: 'Land of Legends Theme Park',
    titleRu: 'Тематический Парк Земля Легенд',
    descriptionEn:
      "A full day at the kingdom of thrills and wonder — Turkey's largest entertainment complex. Ride world-class roller coasters, cool off in the massive waterpark with over 40 slides, watch a spectacular dolphin show, and explore themed adventure zones. Perfect for families and adrenaline seekers alike. All entry tickets and hotel transfer included.",
    descriptionRu:
      'Полный день в королевстве восторга и чудес — крупнейшем развлекательном комплексе Турции. Аттракционы мирового класса, огромный аквапарк с более чем 40 горками, захватывающее шоу дельфинов и тематические зоны приключений. Идеально для семей и любителей адреналина. Все входные билеты и трансфер включены.',
    locationEn: 'Belek, Antalya',
    locationRu: 'Белек, Анталия',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/land-of-legends-theme-park/tematik-park-2.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-3.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-7.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-10.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-map.webp',
      '/images/tours/land-of-legends-theme-park/tema-park.webp',
    ],
    includedItems: ['All Entry Tickets', 'Waterpark Access', 'Round-Trip Transfer'],
  },
  {
    id: 7,
    slug: 'antalya-aquarium-complex-experience',
    category: 'INCITY',
    titleEn: 'Antalya Aquarium Complex Experience',
    titleRu: 'Комплекс Аквариума Анталии',
    descriptionEn:
      "Discover a world of wonder at the Antalya Aquarium Complex — one of the planet's largest tunnel aquariums. Walk through 131 meters of underwater tunnel surrounded by sharks, rays, and tropical marine life. Then explore the legendary DaVinci Wax Museum with lifelike figures of Kobe Bryant, Michael Jackson, and Leonardo da Vinci. Finish with a magical visit to the Snow Room at -5°C. An all-in-one entertainment experience.",
    descriptionRu:
      'Откройте мир чудес в Комплексе Аквариума Анталии — одном из крупнейших туннельных аквариумов планеты. Пройдите 131 метр подводного туннеля в окружении акул, скатов и тропических обитателей. Затем исследуйте легендарный Музей восковых фигур Да Винчи с реалистичными фигурами Коби Брайанта, Майкла Джексона и Леонардо да Винчи. Завершите посещение волшебной Снежной комнатой при -5°C. Всё в одном месте.',
    locationEn: 'Konyaaltı, Antalya',
    locationRu: 'Коньяалты, Анталия',
    durationEn: 'Half Day',
    durationRu: 'Полдня',
    imageUrls: [
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-tunel.webp',
      '/images/tours/antalya-aquarium-complex-experience/antalya-akvaryum.webp',
      '/images/tours/antalya-aquarium-complex-experience/davinci-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/michael-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/kobe-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-karodasi.webp',
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-3.webp',
    ],
    includedItems: [
      'Aquarium Entry',
      'Wax Museum Entry',
      'Snow Room Access',
      'Round-Trip Transfer',
    ],
  },

  // ═══════════════════════════════════════════
  // OUTCITY — Grand journeys beyond Antalya
  // ═══════════════════════════════════════════
  {
    id: 8,
    slug: 'istanbul-history-tour',
    category: 'OUTCITY',
    titleEn: 'Istanbul History Tour',
    titleRu: 'Исторический тур в Стамбул',
    descriptionEn:
      'Journey to the city where East meets West on this grand Istanbul excursion. Visit the legendary Hagia Sophia, marvel at the Blue Mosque, explore the opulent Topkapi Palace, and cruise the Bosphorus strait separating two continents. Browse the vibrant Grand Bazaar and savor authentic Turkish cuisine. A journey through 2,500 years of imperial history.',
    descriptionRu:
      'Отправьтесь в город, где Восток встречается с Западом. Посетите легендарный Собор Святой Софии, полюбуйтесь Голубой мечетью, исследуйте роскошный дворец Топкапы и совершите круиз по Босфору, разделяющему два континента. Загляните на оживлённый Гранд-Базар и насладитесь аутентичной турецкой кухней. Путешествие сквозь 2 500 лет имперской истории.',
    locationEn: 'Istanbul',
    locationRu: 'Стамбул',
    durationEn: '2 Days',
    durationRu: '2 дня',
    imageUrls: [
      '/images/tours/istanbul-history-tour/istanbul-hagia-sophia.webp',
      '/images/tours/istanbul-history-tour/istanbul-kiz-kulesi.webp',
      '/images/tours/istanbul-history-tour/istanbul-5.webp',
      '/images/tours/istanbul-history-tour/istanbul-3.webp',
      '/images/tours/istanbul-history-tour/istanbul-2.webp',
    ],
    includedItems: [
      'Round-Trip Flight',
      'Hotel (1 Night)',
      'Breakfast & Lunch',
      'All Entry Tickets',
      'Licensed Guide',
      'Bosphorus Cruise',
    ],
  },
  {
    id: 9,
    slug: 'pamukkale-hierapolis-day-trip',
    category: 'OUTCITY',
    titleEn: 'Pamukkale Hierapolis Day Trip',
    titleRu: 'Поездка в Памуккале — Иераполис',
    descriptionEn:
      "Journey to the UNESCO World Heritage Site of Pamukkale — the breathtaking Cotton Castle of cascading white travertine terraces and warm thermal pools. Walk barefoot on the ancient calcium formations, swim in Cleopatra's thermal pool, and explore the remarkably preserved Greco-Roman city of Hierapolis with its grand theatre and sacred necropolis. Breakfast, lunch, and all entry fees included.",
    descriptionRu:
      'Отправьтесь к объекту Всемирного наследия ЮНЕСКО Памуккале — захватывающему «Хлопковому замку» из каскадных белых травертиновых террас и тёплых термальных бассейнов. Пройдитесь босиком по древним кальциевым образованиям, искупайтесь в термальном бассейне Клеопатры и исследуйте прекрасно сохранившийся греко-римский город Иераполис с его величественным театром и священным некрополем.',
    locationEn: 'Pamukkale, Denizli',
    locationRu: 'Памуккале, Денизли',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-real.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-2.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-3.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-4.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-5.webp',
    ],
    includedItems: [
      'Breakfast',
      'Lunch',
      'All Entry Tickets',
      "Cleopatra's Pool",
      'Round-Trip Transfer',
      'Licensed Guide',
    ],
  },
  {
    id: 10,
    slug: 'cappadocia-adventure-balloons',
    category: 'OUTCITY',
    titleEn: 'Cappadocia Adventure & Balloons',
    titleRu: 'Приключения и воздушные шары в Каппадокии',
    descriptionEn:
      'Embark on an unforgettable two-day journey to the magical land of Cappadocia. Stay in an authentic cave hotel carved into the volcanic rock, explore underground cities built millennia ago, visit ancient Byzantine cave churches, and optionally soar above the iconic fairy chimneys in a hot air balloon at sunrise. All meals, accommodation, and professional guide included.',
    descriptionRu:
      'Отправьтесь в незабываемое двухдневное путешествие в волшебную Каппадокию. Остановитесь в аутентичном пещерном отеле, исследуйте подземные города, посетите древние византийские пещерные церкви и по желанию поднимитесь над знаменитыми каменными столбами на воздушном шаре на рассвете. Все приёмы пищи, проживание и профессиональный гид включены.',
    locationEn: 'Cappadocia',
    locationRu: 'Каппадокия',
    durationEn: '2 Days',
    durationRu: '2 дня',
    imageUrls: [
      '/images/tours/cappadocia-adventure-balloons/kapadokya-2.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-3.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-4.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-5.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-6.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-7.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-8.webp',
      '/images/tours/cappadocia-adventure-balloons/kapadokya-1.webp',
    ],
    includedItems: [
      'Cave Hotel (1 Night)',
      'Breakfast & Dinner',
      'All Entry Tickets',
      'Round-Trip Transfer',
      'Licensed Guide',
    ],
  },
];

export const getToursByCategory = (category) =>
  TOURS.filter((tour) => tour.category === category);

/** Listing-card photo: the explicit `coverImage` when set, else the first gallery image. */
export const getCoverImage = (tour) => tour.coverImage ?? tour.imageUrls?.[0];

/** Accepts the string id from useParams; returns null when not found. */
export const getTourById = (id) => TOURS.find((tour) => tour.id === Number(id)) ?? null;
