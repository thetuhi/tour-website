/**
 * Frequently asked questions — EN + RU only, matching the site's language set.
 *
 * The Russian text is the source of truth, supplied by the agency; the English
 * is a faithful translation of it, not a rewrite. Answers are arrays of
 * paragraphs so the accordion can render the original paragraph breaks.
 *
 * Keep this file in step with `content/policies.js`: the cancellation policy
 * restates the change-of-date rule in Q3, and the terms restate the payment
 * rule in Q1. Editing one without the other leaves the site contradicting
 * itself.
 */
export const FAQ_ITEMS = [
  {
    id: 'payment',
    en: {
      question: 'How is the excursion paid for?',
      answer: [
        'You can pay during the excursion in cash — preferably in US dollars, euros or Turkish lira.',
        'Payment by online transfer in rubles and hryvnia is also possible.',
        '(Please note: excursions involving a flight are paid for immediately, as the plane ticket is purchased; likewise, when chartering a private yacht, a prepayment for the yacht is made.)',
      ],
    },
    ru: {
      question: 'Как оплачивается экскурсия?',
      answer: [
        'Оплатить можно во время экскурсии наличными - платить желательно долларами, евро или турецкой лирой.',
        'Так же возможна оплата онлайн переводом в рублях и гривнах.',
        '(Внимание: Перелётные экскурсии оплачиваются сразу так как выкупается билет на самолёт, также при аренде индивидуальной яхты оплачивается предоплата за яхту.)',
      ],
    },
  },
  {
    id: 'prices',
    en: {
      question: 'Why are our prices so different from those of tour operators?',
      answer: [
        'The point is that foreign tour operators (including Russian ones) do not have the legal right to organise excursions on the territory of Turkey, and are obliged to use the services of a local receiving party.',
        'Thus, the final product in the form of an excursion reaches tourists after passing through the chain «organising agency — tour operator’s head office — tour operator’s local office — hotel guide», and, naturally, the profit of each link in this chain is built into the price of the excursion.',
        'That is why the price of an excursion from a tour operator is approximately twice as high as the cost of an excursion bought directly from us, the agency that organises excursions in Antalya.',
      ],
    },
    ru: {
      question: 'Почему наши цены так отличаются от цен туроператоров?',
      answer: [
        'Дело в том, что иностранные туроператоры (в том числе российские) не имеют юридического права организовывать экскурсии на территории Турции, и вынуждены пользоваться услугами принимающей стороны.',
        'Таким образом, конечный продукт в виде экскурсии попадает к туристам пройдя цепочку «организующее агентство — головной офис туроператора — местный офис туроператора — отельный гид», и, естественно, выгода каждого из звеньев этой цепочки заложена в цену экскурсии.',
        'Поэтому цена экскурсии от туроператора примерно в 2 раза выше стоимости экскурсии, купленной напрямую у нас, агентства, организующего экскурсии в Анталии.',
      ],
    },
  },
  {
    id: 'change-date',
    en: {
      question: 'Can the date of the excursion be changed?',
      answer: [
        'If the excursion does not include a flight ticket, you can change the date no later than 24 hours in advance!',
        'To change the excursion or the date, simply contact us via WhatsApp, Viber or Telegram.',
        'If the excursion includes a flight ticket, the date cannot be changed, because the air tickets have been purchased.',
      ],
    },
    ru: {
      question: 'Можно ли изменить дату экскурсии?',
      answer: [
        'Если экскурсия не включает в себя авиабилет, дату можете поменять не позднее, чем за сутки!',
        'Чтобы поменять экскурсию или дату просто свяжитесь с нами по WhatsApp, Viber или Telegram.',
        'Если экскурсия включает в себя авиабилет, дату поменять нельзя в связи с покупкой авиабилетов.',
      ],
    },
  },
  {
    id: 'insurance',
    en: {
      question: 'Is insurance valid when travelling with you?',
      answer: [
        'Yes, it is certainly valid.',
        'When coming to Turkey on holiday, you are required to take out travel insurance (it is usually included in the package of tourist services when you buy a tour from an agency in your home country).',
        'Please remember that your individual insurance is valid throughout the entire territory of Turkey and in no way depends on where you are going on an excursion or where you booked it.',
        'In addition, under Turkish law all excursions, in accordance with the scope of activity they cover, are also additionally insured by the second party (the company organising them).',
      ],
    },
    ru: {
      question: 'Действует ли страховка отправляясь с Вами?',
      answer: [
        'Да, безусловно действует.',
        'Приезжая на отдых в Турцию, Вы обязаны оформить туристическую страховку (обычно она входит в пакет туристических услуг, когда Вы покупаете тур в агентстве на Родине).',
        'Пожалуйста, помните, что действие Вашей индивидуальной страховки распространяется на всю территорию Турции и никаким образом не зависит от того куда Вы едете на экскурсию и где Вы ее забронировали.',
        'Кроме того согласно турецкому законодательству все экскурсии в соответствии со сферой активности, которую они охватывают, также дополнительно застрахованы со второй стороны (фирмы их организующей).',
      ],
    },
  },
  {
    id: 'pickup',
    en: {
      question: 'Where should I wait for the excursion bus?',
      answer: [
        'On the stated date and time, be at the exit of your hotel (beyond the barrier).',
        'If the service is delayed, you can write to us.',
      ],
    },
    ru: {
      question: 'Где мне ждать автобус на экскурсии?',
      answer: [
        'В указанную дату и время будьте на выходе у вашего отеля (за шлагбаумом).',
        'В случае задержки сервиса можете написать нам.',
      ],
    },
  },
];

/**
 * Flattens bilingual FAQ items to a single language, falling back to English
 * for anything that is not Russian. Shared by the global FAQ page and the
 * per-tour FAQ blocks (see `faq` on a tour in `data/tours.js`) so the language
 * fallback logic lives in exactly one place.
 */
export const resolveFaq = (items, lang) => {
  const key = lang?.startsWith('ru') ? 'ru' : 'en';
  // Russian is the source of truth, so an item may carry only `ru`; fall back to
  // it (then `en`) when the requested language is missing, rather than resolving
  // to an empty row the accordion would choke on.
  return (items ?? []).map(item => ({ id: item.id, ...(item[key] ?? item.ru ?? item.en) }));
};

/** Resolves the global FAQ for a language. */
export const getFaq = (lang) => resolveFaq(FAQ_ITEMS, lang);
