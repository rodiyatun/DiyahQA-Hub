/**
 * Platform detection utilities
 * Handles graceful degradation when running on web (Vercel)
 * vs desktop (Electron)
 */

export const isElectron = () =>
  typeof window !== 'undefined' &&
  window.navigator.userAgent.includes('Electron');

export const isWeb = () => !isElectron();

/**
 * Safe window.api wrapper — returns null gracefully on web
 * Usage: api()?.getProjects() instead of window.api?.getProjects()
 */
export const api = () =>
  typeof window !== 'undefined' && window.api ? window.api : null;

/**
 * Feature flags per platform
 */
export const features = {
  // Available on both web and desktop
  projects:      true,
  testCases:     true,
  bugReports:    true,
  dashboard:     true,
  teamAdmin:     true,
  workspace:     true,
  requirements:  true,
  tcLibrary:     true,
  docLab:        true,

  // Desktop only (require local filesystem/processes)
  automationLab: isElectron(),
  performanceLab: isElectron(),
  securityLab:   isElectron(),
  cicdLab:       isElectron(),
  sqlLab:        isElectron(),
  environmentManager: isElectron(),
  vaultSettings: isElectron(),
};

/**
 * Show "Desktop only" message for web users
 */
export const desktopOnlyMessage =
  '⚠️ Fitur ini hanya tersedia di aplikasi desktop.\nDownload DiyahQA Hub di diyahqa.com';
