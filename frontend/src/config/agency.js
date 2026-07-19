/**
 * Official agency identity — single source of truth.
 *
 * The public brand (site, wordmark) is ANTALYA JOURNEY; the licensed operating
 * agency behind it is MARŞ TRAVEL, and the TÜRSAB licence belongs to that legal
 * entity — renaming the brand never changes the two constants below it.
 * Reference these constants wherever the identity appears instead of
 * hardcoding the values.
 */
export const BRAND_NAME = 'ANTALYA JOURNEY';
export const AGENCY_NAME = 'MARŞ TRAVEL';
export const AGENCY_LICENSE_NUMBER = '8926';

/**
 * Public social profiles. Add an entry here and it appears in the footer —
 * `handle` is what visitors see, `url` is where they go.
 */
export const SOCIAL_LINKS = [
  { id: 'tiktok', label: 'TikTok', handle: '@antalyajourney', url: 'https://www.tiktok.com/@antalyajourney' },
];

/**
 * Physical office, used by the footer map.
 *
 * `mapsQuery` is coordinates on purpose. The alternatives were tried and fail:
 * a name search ("Marş Travel Kemer") also matches a neighbouring "mars tour"
 * listing, the full postal address breaks the embed's parser on its commas and
 * slash, and Google's `ftid` place identifier is not supported by the keyless
 * embed. Coordinates drop exactly one pin, exactly where the office is.
 * Taken from the office's own Google Maps listing on 2026-07-19.
 */
export const OFFICE = {
  label: 'MARŞ TRAVEL',
  address: 'Kiriş Cd. No:57, Kiriş — Kemer / Antalya',
  shortAddress: 'Kemer, Antalya',
  mapsQuery: '36.5767256,30.5808517',
  /** Name-based link for the "get directions" button, which has no such parsing limits. */
  directionsQuery: 'Marş Travel, Kiriş Cd. No:57, 07980 Kemer/Antalya',
};
