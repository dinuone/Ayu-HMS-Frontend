// utils/search.js

/**
 * Global search function that filters an array of objects based on a search text.
 * @param {Array} data - The data to search through.
 * @param {string} searchText - The text to search for.
 * @returns {Array} - Filtered array of objects.
 */
export const globalSearch = (data, searchText) => {
    if (searchText.trim().length <= 1) {
        return data; // Return all data if the search text is empty or too short
    }

    return data.filter((item) =>
        Object.values(item).some((field) =>
            String(field).toLowerCase().includes(searchText.toLowerCase())
        )
    );
};
