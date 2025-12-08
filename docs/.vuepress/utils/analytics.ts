/**
 * GDPR/CCPA Compliant Analytics Implementation
 * 
 * This module provides manual analytics loading and tracking that only fires
 * after explicit user consent. No tracking occurs before consent is granted.
 */

import { GA_MEASUREMENT_ID, CONSENT_KEY, CONSENT_EXPIRY_MONTHS } from './constants';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Check if user has given consent for analytics
 */
export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const consentStr = localStorage.getItem(CONSENT_KEY);
    if (!consentStr) return false;
    
    try {
      // New format with timestamp
      const consentData = JSON.parse(consentStr);
      
      // Check if consent is true and not expired
      if (consentData.consent !== true) return false;
      
      // Check expiration
      if (!consentData.timestamp) return false;
      const monthsSinceConsent = (Date.now() - consentData.timestamp) / (1000 * 60 * 60 * 24 * 30);
      if (monthsSinceConsent > CONSENT_EXPIRY_MONTHS) return false;
      
      return true;
    } catch {
      // Old format (just 'true' or 'false')
      // Treat old format as expired for safety
      return false;
    }
  } catch {
    return false;
  }
}

/**
 * Manually inject analytics script into the page
 * Only called AFTER user consent is granted
 */
export function loadGA4(): void {
  if (typeof window === 'undefined') return;
  
  // Check if already loaded
  if (window.gtag) return;

  // Initialize dataLayer and gtag stub
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  // Inject the analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Track a page view
 * @param path - The page path to track
 * @param title - The page title
 */
export function trackPageView(path: string, title?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param parameters - Additional event parameters
 */
export function trackEvent(eventName: string, parameters?: Record<string, any>): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', eventName, parameters);
}

/**
 * Track outbound link clicks
 * @param url - The external URL being clicked
 * @param linkText - The text of the link
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: url,
    link_text: linkText,
    value: 1,
  });
}

/**
 * Track file downloads
 * @param url - The file URL
 * @param fileName - The name of the file
 */
export function trackDownload(url: string, fileName?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'file_download', {
    file_name: fileName || url.split('/').pop(),
    file_url: url,
    link_text: fileName,
  });
}

/**
 * Track video start
 * @param videoId - Video ID (e.g., YouTube video ID when using YouTube provider)
 * @param videoTitle - Title/description of the video
 * @param pagePath - Path of the page containing the video
 */
export function trackVideoStart(videoId: string, videoTitle?: string, pagePath?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'video_start', {
    video_id: videoId,
    video_title: videoTitle || document.title,
    page_path: pagePath || window.location.pathname,
  });
}

/**
 * Track video progress milestones
 * @param videoId - Video ID (e.g., YouTube video ID when using YouTube provider)
 * @param progress - Progress percentage (25, 50, 75, 100)
 * @param videoTitle - Title/description of the video
 */
export function trackVideoProgress(videoId: string, progress: number, videoTitle?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'video_progress', {
    video_id: videoId,
    video_progress: progress,
    video_title: videoTitle || document.title,
    page_path: window.location.pathname,
  });
}

/**
 * Track video completion
 * @param videoId - Video ID (e.g., YouTube video ID when using YouTube provider)
 * @param videoTitle - Title/description of the video
 */
export function trackVideoComplete(videoId: string, videoTitle?: string): void {
  if (!hasConsent() || !window.gtag) return;

  window.gtag('event', 'video_complete', {
    video_id: videoId,
    video_title: videoTitle || document.title,
    page_path: window.location.pathname,
  });
}

// Guards to prevent duplicate initialization
let autoTrackingInitialized = false;
let videoTrackingInitialized = false;

// Video progress milestones to track
const VIDEO_MILESTONES = [25, 50, 75, 100] as const;

/**
 * Set up automatic tracking for outbound links and downloads
 * Call this once when the app initializes
 */
