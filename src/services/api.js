/**
 * Fetch all software enquiries from the API
 * @returns {Promise<Array>} Array of enquiry objects
 */
export const fetchSoftwareEnquiries = async () => {
  try {
    const response = await fetch('https://zenoxserver.onrender.com/getSoftEnq');

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching software enquiries:', error);
    throw error;
  }
};

/**
 * Submit a new software enquiry
 * @param {Object} enquiryData - The enquiry data to submit
 * @returns {Promise<Object>} The created enquiry
 */
export const submitSoftwareEnquiry = async (enquiryData) => {
  try {
    const response = await fetch('https://zenoxserver.onrender.com/getSoftEnq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting software enquiry:', error);
    throw error;
  }
};

/**
 * Delete a software enquiry by ID
 * @param {string} enquiryId - The ID of the enquiry to delete
 * @returns {Promise<Object>} The deleted enquiry or success confirmation
 */
export const deleteSoftwareEnquiry = async (enquiryId) => {
  try {
    const response = await fetch(`https://zenoxserver.onrender.com/getSoftEnq/${enquiryId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting software enquiry:', error);
    throw error;
  }
};
