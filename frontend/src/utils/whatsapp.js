export const WHATSAPP_NUMBER = "905343194815";

/**
 * Generates a dynamic WhatsApp link based on user selection.
 * @param {string} lang - 'en' or 'ru'
 * @param {string} tourTitleEn - Optional specific experience title
 * @param {string} timeSlot - Optional ('day' or 'sunset')
 * @param {string} phone - Optional representative number; falls back to the agency default
 */
export const generateWhatsAppLink = (lang, tourTitleEn = null, timeSlot = null, phone = null) => {
  const isRu = lang === 'ru';
  
  const slotText = timeSlot === 'day' ? '10:00-15:00' : '16:00-20:00';
  const slotNameEn = timeSlot === 'day' ? 'Day Cruise' : 'Sunset Cruise';
  const slotNameRu = timeSlot === 'day' ? 'Дневной круиз' : 'Круиз на закате';

  let message;

  if (tourTitleEn && timeSlot) {
    // Scenario B: Specific Yacht + Time
    message = isRu 
      ? `Здравствуйте, я хочу получить информацию о яхте ${tourTitleEn} на время ${slotNameRu} (${slotText}).`
      : `Hello, I want to get information about the ${tourTitleEn} for the ${slotNameEn} (${slotText}).`;
  } else if (timeSlot) {
    // Scenario A: Time Slot Only
    message = isRu
      ? `Здравствуйте, меня интересуют прогулки на яхтах: ${slotNameRu} (${slotText}).`
      : `Hello, I am interested in private yacht cruises for the ${slotNameEn} (${slotText}).`;
  } else if (tourTitleEn) {
    // Legacy fallback
    message = isRu
      ? `Здравствуйте, я хочу получить информацию о программе "${tourTitleEn}".`
      : `Hello, I would like to request the "${tourTitleEn}" experience.`;
  } else {
    message = isRu ? "Здравствуйте!" : "Hello!";
  }

  return `https://wa.me/${phone || WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