export function setupAutoTracking(): void {
  if (typeof window === 'undefined' || autoTrackingInitialized) return;
  autoTrackingInitialized = true;

  // Track outbound links
  document.addEventListener('click', (e) => {
    if (!hasConsent()) return;

    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Check if it's an outbound link
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      const sanitizedText = (target.textContent || '').substring(0, 200).trim().replace(/[\n\r\t]/g, ' ');
      trackOutboundLink(href, sanitizedText || undefined);
    }

    // Check if it's a file download
    const downloadExtensions = ['.pdf', '.zip', '.tar', '.gz', '.dmg', '.exe', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
    if (downloadExtensions.some(ext => href.toLowerCase().endsWith(ext))) {
      const sanitizedText = (target.textContent || '').substring(0, 200).trim().replace(/[\n\r\t]/g, ' ');
      trackDownload(href, sanitizedText || href.split('/').pop());
    }
  });
}

/**
 * Set up VidStack video tracking
 * Monitors all VidStack video players on the page and tracks engagement
 */
export function setupVideoTracking(): void {
  if (typeof window === 'undefined' || videoTrackingInitialized) return;
  videoTrackingInitialized = true;

  const trackedVideos = new Map<string, {
    milestones: Set<number>;
    started: boolean;
  }>();

  /**
   * Extract YouTube video ID from media-player element
   */
  function extractVideoId(mediaPlayer: Element): string | null {
    // Look for the YouTube iframe inside the media-player
    const youtubeIframe = mediaPlayer.querySelector('iframe.vds-youtube');
    if (!youtubeIframe) return null;
    
    const src = youtubeIframe.getAttribute('src');
    if (!src) return null;
    
    // Extract video ID from YouTube embed URL
    // Format: https://www.youtube-nocookie.com/embed/VIDEO_ID?...
    const match = src.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }

  /**
   * Initialize tracking for a single video player
   */
  function initVideoTracking(mediaPlayer: Element): void {
    const videoId = extractVideoId(mediaPlayer);
    if (!videoId) return;

    // Check if already tracking this player instance
    if (mediaPlayer.hasAttribute('data-ga-tracked')) return;
    mediaPlayer.setAttribute('data-ga-tracked', 'true');

    // Initialize tracking state for this video
    if (!trackedVideos.has(videoId)) {
      trackedVideos.set(videoId, {
        milestones: new Set(),
        started: false,
      });
    }

    const trackingState = trackedVideos.get(videoId)!;

    // Track video start
    mediaPlayer.addEventListener('play', () => {
      if (!hasConsent()) return;
      if (!trackingState.started) {
        trackVideoStart(videoId, document.title, window.location.pathname);
        trackingState.started = true;
      }
    });

    // Track progress milestones
    mediaPlayer.addEventListener('time-update', (event: any) => {
      if (!hasConsent()) return;
      
      const detail = event.detail;
      if (!detail) return;

      const currentTime = detail.currentTime || 0;
      // Get duration from the player element itself, not from event
      const duration = 'duration' in mediaPlayer ? (mediaPlayer as any).duration : 0;
      
      if (duration === 0 || currentTime === 0) return;

      const progress = (currentTime / duration) * 100;

      // Track milestones
      for (const milestone of VIDEO_MILESTONES) {
        if (progress >= milestone && !trackingState.milestones.has(milestone)) {
          trackingState.milestones.add(milestone);
          trackVideoProgress(videoId, milestone, document.title);
        }
      }
    });

    // Track video completion
    mediaPlayer.addEventListener('ended', () => {
      if (!hasConsent()) return;
      trackVideoComplete(videoId, document.title);
    });
  }

  /**
   * Find and track all media-player elements on the page
   */
  function trackAllVideos(): void {
    const mediaPlayers = document.querySelectorAll('media-player');
    mediaPlayers.forEach(initVideoTracking);
  }

  // Initial tracking
  trackAllVideos();

  // Watch for dynamically added videos (for SPA navigation)
  const observer = new MutationObserver((mutations) => {
    let hasRelevantChanges = false;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (
          node instanceof Element &&
          (node.matches('media-player') ||
            node.querySelector('media-player'))
        ) {
          hasRelevantChanges = true;
          break;
        }
      }
      if (hasRelevantChanges) break;
    }
    if (hasRelevantChanges) {
      trackAllVideos();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

