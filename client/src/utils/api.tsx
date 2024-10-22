import axios from "axios";

// API instance'ı oluşturan fonksiyon
function api() {
    const instance = axios.create({
        baseURL: "http://localhost:3000", // API base URL
    });

    // Request interceptor: Token'ı her isteğe otomatik ekler
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor: Token süresi dolmuşsa login'e yönlendirir
    instance.interceptors.response.use(
        (response) => {
            return response; // Başarılı cevap ise olduğu gibi döner
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                // Token süresi dolduğunda Logout Componentine yönlendirerek oturumu sonlandırır.
                window.location.href = "/logout";
            }
            return Promise.reject(error); // Diğer hataları geri döner
        }
    );

    return instance;
}

export default api;
