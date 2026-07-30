/**
 * Contact links, single source of truth for the agency's WhatsApp + Telegram.
 *
 * One number serves both channels. Change CONTACT_NUMBER here and every CTA,
 * the navbar and the footer follow. WHATSAPP_NUMBER stays as an alias so the
 * existing imports keep working.
 */
export const CONTACT_NUMBER = '905384574112';
export const WHATSAPP_NUMBER = CONTACT_NUMBER;

/** Human-readable form shown next to the contact icons. */
export const CONTACT_PHONE_DISPLAY = '+90 538 457 41 12';

/**
 * Builds the pre-filled enquiry text shared by the contact channels.
 * @param {string} lang - 'en' or 'ru'
 * @param {string} tourTitleEn - Optional specific experience title
 * @param {string} timeSlot - Optional ('day' or 'sunset')
 */
const buildMessage = (lang, tourTitleEn = null, timeSlot = null) => {
  const isRu = lang === 'ru';

  const slotText = timeSlot === 'day' ? '10:00-15:00' : '16:00-20:00';
  const slotNameEn = timeSlot === 'day' ? 'Day Cruise' : 'Sunset Cruise';
  const slotNameRu = timeSlot === 'day' ? 'Дневной круиз' : 'Круиз на закате';

  if (tourTitleEn && timeSlot) {
    // Specific yacht + time slot
    return isRu
      ? `Здравствуйте, я хочу получить информацию о яхте ${tourTitleEn} на время ${slotNameRu} (${slotText}).`
      : `Hello, I want to get information about the ${tourTitleEn} for the ${slotNameEn} (${slotText}).`;
  }
  if (timeSlot) {
    // Time slot only
    return isRu
      ? `Здравствуйте, меня интересуют прогулки на яхтах: ${slotNameRu} (${slotText}).`
      : `Hello, I am interested in private yacht cruises for the ${slotNameEn} (${slotText}).`;
  }
  if (tourTitleEn) {
    // Experience without a slot
    return isRu
      ? `Здравствуйте, я хочу получить информацию о программе "${tourTitleEn}".`
      : `Hello, I would like to request the "${tourTitleEn}" experience.`;
  }
  return isRu ? 'Здравствуйте!' : 'Hello!';
};

/**
 * WhatsApp deep link with a pre-filled enquiry.
 * @param {string} phone - Optional representative number; falls back to the agency default
 */
export const generateWhatsAppLink = (lang, tourTitleEn = null, timeSlot = null, phone = null) => {
  const message = buildMessage(lang, tourTitleEn, timeSlot);
  return `https://wa.me/${phone || CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
};

/**
 * Telegram deep link. A phone-based t.me link opens the chat directly; Telegram
 * does not reliably pre-fill text on phone links, so the enquiry is composed by
 * the visitor in the chat (WhatsApp keeps the pre-filled message).
 * @param {string} phone - Optional representative number; falls back to the agency default
 */
export const generateTelegramLink = (phone = null) => {
  return `https://t.me/+${phone || CONTACT_NUMBER}`;
};
