/**
 * Shared constants for analytics implementation
 */

export const GA_MEASUREMENT_ID = 'G-05XJ24KPYH';
export const CONSENT_KEY = 'ga_consent_given';

/**
 * Custom event names for consent management
 */
export const CONSENT_GRANTED_EVENT = 'ga-consent-granted';
export const CONSENT_REVOKED_EVENT = 'ga-consent-revoked';
export const CONSENT_DENIED_EVENT = 'ga-consent-denied';

/**
 * Consent expiration period in months (GDPR compliance)
 * Set to 6 months to comply with strictest regulations
 */
export const CONSENT_EXPIRY_MONTHS = 6;

