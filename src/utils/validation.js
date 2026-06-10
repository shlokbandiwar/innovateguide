/**
 * Validates whether the given string is a valid email address format.
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates request title length constraints.
 * @param {string} title 
 * @returns {boolean}
 */
export const validateTitle = (title) => {
  return typeof title === 'string' && title.trim().length >= 10;
};

/**
 * Validates request description length constraints.
 * @param {string} desc 
 * @returns {boolean}
 */
export const validateDescription = (desc) => {
  return typeof desc === 'string' && desc.trim().length >= 50;
};

/**
 * Validates target price bounds.
 * @param {number|string} price 
 * @returns {boolean}
 */
export const validatePrice = (price) => {
  const val = Number(price);
  return !isNaN(val) && val > 0;
};

/**
 * Validates that the selected timeline is at least a week out.
 * @param {string} dateString 
 * @returns {boolean}
 */
export const validateTimeline = (dateString) => {
  if (!dateString) return false;
  const target = new Date(dateString);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 7;
};
