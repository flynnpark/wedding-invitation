export function trackEvent(eventName: string, params?: any) {
  window.gtag?.('event', eventName, params);
}
