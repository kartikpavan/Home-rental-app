const BASE_URL = "http://localhost:5000/api";

export async function registerUser(formData: any) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
