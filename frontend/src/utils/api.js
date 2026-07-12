/**
 * Central API configuration.
 * Set VITE_API_URL in a .env file for non-local environments;
 * defaults to the local Spring Boot backend.
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const TOURS_API = `${API_URL}/api/tours`;
