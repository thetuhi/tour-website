export const WHATSAPP_NUMBER = "905343194815";

/**
 * Generates a dynamic WhatsApp link based on user selection.
 * @param {string} lang - 'en' or 'ru'
 * @param {string} tourTitleEn - Optional specific yacht title
 * @param {string} timeSlot - Optional ('day' or 'sunset')
 */
export const generateWhatsAppLink = (lang, tourTitleEn = null, timeSlot = null) => {
  const isRu = lang === 'ru';
  
  const slotText = timeSlot === 'day' ? '10:00-15:00' : '16:00-20:00';
  const slotNameEn = timeSlot === 'day' ? 'Day Tour' : 'Sunset Tour';
  const slotNameRu = timeSlot === 'day' ? 'Дневная прогулка' : 'Вечерняя прогулка Sunset';

  let message = "";

  if (tourTitleEn && timeSlot) {
    // Scenario B: Specific Yacht + Time
    message = isRu 
      ? `Здравствуйте, я хочу получить информацию о яхте ${tourTitleEn} на время ${slotNameRu} (${slotText}).`
      : `Hello, I want to get information about the ${tourTitleEn} for the ${slotNameEn} (${slotText}).`;
  } else if (timeSlot) {
    // Scenario A: Time Slot Only
    message = isRu
      ? `Здравствуйте, меня интересуют прогулки на яхтах: ${slotNameRu} (${slotText}).`
      : `Hello, I am interested in yacht tours for the ${slotNameEn} (${slotText}).`;
  } else if (tourTitleEn) {
    // Legacy fallback
    message = isRu
      ? `Здравствуйте, я хочу получить информацию о туре "${tourTitleEn}".`
      : `Hello, I would like to get information and pricing for the "${tourTitleEn}" tour.`;
  } else {
    message = isRu ? "Здравствуйте!" : "Hello!";
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
