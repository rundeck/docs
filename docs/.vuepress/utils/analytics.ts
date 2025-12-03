/**
 * GDPR/CCPA Compliant Analytics Implementation
 * 
 * This module provides manual analytics loading and tracking that only fires
 * after explicit user consent. No tracking occurs before consent is granted.
 */

const GA_MEASUREMENT_ID = 'G-05XJ24KPYH';
const CONSENT_KEY = 'ga_consent_given';

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
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

/**
 * Manually inject analytics script into the page
 * Only called AFTER user consent is granted
 */
export function loadGA4(): void {
  if (typeof window === 'undefined') return;
  
  // Check if already loaded
  if (window.gtag) {
    console.log('Analytics already loaded');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };

  // Set initial timestamp
  window.gtag('js', new Date());

  // Configure analytics with measurement ID
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll manually track page views
    anonymize_ip: true, // Privacy-friendly
  });

  // Inject the analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  console.log('Analytics loaded with consent');
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
 * @param videoId - YouTube video ID
 * @param videoTitle - Title/description of the video
 * @param pagePath - Path of the page containing the video
 */
export function trackVideoStart(videoId: string, videoTitle?: string, pagePath?: string): void {
  if (!hasConsent() || !window.gtag) return;

  console.log('📹 Video Start:', videoId);
  window.gtag('event', 'video_start', {
    video_id: videoId,
    video_title: videoTitle || document.title,
    page_path: pagePath || window.location.pathname,
  });
}

/**
 * Track video progress milestones
 * @param videoId - YouTube video ID
 * @param progress - Progress percentage (25, 50, 75, 100)
 * @param videoTitle - Title/description of the video
 */
export function trackVideoProgress(videoId: string, progress: number, videoTitle?: string): void {
  if (!hasConsent() || !window.gtag) return;

  console.log(`📊 Video Progress: ${progress}% - ${videoId}`);
  window.gtag('event', 'video_progress', {
    video_id: videoId,
    video_progress: progress,
    video_title: videoTitle || document.title,
    page_path: window.location.pathname,
  });
}

/**
 * Track video completion
 * @param videoId - YouTube video ID
 * @param videoTitle - Title/description of the video
 */
export function trackVideoComplete(videoId: string, videoTitle?: string): void {
  if (!hasConsent() || !window.gtag) return;

  console.log('✅ Video Complete:', videoId);
  window.gtag('event', 'video_complete', {
    video_id: videoId,
    video_title: videoTitle || document.title,
    page_path: window.location.pathname,
  });
}

/**
 * Set up automatic tracking for outbound links and downloads
 * Call this once when the app initializes
 */
export function setupAutoTracking(): void {
  if (typeof window === 'undefined') return;

  // Track outbound links
  document.addEventListener('click', (e) => {
    if (!hasConsent()) return;

    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Check if it's an outbound link
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      trackOutboundLink(href, target.textContent || undefined);
    }

    // Check if it's a file download
    const downloadExtensions = ['.pdf', '.zip', '.tar', '.gz', '.dmg', '.exe', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
    if (downloadExtensions.some(ext => href.toLowerCase().endsWith(ext))) {
      trackDownload(href, target.textContent || href.split('/').pop());
    }
  });
}

/**
 * Set up VidStack video tracking
 * Monitors all VidStack video players on the page and tracks engagement
 */
export function setupVideoTracking(): void {
  if (typeof window === 'undefined') return;

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
      const duration = (mediaPlayer as any).duration || 0;
      
      if (duration === 0 || currentTime === 0) return;

      const progress = (currentTime / duration) * 100;

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
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
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        trackAllVideos();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

