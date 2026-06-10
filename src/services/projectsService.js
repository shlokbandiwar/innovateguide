import { MOCK_PROJECTS } from '../data/mockData';

export const projectsService = {
  /**
   * Fetches all projects, applying search query, category, sort, and budget filters.
   * @param {Object} filters 
   * @returns {Promise<Array>}
   */
  getProjects: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_PROJECTS];

        // Search Filter (Keyword matches in title/description)
        if (filters.q) {
          const query = filters.q.toLowerCase().trim();
          results = results.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.techStack.some(t => t.toLowerCase().includes(query))
          );
        }

        // Category Filter (Matching slug)
        if (filters.category && filters.category !== 'all') {
          results = results.filter(p => p.category === filters.category);
        }

        // Budget Filters
        if (filters.budgetMin !== undefined && filters.budgetMin !== '') {
          const min = Number(filters.budgetMin);
          results = results.filter(p => p.price >= min);
        }
        if (filters.budgetMax !== undefined && filters.budgetMax !== '') {
          const max = Number(filters.budgetMax);
          results = results.filter(p => p.price <= max);
        }

        // Sorting
        if (filters.sort) {
          if (filters.sort === 'price-asc') {
            results.sort((a, b) => a.price - b.price);
          } else if (filters.sort === 'price-desc') {
            results.sort((a, b) => b.price - a.price);
          } else if (filters.sort === 'trending') {
            results.sort((a, b) => b.rating - a.rating);
          }
        }

        resolve(results);
      }, 400); // Latency simulator
    });
  },

  /**
   * Fetches a project by its unique ID.
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  getProjectById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = MOCK_PROJECTS.find(p => p.id === id) || null;
        resolve(project);
      }, 200);
    });
  },

  /**
   * Simulates publishing a new project template listing.
   * @param {Object} projectData 
   * @returns {Promise<Object>}
   */
  createProject: (projectData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject = {
          id: `proj-${Date.now()}`,
          rating: 5.0,
          reviewsCount: 0,
          ...projectData
        };
        MOCK_PROJECTS.push(newProject);
        resolve(newProject);
      }, 500);
    });
  }
};
