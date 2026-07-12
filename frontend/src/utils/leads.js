import { API_URL } from './api';

/**
 * Fire-and-forget lead capture when a visitor starts the WhatsApp flow.
 * Must never block or break the contact flow — errors are silently ignored.
 */
export const recordLead = ({ tourId = null, language = null, source = null, timeSlot = null }) => {
  try {
    fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tourId, language, source, timeSlot }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore — contact flow must continue regardless */
  }
};
