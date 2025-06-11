import axios from 'axios';
const API_URL = 'http://localhost:3333/especialistas';

export async function enviarEspecialista(datos: any) {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al enviar los datos del especialista:', error);
    throw error;
  }
}

export async function obtenerEspecialistas() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los especialistas:', error);
    throw error;
  }
}

export async function obtenerEspecialistaPorId(id: string) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el especialista con ID ${id}:`, error);
    throw error;
  }
}

export async function actualizarEspecialista(id: string, datos: any) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el especialista con ID ${id}:`, error);
    throw error;
  }
}

export async function eliminarEspecialista(id: number) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el especialista con ID ${id}:`, error);
    throw error;
  }
}
