
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosAPIInstance = axios.create({
    baseURL: `${process.env.NEXT_APP_SERVER}`,
});

const fetcher = async (args: AxiosRequestConfig): Promise<AxiosResponse | string> => {

    try {
        const response: AxiosResponse = await axiosAPIInstance(args);
        return response;
    } catch (error: unknown) {
        
        const axiosError = error as AxiosError;
        const { response } = axiosError;

        if (response && response.status === 401) {

            console.log("Cerrando sesión!");
            // window.location.href = '/logout';
        }

        return response || axiosError.request || axiosError.message;
    }

};

export default fetcher;
