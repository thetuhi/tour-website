import { BRAND_NAME, AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';

/**
 * Bilingual legal/policy content rendered by PolicyPage and linked from the
 * footer. Kept as structured data (not i18n JSON) because these are long
 * editorial documents, not UI strings. Booking-specific commercial terms are
 * deliberately not invented here — every policy defers to the written booking
 * confirmation issued by the agency.
 */

const LICENSE_EN = `Travel Agency Operating License No: ${AGENCY_LICENSE_NUMBER}`;
const LICENSE_RU = `Лицензия туристического агентства № ${AGENCY_LICENSE_NUMBER}`;

export const POLICY_ORDER = ['privacy', 'terms', 'cancellation'];

export const POLICIES = {
  privacy: {
    en: {
      title: 'Privacy Policy',
      updated: '13 July 2026',
      intro: `This policy explains what information is handled when you browse ${BRAND_NAME}, the online presentation channel of ${AGENCY_NAME} (${LICENSE_EN}), and what happens when you contact us.`,
      sections: [
        {
          heading: 'Who We Are',
          paragraphs: [
            `${BRAND_NAME} operates as an online sales and marketing channel of ${AGENCY_NAME}. Reservations, sales, and payment transactions are handled by ${AGENCY_NAME}, which acts as the data controller for personal information shared during the booking process.`,
          ],
        },
        {
          heading: 'Information We Collect',
          paragraphs: [
            'This website does not require an account and does not collect payment details. Your language preference is stored in your own browser so the site remembers it on your next visit.',
            'When you start a WhatsApp enquiry, we record an anonymous interaction event — the experience viewed, the interface language, the selected time slot, and the page it originated from — so we can understand which programs receive interest. This event contains no name, phone number, or other personal identifier.',
          ],
        },
        {
          heading: 'WhatsApp Communication',
          paragraphs: [
            'Contact buttons on this site open WhatsApp, a service operated by Meta Platforms and governed by its own terms and privacy policy. Information you choose to share in the conversation is used by our team solely to answer your enquiry and prepare your reservation.',
          ],
        },
        {
          heading: 'How Information Is Used',
          paragraphs: [
            'Information is used to respond to enquiries, arrange reservations, and improve the experiences we present. We do not sell personal data and we do not use third-party advertising networks on this website.',
          ],
        },
        {
          heading: 'Retention & Security',
          paragraphs: [
            'Personal information shared during booking is kept only as long as necessary for the reservation and any legal record-keeping obligations, and is protected with appropriate technical and organisational measures.',
          ],
        },
        {
          heading: 'Your Rights',
          paragraphs: [
            'Under the Turkish Personal Data Protection Law (KVKK, Law No. 6698) and other applicable legislation, you may request access to, correction of, or deletion of your personal data. Please reach us through the WhatsApp contact line on this site to exercise these rights.',
          ],
        },
        {
          heading: 'Changes to This Policy',
          paragraphs: [
            'We may update this policy from time to time. The date at the top of this page shows when it was last revised.',
          ],
        },
      ],
    },
    ru: {
      title: 'Политика конфиденциальности',
      updated: '13 июля 2026',
      intro: `В этом документе описано, какая информация обрабатывается при использовании сайта ${BRAND_NAME} — онлайн-канала агентства ${AGENCY_NAME} (${LICENSE_RU}) — и что происходит, когда вы связываетесь с нами.`,
      sections: [
        {
          heading: 'Кто мы',
          paragraphs: [
            `${BRAND_NAME} является каналом онлайн-продаж и маркетинга агентства ${AGENCY_NAME}. Бронирование, продажи и платёжные операции осуществляются агентством ${AGENCY_NAME}, которое выступает оператором персональных данных, передаваемых в процессе бронирования.`,
          ],
        },
        {
          heading: 'Какие данные мы собираем',
          paragraphs: [
            'Сайт не требует создания аккаунта и не собирает платёжные данные. Выбранный язык сохраняется в вашем браузере, чтобы сайт запомнил его при следующем визите.',
            'Когда вы начинаете обращение в WhatsApp, мы фиксируем анонимное событие взаимодействия — просмотренную программу, язык интерфейса, выбранное время и страницу перехода, — чтобы понимать, какие программы вызывают интерес. Это событие не содержит имени, номера телефона или иных персональных идентификаторов.',
          ],
        },
        {
          heading: 'Связь через WhatsApp',
          paragraphs: [
            'Кнопки связи на сайте открывают WhatsApp — сервис компании Meta Platforms, работающий по её собственным условиям и политике конфиденциальности. Информация, которой вы делитесь в переписке, используется нашей командой исключительно для ответа на запрос и подготовки бронирования.',
          ],
        },
        {
          heading: 'Как используется информация',
          paragraphs: [
            'Информация используется для ответов на запросы, организации бронирований и улучшения представленных программ. Мы не продаём персональные данные и не используем сторонние рекламные сети на этом сайте.',
          ],
        },
        {
          heading: 'Хранение и защита',
          paragraphs: [
            'Персональные данные, переданные при бронировании, хранятся только в течение срока, необходимого для оказания услуги и выполнения требований законодательства, и защищаются соответствующими техническими и организационными мерами.',
          ],
        },
        {
          heading: 'Ваши права',
          paragraphs: [
            'В соответствии с турецким Законом о защите персональных данных (KVKK, № 6698) и иным применимым законодательством вы можете запросить доступ к своим данным, их исправление или удаление. Для реализации этих прав свяжитесь с нами через WhatsApp.',
          ],
        },
        {
          heading: 'Изменения политики',
          paragraphs: [
            'Мы можем время от времени обновлять эту политику. Дата вверху страницы показывает, когда документ пересматривался в последний раз.',
          ],
        },
      ],
    },
  },

  terms: {
    en: {
      title: 'Terms of Use',
      updated: '13 July 2026',
      intro: `These terms govern the use of this website, operated under the ${BRAND_NAME} brand as the online presentation channel of ${AGENCY_NAME} (${LICENSE_EN}).`,
      sections: [
        {
          heading: 'About This Website',
          paragraphs: [
            `${BRAND_NAME} operates as an online sales and marketing channel of ${AGENCY_NAME}. Reservations, sales, and payment transactions are handled by ${AGENCY_NAME}.`,
          ],
        },
        {
          heading: 'Informational Content',
          paragraphs: [
            'Experience descriptions, photographs, itineraries, and inclusions are presented for information and may be updated or adjusted seasonally. Availability, final itinerary, and pricing are confirmed individually during the reservation conversation and in the written booking confirmation.',
          ],
        },
        {
          heading: 'Reservations & Payments',
          paragraphs: [
            `No payment is collected through this website. All reservations are concluded directly with ${AGENCY_NAME}, and the written booking confirmation you receive constitutes the binding description of the purchased service.`,
            'Payment is generally made during the experience in cash, or by online transfer. Experiences involving a flight are paid for in advance, since the air ticket is purchased at the time of booking; chartering a private yacht requires a prepayment for the yacht.',
          ],
        },
        {
          heading: 'Acceptable Use',
          paragraphs: [
            'You agree to use this website lawfully and not to interfere with its operation, attempt unauthorised access, or misuse the contact channels for purposes unrelated to genuine travel enquiries.',
          ],
        },
        {
          heading: 'Intellectual Property',
          paragraphs: [
            `All content on this website — texts, photographs, graphics, and the ${BRAND_NAME} identity — is protected and may not be reproduced or used commercially without prior written permission.`,
          ],
        },
        {
          heading: 'Limitation of Liability',
          paragraphs: [
            'While we keep the website content current and accurate, it is provided "as is" for general information. The binding terms of any travel service are those stated in your booking confirmation issued by the agency.',
          ],
        },
        {
          heading: 'Governing Law & Changes',
          paragraphs: [
            'These terms are governed by the laws of the Republic of Türkiye. We may revise them from time to time; the date above indicates the latest revision.',
          ],
        },
      ],
    },
    ru: {
      title: 'Условия использования',
      updated: '13 июля 2026',
      intro: `Настоящие условия регулируют использование этого сайта, работающего под брендом ${BRAND_NAME} как онлайн-канал агентства ${AGENCY_NAME} (${LICENSE_RU}).`,
      sections: [
        {
          heading: 'О сайте',
          paragraphs: [
            `${BRAND_NAME} является каналом онлайн-продаж и маркетинга агентства ${AGENCY_NAME}. Бронирование, продажи и платёжные операции осуществляются агентством ${AGENCY_NAME}.`,
          ],
        },
        {
          heading: 'Информационный характер контента',
          paragraphs: [
            'Описания программ, фотографии, маршруты и состав услуг носят информационный характер и могут сезонно обновляться. Наличие мест, итоговая программа и стоимость подтверждаются индивидуально в процессе бронирования и в письменном подтверждении.',
          ],
        },
        {
          heading: 'Бронирование и оплата',
          paragraphs: [
            `Оплата через этот сайт не принимается. Все бронирования оформляются напрямую с агентством ${AGENCY_NAME}; письменное подтверждение бронирования является обязательным описанием приобретённой услуги.`,
            'Как правило, оплата производится во время экскурсии наличными либо онлайн переводом. Перелётные экскурсии оплачиваются заранее, так как авиабилет выкупается при бронировании; при аренде индивидуальной яхты вносится предоплата за яхту.',
          ],
        },
        {
          heading: 'Правила использования',
          paragraphs: [
            'Вы обязуетесь использовать сайт законно, не нарушать его работу, не предпринимать попыток несанкционированного доступа и не использовать каналы связи в целях, не связанных с реальными туристическими запросами.',
          ],
        },
        {
          heading: 'Интеллектуальная собственность',
          paragraphs: [
            `Весь контент сайта — тексты, фотографии, графика и фирменный стиль ${BRAND_NAME} — защищён и не может воспроизводиться или использоваться в коммерческих целях без предварительного письменного разрешения.`,
          ],
        },
        {
          heading: 'Ограничение ответственности',
          paragraphs: [
            'Мы поддерживаем актуальность и точность материалов, однако сайт предоставляется «как есть» в информационных целях. Обязательными условиями туристической услуги являются условия, указанные в подтверждении бронирования, выданном агентством.',
          ],
        },
        {
          heading: 'Применимое право и изменения',
          paragraphs: [
            'Настоящие условия регулируются законодательством Турецкой Республики. Мы можем периодически их обновлять; дата вверху страницы указывает последнюю редакцию.',
          ],
        },
      ],
    },
  },

  cancellation: {
    en: {
      title: 'Cancellation & Refund Policy',
      updated: '13 July 2026',
      intro: `This policy describes the general framework for changes, cancellations, and refunds for experiences arranged through ${AGENCY_NAME} (${LICENSE_EN}).`,
      sections: [
        {
          heading: 'Scope',
          paragraphs: [
            `All reservations presented on this website are arranged and concluded with ${AGENCY_NAME}. Reservations, sales, and payment transactions are handled by ${AGENCY_NAME}.`,
          ],
        },
        {
          heading: 'Booking-Specific Terms',
          paragraphs: [
            'The exact cancellation window, change conditions, and any prepayment terms for your reservation are confirmed in writing at the time of booking. Those written terms take precedence over the general framework on this page.',
          ],
        },
        {
          heading: 'Changes Requested by the Guest',
          paragraphs: [
            'For experiences that do not include a flight ticket, the date can be changed no later than 24 hours before departure. To change the experience or the date, contact us via WhatsApp, Viber or Telegram. Rescheduling is offered subject to availability and the conditions stated in your booking confirmation.',
            'For experiences that include a flight ticket, the date cannot be changed, because the air tickets have been purchased.',
          ],
        },
        {
          heading: 'Weather & Safety',
          paragraphs: [
            'Yacht cruises and outdoor programs depend on safe conditions. If the captain or operator cancels a departure for weather or safety reasons, you will be offered an alternative date or a refund for the affected service in line with your booking terms.',
          ],
        },
        {
          heading: 'Cancellation by the Agency',
          paragraphs: [
            `If ${AGENCY_NAME} must cancel a confirmed service and no suitable alternative can be agreed, amounts paid for the affected service are refunded.`,
          ],
        },
        {
          heading: 'Refund Processing',
          paragraphs: [
            `Refunds are processed by ${AGENCY_NAME} to the original payment method. Processing times depend on the payment provider and bank.`,
          ],
        },
        {
          heading: 'No-Show',
          paragraphs: [
            'Failure to attend a confirmed departure without prior notice may not be refundable unless your booking confirmation states otherwise.',
          ],
        },
      ],
    },
    ru: {
      title: 'Политика отмены и возврата',
      updated: '13 июля 2026',
      intro: `Этот документ описывает общие правила изменения, отмены и возврата средств для программ, организуемых агентством ${AGENCY_NAME} (${LICENSE_RU}).`,
      sections: [
        {
          heading: 'Область применения',
          paragraphs: [
            `Все бронирования, представленные на сайте, оформляются с агентством ${AGENCY_NAME}. Бронирование, продажи и платёжные операции осуществляются агентством ${AGENCY_NAME}.`,
          ],
        },
        {
          heading: 'Условия конкретного бронирования',
          paragraphs: [
            'Точный срок отмены, условия изменения и условия предоплаты подтверждаются письменно в момент бронирования. Эти письменные условия имеют приоритет над общими правилами на этой странице.',
          ],
        },
        {
          heading: 'Изменения по инициативе гостя',
          paragraphs: [
            'Если программа не включает в себя авиабилет, дату можно поменять не позднее, чем за сутки до выезда. Чтобы поменять программу или дату, свяжитесь с нами по WhatsApp, Viber или Telegram. Перенос возможен при наличии мест и в соответствии с условиями вашего подтверждения бронирования.',
            'Если программа включает в себя авиабилет, дату поменять нельзя в связи с покупкой авиабилетов.',
          ],
        },
        {
          heading: 'Погода и безопасность',
          paragraphs: [
            'Яхтенные прогулки и программы на открытом воздухе зависят от безопасных условий. Если капитан или оператор отменяет выход по погодным причинам или из соображений безопасности, вам будет предложена альтернативная дата или возврат средств за затронутую услугу согласно условиям бронирования.',
          ],
        },
        {
          heading: 'Отмена со стороны агентства',
          paragraphs: [
            `Если ${AGENCY_NAME} вынуждено отменить подтверждённую услугу и подходящая альтернатива не согласована, оплаченные за эту услугу суммы возвращаются.`,
          ],
        },
        {
          heading: 'Порядок возврата',
          paragraphs: [
            `Возвраты осуществляются агентством ${AGENCY_NAME} на исходный способ оплаты. Сроки зачисления зависят от платёжного провайдера и банка.`,
          ],
        },
        {
          heading: 'Неявка',
          paragraphs: [
            'Неявка на подтверждённый выезд без предварительного уведомления может не подлежать возврату, если иное не указано в вашем подтверждении бронирования.',
          ],
        },
      ],
    },
  },
};
