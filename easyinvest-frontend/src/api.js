// easyinvest-frontend/src/api.js

export const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000' // local backend
    : 'https://easyinvest-backend-1.onrender.com'; // Render backend

export const fetchData = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, options);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
};