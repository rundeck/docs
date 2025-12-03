<template>
  <Transition name="cookie-banner-fade">
    <div v-if="showBanner" class="cookie-consent-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description">
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h3 id="cookie-consent-title" class="cookie-consent-title">Cookie Notice</h3>
          <p id="cookie-consent-description">
            We use cookies to improve your experience. By accepting, you consent to our use of analytics cookies.
            <a href="https://www.pagerduty.com/privacy-policy/" target="_blank" rel="noopener noreferrer" class="cookie-consent-link">Privacy Policy</a>
          </p>
        </div>
        <div class="cookie-consent-actions">
          <button @click="rejectCookies" class="cookie-btn cookie-btn-reject" aria-label="Reject cookies">
            Reject
          </button>
          <button @click="acceptCookies" class="cookie-btn cookie-btn-accept" aria-label="Accept cookies">
            Accept
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CONSENT_KEY } from '../utils/constants';

const showBanner = ref(false);

onMounted(() => {
  // Only show banner if user hasn't made a choice yet
  if (typeof window !== 'undefined') {
    try {
      const existingConsent = localStorage.getItem(CONSENT_KEY);
      if (existingConsent === null) {
        showBanner.value = true;
      }
    } catch (error) {
      // If localStorage is unavailable (e.g., private browsing), show the banner
      console.warn('localStorage unavailable:', error);
      showBanner.value = true;
    }
  }
});

const acceptCookies = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_KEY, 'true');
      showBanner.value = false;
      
      // Move focus to main content
      const mainContent = document.querySelector('main') || document.body;
      (mainContent as HTMLElement)?.focus();
      
      // Emit custom event that GA4 should be loaded
      window.dispatchEvent(new CustomEvent('ga-consent-granted'));
    } catch (error) {
      console.error('Failed to save consent preference:', error);
      // Still hide banner and dispatch event even if storage fails
      showBanner.value = false;
      window.dispatchEvent(new CustomEvent('ga-consent-granted'));
    }
  }
};

const rejectCookies = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_KEY, 'false');
      showBanner.value = false;
      
      // Move focus to main content
      const mainContent = document.querySelector('main') || document.body;
      if (mainContent && !(mainContent as HTMLElement).hasAttribute('tabindex')) {
        (mainContent as HTMLElement).setAttribute('tabindex', '-1');
      }
      (mainContent as HTMLElement)?.focus();
    } catch (error) {
      console.error('Failed to save consent preference:', error);
      // Still hide banner even if storage fails
      showBanner.value = false;
    }
  }
};
</script>

<style scoped>
.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--vp-c-bg, #ffffff);
  border-top: 2px solid var(--vp-c-brand, #3eaf7c);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 1.5rem;
}

.cookie-consent-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.cookie-consent-text {
  flex: 1;
  min-width: 280px;
}

.cookie-consent-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #2c3e50);
}

.cookie-consent-text p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-2, #476582);
}

.cookie-consent-link {
  color: var(--vp-c-brand, #3eaf7c);
  text-decoration: underline;
  font-weight: 500;
}

.cookie-consent-link:hover {
  color: var(--vp-c-brand-dark, #2d8659);
}

.cookie-consent-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.cookie-btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cookie-btn-accept {
  background: var(--vp-c-brand, #3eaf7c);
  color: #ffffff;
}

.cookie-btn-accept:hover {
  background: var(--vp-c-brand-dark, #2d8659);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(62, 175, 124, 0.3);
}

.cookie-btn-reject {
  background: transparent;
  color: var(--vp-c-text-2, #476582);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
}

.cookie-btn-reject:hover {
  background: var(--vp-c-bg-soft, #f6f8fa);
  border-color: var(--vp-c-text-2, #476582);
}

/* Transition effects */
.cookie-banner-fade-enter-active,
.cookie-banner-fade-leave-active {
  transition: all 0.3s ease;
}

.cookie-banner-fade-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.cookie-banner-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Dark mode support */
html.dark .cookie-consent-banner {
  background: var(--vp-c-bg, #1e1e1e);
  border-top-color: var(--vp-c-brand, #3eaf7c);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

html.dark .cookie-consent-title {
  color: var(--vp-c-text-1, #e0e0e0);
}

html.dark .cookie-consent-text p {
  color: var(--vp-c-text-2, #a0a0a0);
}

html.dark .cookie-btn-reject {
  color: var(--vp-c-text-2, #a0a0a0);
  border-color: var(--vp-c-divider, #3a3a3a);
}

html.dark .cookie-btn-reject:hover {
  background: var(--vp-c-bg-soft, #2a2a2a);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cookie-consent-content {
    flex-direction: column;
    gap: 1rem;
  }

  .cookie-consent-actions {
    width: 100%;
    flex-direction: row;
  }

  .cookie-btn {
    flex: 1;
  }
}
</style>

