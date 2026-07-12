import axios, { type AxiosInstance, AxiosError } from 'axios';
import { useToastStore } from '../store/useToastStore';

/**
 * Esta es una instancia de axios apuntando a un microservicio especifico
 *
 * Cada servicio usa su propia instancia
 */
export function createApiClient(baseURL: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    client.interceptors.request.use((config) => {
        // Punto central para inyectar headers a futuro (auth, trace-id, etc.)
        return config;
    });

    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError<{ error?: string; message?: string }>) => {
            const backendMessage =
                error.response?.data?.error ?? error.response?.data?.message;

            const mensaje = backendMessage
                ? backendMessage
                : error.response
                    ? `Error ${error.response.status} al comunicarse con el servidor`
                    : 'No se pudo conectar con el servidor';

            useToastStore.getState().addToast(mensaje, 'error');

            return Promise.reject(error);
        }
    );

    return client;
}
