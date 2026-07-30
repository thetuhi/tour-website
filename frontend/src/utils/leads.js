import { trackEvent } from './measure';

/**
 * Lead capture when a visitor starts the WhatsApp flow.
 * Reported as a GA4 conversion event (the backend lead store was retired
 * on 2026-07-19); the WhatsApp inbox itself is the actual lead list.
 * Must never block or break the contact flow.
 */
export const recordLead = ({
  tourId = null,
  tourTitle = null,
  language = null,
  source = null,
  timeSlot = null,
}) => {
  trackEvent('whatsapp_contact', {
    tour_id: tourId,
    tour_title: tourTitle,
    language,
    source,
    time_slot: timeSlot,
  });
};
