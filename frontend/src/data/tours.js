/**
 * ANTALYA JOURNEY experience catalog, single source of truth.
 *
 * Migrated from the retired Spring Boot backend (DataInitializer META map +
 * seed catalog) on 2026-07-19. Content edits happen here and ship with the
 * next deploy; array order is the editorial display order within a category.
 *
 * To route an experience to a specific representative, add a
 * `contactPhone: '90XXXXXXXXXX'` field, the WhatsApp helper falls back to
 * the agency default number when absent.
 *
 * `coverImage` overrides which photo listing cards show, without disturbing
 * the gallery order in `imageUrls`. Omit it and the first image is used.
 */

export const TOURS = [
  // ═══════════════════════════════════════════
  // YACHT, Private yacht escapes
  // ═══════════════════════════════════════════
  {
    id: 1,
    slug: 'lusca-vip-yacht-tour',
    category: 'YACHT',
    titleEn: 'Lusca VIP Yacht Tour',
    titleRu: 'VIP Прогулка на Яхте Lusca',
    descriptionEn:
      'Experience the pinnacle of Mediterranean luxury aboard the Lusca, a world-class VIP yacht. Enjoy complete privacy, gourmet dining prepared by an onboard chef, premium open bar, and crystal-clear swimming stops in secluded turquoise coves. Professional crew, snorkeling gear, and sunset champagne service included. An unforgettable day on the Turkish Riviera.',
    descriptionRu:
      'Испытайте вершину средиземноморской роскоши на борту Lusca, яхты VIP-класса мирового уровня. Полная конфиденциальность, изысканная кухня от бортового шеф-повара, премиальный открытый бар и остановки для купания в уединённых бирюзовых бухтах. Профессиональная команда, снаряжение для сноркелинга и шампанское на закате включены. Незабываемый день на Турецкой Ривьере.',
    locationEn: 'Antalya Marina',
    locationRu: 'Марина Анталии',
    durationEn: '4-5 Hours',
    durationRu: '4-5 часов',
    imageUrls: [
      '/images/tours/lusca-vip-yacht-tour/lusca-1.webp',
      '/images/tours/lusca-vip-yacht-tour/lusca-2.webp',
    ],
    includedItemsEn: [
      'VIP Captain & Crew',
      'Gourmet Lunch',
      'Premium Open Bar',
      'Snorkeling Equipment',
      'Sunset Champagne',
      'Fuel & Insurance',
    ],
    includedItemsRu: [
      'VIP капитан и экипаж',
      'Обед от шеф-повара',
      'Премиальный открытый бар',
      'Снаряжение для снорклинга',
      'Шампанское на закате',
      'Топливо и страховка',
    ],
  },
  {
    id: 2,
    slug: 'brabus-vip-yacht-tour',
    category: 'YACHT',
    titleEn: 'Brabus VIP Yacht Tour',
    titleRu: 'VIP Тур на Яхте Brabus',
    descriptionEn:
      'Command the coastline aboard the Brabus, a high-performance luxury day yacht that pairs supercar DNA with open-sea freedom. Carve across the turquoise waters of the Turkish Riviera, drop anchor in hidden coves for swimming and snorkeling, and enjoy premium refreshments served by your private crew. For guests who want their day on the water to feel as thrilling as it is exclusive.',
    descriptionRu:
      'Покорите побережье на борту Brabus, высокопроизводительной люксовой яхты, соединившей ДНК суперкара со свободой открытого моря. Пронеситесь по бирюзовым водам Турецкой Ривьеры, бросьте якорь в укромных бухтах для купания и сноркелинга и насладитесь премиальными напитками от личной команды. Для гостей, которые хотят, чтобы день на воде был столь же захватывающим, сколь и эксклюзивным.',
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
    includedItemsEn: [
      'Private Captain & Crew',
      'Premium Refreshments',
      'Swimming & Snorkeling Stops',
      'Sound System On Board',
      'Fuel & Insurance',
    ],
    includedItemsRu: [
      'Личный капитан и экипаж',
      'Премиальные напитки и закуски',
      'Остановки для купания и снорклинга',
      'Музыкальная система на борту',
      'Топливо и страховка',
    ],
  },
  {
    id: 3,
    slug: 'kemer-group-yacht-tour',
    // In-city group experience, not a private VIP charter, kept out of the
    // YACHT segment (and its VIP badge) which is reserved for Lusca & Brabus.
    category: 'INCITY',
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
    includedItemsEn: [
      'Lunch on Board',
      'Swimming Stops',
      'Professional Crew',
      'Round-Trip Transfer',
      'Insurance',
    ],
    includedItemsRu: [
      'Обед на борту',
      'Остановки для купания',
      'Профессиональный экипаж',
      'Трансфер в обе стороны',
      'Страховка',
    ],
    // Per-tour FAQ, Russian only, agency-supplied source of truth.
    // Answers are arrays of paragraphs (see FaqAccordion).
    faq: [
      {
        id: 'what-is-it',
        ru: {
          question: 'Что представляет собой экскурсия на яхте в Кемере?',
          answer: [
            'Это морская прогулка на комфортабельной яхте с отправлением из марины Кемера: купание в живописных бухтах, обед на борту и пенная вечеринка. Полноценная экскурсия на целый день для семей, пар и компаний.',
          ],
        },
      },
      {
        id: 'bays',
        ru: {
          question: 'Какие бухты посещает яхта?',
          answer: [
            'Яхта делает остановки для купания в бухте Фаселис, Райской бухте (Paradise) и у Пиратской пещеры.',
          ],
        },
      },
      {
        id: 'duration',
        ru: {
          question: 'Сколько длится морская прогулка?',
          answer: [
            'Это экскурсия на целый день, с утра до второй половины дня, включая трансфер из отеля и обратно.',
          ],
        },
      },
      {
        id: 'included',
        ru: {
          question: 'Что входит в стоимость экскурсии?',
          answer: [
            'Трансфер из отеля и обратно, морская прогулка на яхте, обед на борту, развлекательная программа с пенной вечеринкой и сопровождение русскоговорящего персонала.',
          ],
        },
      },
      {
        id: 'lunch',
        ru: {
          question: 'Включён ли обед?',
          answer: [
            'Да, обед включён в стоимость и подаётся прямо на борту яхты.',
          ],
        },
      },
      {
        id: 'children',
        ru: {
          question: 'Подходит ли экскурсия для детей?',
          answer: [
            'Да, экскурсия отлично подходит для семей с детьми. Рекомендуем присматривать за детьми во время купания.',
          ],
        },
      },
      {
        id: 'non-swimmers',
        ru: {
          question: 'Можно ли участвовать, если я не умею плавать?',
          answer: [
            'Да. Купание необязательно, а на борту есть спасательные жилеты, вы можете просто отдыхать на яхте и наслаждаться программой.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        ru: {
          question: 'Нужно ли брать с собой полотенце и купальные принадлежности?',
          answer: [
            'Да, рекомендуем взять полотенце, купальник, солнцезащитный крем, головной убор и очки.',
          ],
        },
      },
      {
        id: 'guide',
        ru: {
          question: 'Есть ли русскоговорящий персонал?',
          answer: [
            'Да, на борту работает русскоговорящий персонал, готовый помочь и ответить на ваши вопросы.',
          ],
        },
      },
      {
        id: 'booking',
        ru: {
          question: 'Когда лучше бронировать экскурсию?',
          answer: [
            'Лучше бронировать заранее, особенно в высокий сезон, так как количество мест ограничено. Оформить бронь можно через WhatsApp или Telegram.',
          ],
        },
      },
      {
        id: 'best-season',
        ru: {
          question: 'Когда лучше ехать на прогулку на яхте в Кемере?',
          answer: [
            'Лучшее время, с поздней весны до ранней осени, когда тепло и море спокойное. Утренние выезды особенно удобны.',
          ],
        },
      },
      {
        id: 'why-choose',
        ru: {
          question: 'Почему туристы выбирают именно эту экскурсию?',
          answer: [
            'За красивые бухты, обед на борту, пенную вечеринку, включённый трансфер и русскоговорящий персонал, яркий и беззаботный день на море для всей семьи.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // INCITY, Antalya & immediate surroundings
  // ═══════════════════════════════════════════
  {
    id: 4,
    slug: 'green-canyon-boat-tour',
    category: 'INCITY',
    titleEn: 'Green Canyon Boat Tour',
    titleRu: 'Прогулка на Катере по Грин-Каньону',
    descriptionEn:
      "Cruise the emerald waters of Green Canyon, Turkey's largest canyon reservoir, framed by the pine-covered peaks of the Taurus Mountains. Glide past dramatic cliffs on a comfortable boat, swim in refreshing spring-fed waters, and enjoy a lakeside lunch surrounded by pure mountain silence. A serene escape just beyond Antalya.",
    descriptionRu:
      'Прогулка по изумрудным водам Грин-Каньона, крупнейшего каньонного водохранилища Турции в окружении сосновых вершин Таврских гор. Проплывите мимо величественных скал на комфортабельном катере, искупайтесь в освежающей родниковой воде и пообедайте на берегу в окружении горной тишины. Умиротворяющее путешествие совсем рядом с Анталией.',
    locationEn: 'Manavgat, Antalya',
    locationRu: 'Манавгат, Анталия',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/green-canyon/green-canyon-1.webp',
      '/images/tours/green-canyon/green-canyon-2.webp',
    ],
    includedItemsEn: [
      'Boat Cruise',
      'Lunch',
      'Swimming Stops',
      'Round-Trip Transfer',
      'Professional Guide',
      'Insurance',
    ],
    includedItemsRu: [
      'Прогулка на катере',
      'Обед',
      'Остановки для купания',
      'Трансфер в обе стороны',
      'Профессиональный гид',
      'Страховка',
    ],
    faq: [
      {
        id: 'duration',
        en: {
          question: 'How long is the excursion?',
          answer: [
            'The excursion lasts about 10 hours, from morning to evening, including the round-trip hotel transfer.',
          ],
        },
        ru: {
          question: 'Сколько длится экскурсия?',
          answer: [
            'Экскурсия длится около 10 часов, с утра до вечера, включая трансфер из отеля и обратно.',
          ],
        },
      },
      {
        id: 'included',
        en: {
          question: 'What is included in the price of the excursion?',
          answer: [
            'The price includes transfer, insurance, a yacht cruise on Green Canyon, a guide, and lunch.',
          ],
        },
        ru: {
          question: 'Что входит в стоимость экскурсии?',
          answer: [
            'В стоимость входят трансфер, страховка, прогулка на яхте по Green Canyon, сопровождение гида и обед.',
          ],
        },
      },
      {
        id: 'swimming',
        en: {
          question: 'Can I swim in Green Canyon?',
          answer: [
            'Yes. The excursion includes stops for swimming in the clean fresh water of the lake.',
          ],
        },
        ru: {
          question: 'Можно ли купаться в Green Canyon?',
          answer: [
            'Да. Во время экскурсии предусмотрены остановки для купания в чистой пресной воде озера.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the excursion suitable for children?',
          answer: [
            'Yes. Green Canyon is a relaxed excursion with no physical exertion, so it is perfect for families with children.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия детям?',
          answer: [
            'Да. Green Canyon, спокойная экскурсия без физических нагрузок, поэтому она отлично подходит для семей с детьми.',
          ],
        },
      },
      {
        id: 'what-to-see',
        en: {
          question: 'What is there to see in Green Canyon?',
          answer: [
            'You will see the emerald lake, tall mountains, pine forests, picturesque coves, and panoramic views of one of the most beautiful canyons in Turkey.',
          ],
        },
        ru: {
          question: 'Что посмотреть в Green Canyon?',
          answer: [
            'Вы увидите изумрудное озеро, высокие горы, сосновые леса, живописные бухты и панорамные виды одного из самых красивых каньонов Турции.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'We recommend bringing a swimsuit, a towel, comfortable shoes, sunscreen, a hat, sunglasses, water, and a camera.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Рекомендуем взять купальник, полотенце, удобную обувь, солнцезащитный крем, головной убор, очки, воду и фотоаппарат.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking guide?',
          answer: [
            'Yes. During the excursion the group is accompanied by a professional Russian-speaking guide.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный гид?',
          answer: [
            'Да. Во время экскурсии группу сопровождает профессиональный русскоговорящий гид.',
          ],
        },
      },
      {
        id: 'best-season',
        en: {
          question: 'When is the best time to visit Green Canyon?',
          answer: [
            'The excursion runs every day and is suitable for visiting from spring to late autumn. In summer it is especially pleasant thanks to the cool fresh water.',
          ],
        },
        ru: {
          question: 'Когда лучше ехать в Green Canyon?',
          answer: [
            'Экскурсия проводится ежедневно и подходит для посещения с весны до поздней осени. Летом здесь особенно приятно благодаря прохладной пресной воде.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can make a booking via WhatsApp or Telegram. After confirmation, a manager will tell you the exact transfer time.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Вы можете оформить бронирование через WhatsApp или Telegram. После подтверждения менеджер сообщит точное время трансфера.',
          ],
        },
      },
    ],
  },
  {
    id: 11,
    slug: 'goynuk-canyon',
    category: 'INCITY',
    titleEn: 'Göynük Canyon',
    titleRu: 'Каньон Гёйнюк',
    descriptionEn:
      'Escape into Göynük Canyon, a hidden natural wonder tucked beneath the Taurus Mountains near Kemer. Wade through cool, crystal-clear turquoise pools framed by towering grey cliffs, walk deep into the narrowing gorge, and cool off beneath shady pines and cascading spring water. A refreshing, easygoing day in nature, perfect for families, couples and anyone craving pure mountain air just minutes from the coast.',
    descriptionRu:
      'Откройте для себя каньон Гёйнюк, скрытое чудо природы у подножия Таврских гор рядом с Кемером. Пройдите по прохладным кристально чистым бирюзовым заводям в окружении высоких серых скал, углубитесь в сужающееся ущелье и освежитесь в тени сосен под струями родниковой воды. Освежающий и спокойный день на природе, идеально для семей, пар и всех, кто хочет вдохнуть чистый горный воздух всего в нескольких минутах от побережья.',
    locationEn: 'Göynük, Kemer',
    locationRu: 'Гёйнюк, Кемер',
    durationEn: 'Half Day',
    durationRu: 'Полдня',
    imageUrls: [
      '/images/tours/goynuk-canyon/goynuk-canyon-4.webp',
      '/images/tours/goynuk-canyon/goynuk-canyon-1.webp',
      '/images/tours/goynuk-canyon/goynuk-canyon-2.webp',
      '/images/tours/goynuk-canyon/goynuk-canyon-3.webp',
    ],
    coverImage: '/images/tours/goynuk-canyon/goynuk-canyon-1.webp',
    includedItemsEn: [
      'Round-Trip Transfer',
      'Canyon Entry',
      'Swimming Stops',
      'Insurance',
    ],
    includedItemsRu: [
      'Трансфер в обе стороны',
      'Вход в каньон',
      'Остановки для купания',
      'Страховка',
    ],
    // Per-tour FAQ, Russian is the agency-supplied source of truth, English is
    // a faithful translation. Answers are arrays of paragraphs (see FaqAccordion).
    faq: [
      {
        id: 'where',
        en: {
          question: 'Where is Göynük Canyon located?',
          answer: [
            'Göynük Canyon is located near the village of Göynük, about 15 km from the centre of Kemer, at the foot of the Taurus Mountains. The easiest way to get there is on an excursion from Kemer, the bus picks you up right at your hotel.',
          ],
        },
        ru: {
          question: 'Где находится Гёйнюк Каньон?',
          answer: [
            'Каньон Гёйнюк находится рядом с посёлком Гёйнюк, примерно в 15 км от центра Кемера, у подножия Таврских гор. Добраться удобнее всего на экскурсии из Кемера, автобус забирает прямо от отеля.',
          ],
        },
      },
      {
        id: 'included',
        en: {
          question: 'What is included in the price of the excursion?',
          answer: [
            'The price includes round-trip hotel transfer, the canyon entrance ticket and insurance, along with Russian-speaking staff. Zipline, rafting and canyoning are paid for separately and are optional.',
          ],
        },
        ru: {
          question: 'Что входит в стоимость экскурсии?',
          answer: [
            'В стоимость включены трансфер из отеля и обратно, входной билет в каньон и страховка, а также сопровождение русскоговорящего персонала. Зиплайн, рафтинг и каньонинг оплачиваются отдельно по желанию.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the excursion suitable for children?',
          answer: [
            'Yes, the route is calm and safe, so the excursion is perfect for families with children. Parents should keep an eye on children near the water and on the slippery rocks.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия детям?',
          answer: [
            'Да, маршрут спокойный и безопасный, поэтому экскурсия отлично подходит для семей с детьми. Родителям стоит присматривать за детьми у воды и на скользких камнях.',
          ],
        },
      },
      {
        id: 'swimming',
        en: {
          question: 'Do I need to know how to swim?',
          answer: [
            'No, swimming skills are not required. Bathing is optional, and for activities such as rafting you are given life jackets.',
          ],
        },
        ru: {
          question: 'Нужно ли уметь плавать?',
          answer: [
            'Нет, умение плавать не обязательно. Купание необязательно, а для активностей вроде рафтинга выдают спасательные жилеты.',
          ],
        },
      },
      {
        id: 'self-visit',
        en: {
          question: 'Can I visit the canyon on my own?',
          answer: [
            'You can, but the excursion is more convenient: transfer, entrance ticket and insurance are already included, and a Russian-speaking guide is with you. Going on your own often ends up more expensive and time-consuming.',
          ],
        },
        ru: {
          question: 'Можно ли посетить каньон самостоятельно?',
          answer: [
            'Можно, но экскурсия удобнее: трансфер, входной билет и страховка уже включены, а рядом есть русскоговорящий сопровождающий. Самостоятельная поездка чаще выходит дороже и дольше.',
          ],
        },
      },
      {
        id: 'activities',
        en: {
          question: 'What activities are available in the canyon?',
          answer: [
            'The canyon offers zipline, rafting and canyoning, for an extra fee and optional. You can also simply walk the trails, swim and photograph the nature of the Taurus Mountains.',
          ],
        },
        ru: {
          question: 'Какие развлечения доступны в каньоне?',
          answer: [
            'В каньоне доступны зиплайн, рафтинг и каньонинг, за отдельную плату и по желанию. Также можно просто гулять по тропам, купаться и фотографировать природу Таврских гор.',
          ],
        },
      },
      {
        id: 'free-time',
        en: {
          question: 'How much free time will there be?',
          answer: [
            'There is usually a few hours of free time, enough to walk along the river, swim, relax and take photos. The guide will tell you the exact meeting time on site.',
          ],
        },
        ru: {
          question: 'Сколько свободного времени будет?',
          answer: [
            'Свободного времени обычно несколько часов, достаточно, чтобы прогуляться вдоль реки, искупаться, отдохнуть и сделать фотографии. Точное время сбора сообщит сопровождающий на месте.',
          ],
        },
      },
      {
        id: 'footwear',
        en: {
          question: 'Do I need special footwear?',
          answer: [
            'No special gear is needed, but comfortable non-slip shoes are important, trainers or trekking sandals. Beach flip-flops are not suitable.',
          ],
        },
        ru: {
          question: 'Нужно ли брать специальную обувь?',
          answer: [
            'Специальное снаряжение не нужно, но важна удобная нескользящая обувь, кроссовки или трекинговые сандалии. Пляжные шлёпанцы не подойдут.',
          ],
        },
      },
      {
        id: 'best-time',
        en: {
          question: 'When is the best time to visit Göynük Canyon?',
          answer: [
            'The best time is from late spring to early autumn. In summer the canyon is cool and pleasant, and morning departures are the most comfortable.',
          ],
        },
        ru: {
          question: 'Когда лучше посещать Гёйнюк Каньон?',
          answer: [
            'Лучшее время, с поздней весны до ранней осени. Летом в каньоне прохладно и приятно, а утренние выезды самые комфортные.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking guide?',
          answer: [
            'Yes, throughout the excursion you are accompanied by Russian-speaking staff, ready to help and answer your questions.',
          ],
        },
        ru: {
          question: 'Есть ли русскоговорящий сопровождающий?',
          answer: [
            'Да, на протяжении всей экскурсии вас сопровождает русскоговорящий персонал, готовый помочь и ответить на вопросы.',
          ],
        },
      },
      {
        id: 'transfer',
        en: {
          question: 'How does the transfer work?',
          answer: [
            'The transfer is included in the price and runs on a comfortable air-conditioned bus. The driver picks you up at your hotel and brings you back after the excursion; the departure time depends on your region.',
          ],
        },
        ru: {
          question: 'Как проходит трансфер?',
          answer: [
            'Трансфер включён в стоимость и проходит на комфортабельном автобусе с кондиционером. Водитель забирает вас от отеля и после экскурсии отвозит обратно; время выезда зависит от региона.',
          ],
        },
      },
      {
        id: 'why-choose',
        en: {
          question: 'Why choose this excursion?',
          answer: [
            'Göynük Canyon means the beautiful nature of the Taurus Mountains, a clear mountain river and great photos right next to Kemer. Everything is included, there is Russian-speaking staff, and the format suits both active and family holidays.',
          ],
        },
        ru: {
          question: 'Почему стоит выбрать именно эту экскурсию?',
          answer: [
            'Гёйнюк Каньон, это красивая природа Таврских гор, чистая горная река и отличные фото совсем рядом с Кемером. Всё включено, есть русскоговорящий персонал, а формат подходит и для активного, и для семейного отдыха.',
          ],
        },
      },
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
    includedItemsEn: [
      'Rafting Equipment',
      'Jeep Safari',
      'Canyon Trek',
      'Professional Guide',
      'Lunch',
      'Round-Trip Transfer',
      'Insurance',
    ],
    includedItemsRu: [
      'Снаряжение для рафтинга',
      'Джип-сафари',
      'Поход по каньону',
      'Профессиональный гид',
      'Обед',
      'Трансфер в обе стороны',
      'Страховка',
    ],
    faq: [
      {
        id: 'included',
        en: {
          question: 'What is included in the excursion?',
          answer: [
            'The price includes round-trip hotel transfer, insurance, rafting, all necessary equipment, the accompaniment of instructors, and lunch. Depending on the chosen programme, a jeep safari and zipline may also be included.',
          ],
        },
        ru: {
          question: 'Что входит в экскурсию?',
          answer: [
            'В стоимость входят трансфер из отеля и обратно, страховка, рафтинг, необходимая экипировка, сопровождение инструкторов и обед. В зависимости от выбранной программы также могут быть включены джип-сафари и зиплайн.',
          ],
        },
      },
      {
        id: 'beginners',
        en: {
          question: 'Is the excursion suitable for beginners?',
          answer: [
            'Yes. A detailed safety briefing is held beforehand, and experienced instructors accompany the group during the descent. No special training is required.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия новичкам?',
          answer: [
            'Да. Перед началом проводится подробный инструктаж, а во время сплава группу сопровождают опытные инструкторы. Специальная подготовка не требуется.',
          ],
        },
      },
      {
        id: 'swimming-required',
        en: {
          question: 'Do I need to know how to swim?',
          answer: [
            'No. All participants are given life jackets, and professional instructors ensure safety throughout the route.',
          ],
        },
        ru: {
          question: 'Нужно ли уметь плавать?',
          answer: [
            'Нет. Всем участникам выдаются спасательные жилеты, а безопасность во время маршрута обеспечивают профессиональные инструкторы.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Can I go with children?',
          answer: [
            'Yes. The excursion is suitable for families with children; however, participation in the rafting is recommended for children in accordance with the organiser’s age restrictions.',
          ],
        },
        ru: {
          question: 'Можно ли ехать с детьми?',
          answer: [
            'Да. Экскурсия подходит для семей с детьми, однако участие в рафтинге рекомендуется детям в соответствии с возрастными ограничениями организатора.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'We recommend bringing a swimsuit, a towel, a change of clothes, comfortable shoes, sunscreen, a hat, water, and money for additional expenses.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Рекомендуем взять купальник, полотенце, сменную одежду, удобную обувь, солнцезащитный крем, головной убор, воду и деньги на дополнительные расходы.',
          ],
        },
      },
      {
        id: 'safety',
        en: {
          question: 'Is rafting safe?',
          answer: [
            'Yes. Modern protective equipment is used, and the route is under the constant supervision of experienced instructors.',
          ],
        },
        ru: {
          question: 'Безопасен ли рафтинг?',
          answer: [
            'Да. Используется современное защитное снаряжение, а маршрут проходит под постоянным контролем опытных инструкторов.',
          ],
        },
      },
      {
        id: 'zipline-optional',
        en: {
          question: 'Can I skip the zipline?',
          answer: [
            'Yes. The zipline is an optional activity, and taking part in it is left to the tourist’s discretion.',
          ],
        },
        ru: {
          question: 'Можно ли не участвовать в зиплайне?',
          answer: [
            'Да. Зиплайн является дополнительной активностью, и участие в нём остаётся на усмотрение туриста.',
          ],
        },
      },
      {
        id: 'when-held',
        en: {
          question: 'When does the excursion take place?',
          answer: [
            'The excursion runs daily from April to October, weather permitting.',
          ],
        },
        ru: {
          question: 'Когда проводится экскурсия?',
          answer: [
            'Экскурсия проводится ежедневно с апреля по октябрь при благоприятных погодных условиях.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking instructor?',
          answer: [
            'Yes. During the excursion, tourists are accompanied by Russian-speaking guides or company representatives.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный инструктор?',
          answer: [
            'Да. Во время экскурсии туристов сопровождают русскоговорящие гиды или представители компании.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can make a booking via WhatsApp or Telegram. After confirmation, a manager will tell you the exact transfer time.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Вы можете оформить бронирование через WhatsApp или Telegram. После подтверждения менеджер сообщит точное время трансфера.',
          ],
        },
      },
    ],
  },
  {
    id: 6,
    slug: 'land-of-legends-theme-park',
    category: 'INCITY',
    titleEn: 'Land of Legends Theme Park',
    titleRu: 'Тематический Парк Земля Легенд',
    descriptionEn:
      "A full day at the kingdom of thrills and wonder, Turkey's largest entertainment complex. Ride world-class roller coasters, cool off in the massive waterpark with over 40 slides, watch a spectacular dolphin show, and explore themed adventure zones. Perfect for families and adrenaline seekers alike. All entry tickets and hotel transfer included.",
    descriptionRu:
      'Полный день в королевстве восторга и чудес, крупнейшем развлекательном комплексе Турции. Аттракционы мирового класса, огромный аквапарк с более чем 40 горками, захватывающее шоу дельфинов и тематические зоны приключений. Идеально для семей и любителей адреналина. Все входные билеты и трансфер включены.',
    locationEn: 'Belek, Antalya',
    locationRu: 'Белек, Анталия',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/land-of-legends-theme-park/tematik-park-2.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-3.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-7.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-10.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-aquapark.webp',
      '/images/tours/land-of-legends-theme-park/tematik-park-map.webp',
    ],
    includedItemsEn: ['All Entry Tickets', 'Waterpark Access', 'Round-Trip Transfer'],
    includedItemsRu: ['Все входные билеты', 'Доступ в аквапарк', 'Трансфер в обе стороны'],
    faq: [
      {
        id: 'duration',
        en: {
          question: 'How long is the excursion?',
          answer: [
            'The excursion lasts approximately from 09:00 to 18:00, including the round-trip hotel transfer.',
          ],
        },
        ru: {
          question: 'Сколько длится экскурсия?',
          answer: [
            'Экскурсия длится примерно с 09:00 до 18:00, включая трансфер из отеля и обратно.',
          ],
        },
      },
      {
        id: 'included',
        en: {
          question: 'What is included in the price?',
          answer: [
            'The price includes transfer, insurance, an entry ticket (depending on the chosen tariff), and accompaniment.',
          ],
        },
        ru: {
          question: 'Что входит в стоимость?',
          answer: [
            'В стоимость входят трансфер, страховка, входной билет (в зависимости от выбранного тарифа) и сопровождение.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the park suitable for children?',
          answer: [
            'Yes. The park has special children’s pools, playgrounds, and safe water attractions for children of different ages.',
          ],
        },
        ru: {
          question: 'Подходит ли парк детям?',
          answer: [
            'Да. В парке есть специальные детские бассейны, игровые площадки и безопасные водные аттракционы для детей разных возрастов.',
          ],
        },
      },
      {
        id: 'waterpark-only',
        en: {
          question: 'Can I visit only the waterpark?',
          answer: [
            'Yes. It all depends on the ticket chosen. Various visit options are available.',
          ],
        },
        ru: {
          question: 'Можно ли посетить только аквапарк?',
          answer: [
            'Да. Всё зависит от выбранного билета. Доступны различные варианты посещения.',
          ],
        },
      },
      {
        id: 'extreme-slides',
        en: {
          question: 'Are there extreme slides?',
          answer: [
            'Yes. The Land of Legends offers many modern extreme water slides for adrenaline lovers.',
          ],
        },
        ru: {
          question: 'Есть ли экстремальные горки?',
          answer: [
            'Да. The Land of Legends предлагает множество современных экстремальных водных горок для любителей адреналина.',
          ],
        },
      },
      {
        id: 'dolphin-show',
        en: {
          question: 'Is there a dolphin show?',
          answer: [
            'Yes. On certain days you can attend a dolphin show, if it is included in the chosen ticket or available separately.',
          ],
        },
        ru: {
          question: 'Есть ли шоу дельфинов?',
          answer: [
            'Да. В определённые дни можно посетить шоу дельфинов, если оно включено в выбранный билет или доступно отдельно.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'Bring a swimsuit, a towel, sunscreen, a hat, comfortable shoes, and money for personal expenses.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Возьмите купальник, полотенце, солнцезащитный крем, головной убор, удобную обувь и деньги на личные расходы.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking representative?',
          answer: [
            'Yes. During the excursion, tourists are accompanied by a Russian-speaking company representative.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный сопровождающий?',
          answer: [
            'Да. Во время экскурсии туристов сопровождает русскоговорящий представитель компании.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can make a booking via WhatsApp or Telegram. After your request, a manager will contact you and confirm the order.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Оформить бронирование можно через WhatsApp или Telegram. После заявки менеджер свяжется с вами и подтвердит заказ.',
          ],
        },
      },
    ],
  },
  {
    id: 7,
    slug: 'antalya-aquarium-complex-experience',
    category: 'INCITY',
    titleEn: 'Antalya Aquarium Complex Experience',
    titleRu: 'Комплекс Аквариума Анталии',
    descriptionEn:
      "Discover a world of wonder at the Antalya Aquarium Complex, one of the planet's largest tunnel aquariums. Walk through 131 meters of underwater tunnel surrounded by sharks, rays, and tropical marine life. Then explore the legendary DaVinci Wax Museum with lifelike figures of Kobe Bryant, Michael Jackson, and Leonardo da Vinci. Finish with a magical visit to the Snow Room at -5°C. An all-in-one entertainment experience.",
    descriptionRu:
      'Откройте мир чудес в Комплексе Аквариума Анталии, одном из крупнейших туннельных аквариумов планеты. Пройдите 131 метр подводного туннеля в окружении акул, скатов и тропических обитателей. Затем исследуйте легендарный Музей восковых фигур Да Винчи с реалистичными фигурами Коби Брайанта, Майкла Джексона и Леонардо да Винчи. Завершите посещение волшебной Снежной комнатой при -5°C. Всё в одном месте.',
    locationEn: 'Konyaaltı, Antalya',
    locationRu: 'Коньяалты, Анталия',
    durationEn: 'Half Day',
    durationRu: 'Полдня',
    imageUrls: [
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-tunel.webp',
      '/images/tours/antalya-aquarium-complex-experience/antalya-akvaryum.webp',
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-2.webp',
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-3.webp',
      '/images/tours/antalya-aquarium-complex-experience/davinci-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/michael-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/kobe-balmumu.webp',
      '/images/tours/antalya-aquarium-complex-experience/akvaryum-karodasi.webp',
    ],
    includedItemsEn: [
      'Aquarium Entry',
      'Wax Museum Entry',
      'Snow Room Access',
      'Round-Trip Transfer',
    ],
    includedItemsRu: [
      'Вход в аквариум',
      'Вход в музей восковых фигур',
      'Доступ в снежную комнату',
      'Трансфер в обе стороны',
    ],
    faq: [
      {
        id: 'location',
        en: {
          question: 'Where is Antalya Aquarium located?',
          answer: [
            'Antalya Aquarium is located in the Konyaaltı district, just a few minutes’ drive from the centre of Antalya. The complex is easily accessible thanks to organised transfers from the popular resorts.',
          ],
        },
        ru: {
          question: 'Где находится Antalya Aquarium?',
          answer: [
            'Antalya Aquarium расположен в районе Коньяалты, всего в нескольких минутах езды от центра Анталии. Комплекс легко доступен благодаря организованному трансферу из популярных курортов.',
          ],
        },
      },
      {
        id: 'duration',
        en: {
          question: 'How long does the excursion take?',
          answer: [
            'The excursion lasts approximately from 09:00 to 13:00, including the round-trip hotel transfer. This is enough time to comfortably visit the main areas of the complex.',
          ],
        },
        ru: {
          question: 'Сколько времени занимает экскурсия?',
          answer: [
            'Экскурсия длится примерно с 09:00 до 13:00, включая трансфер из отеля и обратно. Этого времени достаточно, чтобы спокойно посетить основные зоны комплекса.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is Antalya Aquarium suitable for children?',
          answer: [
            'Yes. The complex is ideal for families with children thanks to its safe atmosphere, the variety of marine animals, and the additional themed areas.',
          ],
        },
        ru: {
          question: 'Подходит ли Antalya Aquarium детям?',
          answer: [
            'Да. Комплекс идеально подходит для семей с детьми благодаря безопасной атмосфере, разнообразию морских животных и дополнительным тематическим зонам.',
          ],
        },
      },
      {
        id: 'what-to-see',
        en: {
          question: 'What can I see inside?',
          answer: [
            'Guests can enjoy a huge underwater tunnel, sharks, rays, exotic fish, Snow World, Wild Park, a wax museum, and other modern entertainment areas.',
          ],
        },
        ru: {
          question: 'Что можно увидеть внутри?',
          answer: [
            'Гостей ждут огромный подводный тоннель, акулы, скаты, экзотические рыбы, Snow World, Wild Park, музей восковых фигур и другие современные развлекательные зоны.',
          ],
        },
      },
      {
        id: 'real-snow',
        en: {
          question: 'Is there real snow?',
          answer: [
            'Yes. The Snow World area maintains a sub-zero temperature all year round, so visitors can see real snow even in summer.',
          ],
        },
        ru: {
          question: 'Есть ли настоящий снег?',
          answer: [
            'Да. В зоне Snow World круглый год поддерживается отрицательная температура, поэтому посетители могут увидеть настоящий снег даже летом.',
          ],
        },
      },
      {
        id: 'photography',
        en: {
          question: 'Can I take photos?',
          answer: [
            'Yes. Photography and filming are allowed at Antalya Aquarium, so you can take beautiful photos and keep vivid memories.',
          ],
        },
        ru: {
          question: 'Можно ли фотографировать?',
          answer: [
            'Да. На территории Antalya Aquarium разрешена фото- и видеосъёмка, поэтому вы сможете сделать красивые фотографии и сохранить яркие впечатления.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'We recommend bringing comfortable shoes, a phone or camera, light clothing, and a warm sweater for visiting Snow World.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Рекомендуем взять удобную обувь, телефон или фотоаппарат, лёгкую одежду, а также тёплую кофту для посещения Snow World.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking representative?',
          answer: [
            'Yes. During the excursion, tourists are accompanied by a Russian-speaking company representative.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный сопровождающий?',
          answer: [
            'Да. Во время экскурсии туристов сопровождает русскоговорящий представитель компании.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can make a booking via WhatsApp or Telegram. After confirmation, a manager will tell you the exact transfer time.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Вы можете оформить бронирование через WhatsApp или Telegram. После подтверждения менеджер сообщит точное время трансфера.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // OUTCITY, Grand journeys beyond Antalya
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
    includedItemsEn: [
      'Round-Trip Flight',
      'Hotel (1 Night)',
      'Breakfast & Lunch',
      'All Entry Tickets',
      'Licensed Guide',
      'Bosphorus Cruise',
    ],
    includedItemsRu: [
      'Перелёт в обе стороны',
      'Отель (1 ночь)',
      'Завтрак и обед',
      'Все входные билеты',
      'Лицензированный гид',
      'Прогулка по Босфору',
    ],
    faq: [
      {
        id: 'duration',
        en: {
          question: 'How long does the excursion last?',
          answer: [
            'The excursion takes one full day. Departure is early in the morning, and the return to the hotel is late in the evening after the return flight from Istanbul.',
          ],
        },
        ru: {
          question: 'Сколько длится экскурсия?',
          answer: [
            'Экскурсия занимает один полный день. Выезд начинается рано утром, а возвращение в отель происходит поздно вечером после обратного перелёта из Стамбула.',
          ],
        },
      },
      {
        id: 'flight-included',
        en: {
          question: 'Is the flight included in the price?',
          answer: [
            'Yes. The price of the excursion includes the flight on the Antalya-Istanbul-Antalya route, as well as all necessary transfers.',
          ],
        },
        ru: {
          question: 'Входит ли авиаперелёт в стоимость?',
          answer: [
            'Да. В стоимость экскурсии входит перелёт по маршруту Анталия-Стамбул-Анталия, а также все необходимые трансферы.',
          ],
        },
      },
      {
        id: 'passport',
        en: {
          question: 'Do I need a passport?',
          answer: [
            'Yes. For domestic flights you must have a valid passport or another identity document.',
          ],
        },
        ru: {
          question: 'Нужен ли загранпаспорт?',
          answer: [
            'Да. Для внутренних авиаперелётов необходимо иметь действующий загранпаспорт или другой документ, удостоверяющий личность.',
          ],
        },
      },
      {
        id: 'program',
        en: {
          question: 'What does the excursion programme include?',
          answer: [
            'You will visit Sultanahmet Square, the Blue Mosque, Hagia Sophia, Topkapı Palace, the Egyptian Bazaar, and take a cruise along the Bosphorus.',
          ],
        },
        ru: {
          question: 'Что входит в программу экскурсии?',
          answer: [
            'Вы посетите площадь Султанахмет, Голубую мечеть, Айя-Софию, дворец Топкапы, Египетский базар и совершите прогулку по Босфору.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the excursion suitable for children?',
          answer: [
            'Yes. The excursion is suitable for the whole family. Children will enjoy discovering the history of Istanbul and seeing the city’s main sights.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия детям?',
          answer: [
            'Да. Экскурсия подходит для всей семьи. Детям будет интересно познакомиться с историей Стамбула и увидеть главные достопримечательности города.',
          ],
        },
      },
      {
        id: 'bosphorus',
        en: {
          question: 'Is there a Bosphorus cruise?',
          answer: [
            'Yes. The programme includes a boat cruise along the Bosphorus strait, offering beautiful views of the European and Asian sides of Istanbul.',
          ],
        },
        ru: {
          question: 'Есть ли прогулка по Босфору?',
          answer: [
            'Да. В программу входит прогулка на теплоходе по проливу Босфор, во время которой открываются красивые виды на европейскую и азиатскую части Стамбула.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking guide?',
          answer: [
            'Yes. During the excursion the group is accompanied by a professional Russian-speaking guide.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный гид?',
          answer: [
            'Да. Во время экскурсии группу сопровождает профессиональный русскоговорящий гид.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'Bring your passport, comfortable shoes, sunglasses, water, a camera, and money for personal expenses.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Возьмите паспорт, удобную обувь, солнцезащитные очки, воду, фотоаппарат и деньги на личные расходы.',
          ],
        },
      },
      {
        id: 'when-held',
        en: {
          question: 'When does the excursion take place?',
          answer: [
            'The excursion runs according to a schedule. You can check the current dates when booking.',
          ],
        },
        ru: {
          question: 'Когда проводится экскурсия?',
          answer: [
            'Экскурсия проводится в соответствии с расписанием. Актуальные даты можно уточнить при бронировании.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can make a booking via WhatsApp or Telegram. After confirmation, a manager will tell you the exact transfer time.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Вы можете оформить бронирование через WhatsApp или Telegram. После подтверждения менеджер сообщит точное время трансфера.',
          ],
        },
      },
    ],
  },
  {
    id: 9,
    slug: 'pamukkale-hierapolis-day-trip',
    category: 'OUTCITY',
    titleEn: 'Pamukkale Hierapolis Day Trip',
    titleRu: 'Поездка в Памуккале-Иераполис',
    descriptionEn:
      "Journey to the UNESCO World Heritage Site of Pamukkale, the breathtaking Cotton Castle of cascading white travertine terraces and warm thermal pools. Walk barefoot on the ancient calcium formations, swim in Cleopatra's thermal pool, and explore the remarkably preserved Greco-Roman city of Hierapolis with its grand theatre and sacred necropolis. Breakfast, lunch, and all entry fees included.",
    descriptionRu:
      'Отправьтесь к объекту Всемирного наследия ЮНЕСКО Памуккале, захватывающему «Хлопковому замку» из каскадных белых травертиновых террас и тёплых термальных бассейнов. Пройдитесь босиком по древним кальциевым образованиям, искупайтесь в термальном бассейне Клеопатры и исследуйте прекрасно сохранившийся греко-римский город Иераполис с его величественным театром и священным некрополем.',
    locationEn: 'Pamukkale, Denizli',
    locationRu: 'Памуккале, Денизли',
    durationEn: 'Full Day',
    durationRu: 'Весь день',
    imageUrls: [
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-1.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-6.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-2.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-3.webp',
      '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-4.webp',
    ],
    coverImage: '/images/tours/pamukkale-hierapolis-day-trip/pamukkale-1.webp',
    includedItemsEn: [
      'Breakfast',
      'Lunch',
      'All Entry Tickets',
      "Cleopatra's Pool",
      'Round-Trip Transfer',
      'Licensed Guide',
    ],
    includedItemsRu: [
      'Завтрак',
      'Обед',
      'Все входные билеты',
      'Бассейн Клеопатры',
      'Трансфер в обе стороны',
      'Лицензированный гид',
    ],
    // Per-tour FAQ, Russian is the agency-supplied source of truth, English is
    // a faithful translation. Answers are arrays of paragraphs (see FaqAccordion).
    faq: [
      {
        id: 'included',
        en: {
          question: 'What is included in the Pamukkale excursion?',
          answer: [
            'The price usually includes round-trip hotel transfer, insurance, a Russian-speaking guide, lunch, and visits to the main sights. The exact contents depend on the tour programme.',
          ],
        },
        ru: {
          question: 'Что входит в экскурсию в Памуккале?',
          answer: [
            'Обычно в стоимость входит трансфер из отеля и обратно, страховка, сопровождение русскоговорящего гида, обед и посещение основных достопримечательностей. Точный состав зависит от программы тура.',
          ],
        },
      },
      {
        id: 'what-to-see',
        en: {
          question: 'What is there to see in Pamukkale?',
          answer: [
            'During the excursion you will see the famous snow-white travertines, the ancient city of Hierapolis, the old Roman theatre, the vast necropolis, and the thermal springs. If you wish, you can also visit Cleopatra’s pool.',
          ],
        },
        ru: {
          question: 'Что посмотреть в Памуккале?',
          answer: [
            'Во время экскурсии вы увидите знаменитые белоснежные травертины, античный город Хиераполис, древний римский театр, огромный некрополь и термальные источники. По желанию можно посетить бассейн Клеопатры.',
          ],
        },
      },
      {
        id: 'cleopatra-pool',
        en: {
          question: 'Can I swim in Cleopatra’s pool?',
          answer: [
            'Yes. Swimming is available for an additional fee. The entry ticket costs €12. The pool maintains a comfortable temperature of thermal mineral water all year round.',
          ],
        },
        ru: {
          question: 'Можно ли купаться в бассейне Клеопатры?',
          answer: [
            'Да. Купание доступно за дополнительную плату. Стоимость входного билета составляет 12 €. В бассейне круглый год поддерживается комфортная температура термальной минеральной воды.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the excursion suitable for children?',
          answer: [
            'Yes. The excursion is perfect for families with children. Children under 4 are not provided with a separate seat on the bus when it is fully booked.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия детям?',
          answer: [
            'Да. Экскурсия отлично подходит для семей с детьми. Детям до 4 лет отдельное место в автобусе не предоставляется при полной загрузке.',
          ],
        },
      },
      {
        id: 'departure',
        en: {
          question: 'Which areas is there a departure from?',
          answer: [
            'Transfers run from Tekirova, Çamyuva, Kiriş, Kemer, Göynük, Beldibi 1, Beldibi 2 and Beldibi 3.',
          ],
        },
        ru: {
          question: 'Откуда есть выезд на экскурсию в Памуккале?',
          answer: [
            'Трансфер осуществляется из Текирова, Чамьюва, Кириш, Кемер, Гёйнюк, Бельдиби 1, Бельдиби 2 и Бельдиби 3.',
          ],
        },
      },
      {
        id: 'travel-time',
        en: {
          question: 'How long is the drive to Pamukkale from Antalya?',
          answer: [
            'The average travel time is about 3.5–4 hours, depending on the departure area and traffic conditions.',
          ],
        },
        ru: {
          question: 'Сколько ехать до Памуккале из Анталии?',
          answer: [
            'Среднее время в пути составляет около 3,5–4 часов в зависимости от региона отправления и дорожной ситуации.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring to Pamukkale?',
          answer: [
            'We recommend bringing a swimsuit, a towel, comfortable shoes, light clothing, sunscreen, a hat, sunglasses, water, and money for additional expenses.',
          ],
        },
        ru: {
          question: 'Что взять с собой в Памуккале?',
          answer: [
            'Рекомендуем взять купальник, полотенце, удобную обувь, легкую одежду, солнцезащитный крем, головной убор, очки, воду и деньги на дополнительные расходы.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking guide?',
          answer: [
            'Yes. The excursion is accompanied by a professional Russian-speaking guide who will tell you about the history of Pamukkale and Hierapolis.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный гид?',
          answer: [
            'Да. Экскурсию сопровождает профессиональный русскоговорящий гид, который расскажет об истории Памуккале и Хиераполиса.',
          ],
        },
      },
      {
        id: 'best-season',
        en: {
          question: 'When is the best time to visit Pamukkale?',
          answer: [
            'Pamukkale is open for visits all year round. Spring and autumn are considered the most comfortable seasons thanks to the mild weather.',
          ],
        },
        ru: {
          question: 'Когда лучше ехать в Памуккале?',
          answer: [
            'Памуккале открыт для посещения круглый год. Весна и осень считаются наиболее комфортными сезонами благодаря мягкой погоде.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the Pamukkale excursion?',
          answer: [
            'You can book the excursion via WhatsApp or Telegram. Once your request is submitted, a manager will contact you and confirm the booking.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию в Памуккале?',
          answer: [
            'Вы можете забронировать экскурсию через WhatsApp или Telegram. После оформления заявки менеджер свяжется с вами и подтвердит бронирование.',
          ],
        },
      },
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
    includedItemsEn: [
      'Cave Hotel (1 Night)',
      'Breakfast & Dinner',
      'All Entry Tickets',
      'Round-Trip Transfer',
      'Licensed Guide',
    ],
    includedItemsRu: [
      'Пещерный отель (1 ночь)',
      'Завтрак и ужин',
      'Все входные билеты',
      'Трансфер в обе стороны',
      'Лицензированный гид',
    ],
    faq: [
      {
        id: 'duration',
        en: {
          question: 'How long is the Cappadocia excursion?',
          answer: [
            'The excursion lasts 2 days and 1 night. Departure is early in the morning, with the return on the evening of the following day. In that time you will visit Cappadocia’s main sights and greet the famous sunrise with its hot air balloons.',
          ],
        },
        ru: {
          question: 'Сколько длится экскурсия в Каппадокию?',
          answer: [
            'Экскурсия длится 2 дня и 1 ночь. Выезд начинается рано утром, а возвращение, вечером следующего дня. За это время вы посетите главные достопримечательности Каппадокии и встретите знаменитый рассвет с воздушными шарами.',
          ],
        },
      },
      {
        id: 'included',
        en: {
          question: 'What is included in the price of the excursion?',
          answer: [
            'The price includes round-trip hotel transfer, insurance, the services of a Russian-speaking guide, accommodation in a 4★ hotel with half board, and a rich excursion programme.',
          ],
        },
        ru: {
          question: 'Что входит в стоимость экскурсии?',
          answer: [
            'В стоимость входят трансфер из отеля и обратно, страховка, услуги русскоговорящего гида, проживание в отеле 4★ с полупансионом и насыщенная экскурсионная программа.',
          ],
        },
      },
      {
        id: 'balloon',
        en: {
          question: 'Can I take a hot air balloon flight?',
          answer: [
            'Yes. The balloon flight is available for an additional fee (from €250) and takes place only in favourable weather conditions. The number of places is limited.',
          ],
        },
        ru: {
          question: 'Можно ли полетать на воздушном шаре?',
          answer: [
            'Да. Полет на воздушном шаре доступен за дополнительную плату (от 250 €) и проводится только при благоприятных погодных условиях. Количество мест ограничено.',
          ],
        },
      },
      {
        id: 'children',
        en: {
          question: 'Is the excursion suitable for children?',
          answer: [
            'Yes. The tour is suitable for the whole family. Children under 3 are given a separate seat on the bus only if free seats are available.',
          ],
        },
        ru: {
          question: 'Подходит ли экскурсия детям?',
          answer: [
            'Да. Тур подходит для всей семьи. Детям до 3 лет отдельное место в автобусе предоставляется только при наличии свободных мест.',
          ],
        },
      },
      {
        id: 'what-to-see',
        en: {
          question: 'What is there to see in Cappadocia?',
          answer: [
            'You will visit the Göreme open-air museum, the Valley of Love, Paşabağ Valley, Devrent Valley, Uçhisar Castle, an underground city, Avanos, and the best viewpoints.',
          ],
        },
        ru: {
          question: 'Что посмотреть в Каппадокии?',
          answer: [
            'Вы посетите музей под открытым небом Гёреме, долину Любви, долину Пашабаг, долину Дервент, крепость Учхисар, подземный город, Аванос и лучшие смотровые площадки.',
          ],
        },
      },
      {
        id: 'what-to-bring',
        en: {
          question: 'What should I bring?',
          answer: [
            'Bring comfortable shoes, light clothing, a warm sweater for the early morning, a hat, sunglasses, a camera, your passport or a copy of it, water, and money for additional expenses.',
          ],
        },
        ru: {
          question: 'Что взять с собой?',
          answer: [
            'Возьмите удобную обувь, легкую одежду, теплую кофту для раннего утра, головной убор, солнцезащитные очки, фотоаппарат, паспорт или его копию, воду и деньги на дополнительные расходы.',
          ],
        },
      },
      {
        id: 'prepayment',
        en: {
          question: 'Is a prepayment required?',
          answer: [
            'In high season, a small prepayment may be required to confirm the booking. The remaining amount is paid before the excursion.',
          ],
        },
        ru: {
          question: 'Нужна ли предоплата?',
          answer: [
            'В высокий сезон для подтверждения бронирования может потребоваться небольшая предоплата. Остальная сумма оплачивается перед экскурсией.',
          ],
        },
      },
      {
        id: 'best-season',
        en: {
          question: 'When is the best time to visit Cappadocia?',
          answer: [
            'Cappadocia is beautiful all year round. Spring and autumn are considered the most comfortable seasons, while balloon flights most often take place in summer.',
          ],
        },
        ru: {
          question: 'Когда лучше ехать в Каппадокию?',
          answer: [
            'Каппадокия прекрасна круглый год. Весна и осень считаются наиболее комфортными сезонами, а летом чаще всего проходят полеты на воздушных шарах.',
          ],
        },
      },
      {
        id: 'guide',
        en: {
          question: 'Is there a Russian-speaking guide?',
          answer: [
            'Yes. Throughout the excursion the group is accompanied by a professional Russian-speaking guide.',
          ],
        },
        ru: {
          question: 'Есть ли русскоязычный гид?',
          answer: [
            'Да. Во время всей экскурсии группу сопровождает профессиональный русскоговорящий гид.',
          ],
        },
      },
      {
        id: 'booking',
        en: {
          question: 'How do I book the excursion?',
          answer: [
            'You can quickly book the excursion via WhatsApp or Telegram. After your request, a manager will confirm the booking and let you know the exact transfer time.',
          ],
        },
        ru: {
          question: 'Как забронировать экскурсию?',
          answer: [
            'Вы можете быстро забронировать экскурсию через WhatsApp или Telegram. После заявки менеджер подтвердит бронирование и сообщит точное время трансфера.',
          ],
        },
      },
    ],
  },
];

export const getToursByCategory = (category) =>
  TOURS.filter((tour) => tour.category === category);

/** Listing-card photo: the explicit `coverImage` when set, else the first gallery image. */
export const getCoverImage = (tour) => tour.coverImage ?? tour.imageUrls?.[0];

/** Accepts the string id from useParams; returns null when not found. */
export const getTourById = (id) => TOURS.find((tour) => tour.id === Number(id)) ?? null;
