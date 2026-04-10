const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchPosters = async () => {
  const response = await fetch(`${API_BASE_URL}/posters`);
  if (!response.ok) throw new Error('Failed to fetch posters');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
};
