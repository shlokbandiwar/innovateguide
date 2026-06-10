import { MOCK_CATEGORIES } from '../data/mockData';

export const categoriesService = {
  /**
   * Fetches all project categories.
   * @returns {Promise<Array>}
   */
  getCategories: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_CATEGORIES]);
      }, 300); // Mock network latency
    });
  },

  /**
   * Fetches a specific category by its ID.
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  getCategoryById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = MOCK_CATEGORIES.find(c => c.id === id) || null;
        resolve(category);
      }, 150);
    });
  }
};
