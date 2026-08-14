export const isWeb = () => {
  return typeof window.api === 'undefined';
};

export const isDesktop = () => {
  return typeof window.api !== 'undefined';
};

export const requireDesktop = (featureName) => {
  if (isWeb()) {
    alert(`Fitur "${featureName}" saat ini hanya tersedia di DiyahQA Hub Desktop App.`);
    return false;
  }
  return true;
};
