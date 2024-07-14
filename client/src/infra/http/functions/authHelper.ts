import { useNavigate } from 'react-router-dom';

export function useHandleUnauthorizedError() {
    const navigate = useNavigate();

    return function handleUnauthorizedError(error: any) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt');
            navigate('/login');
        }
        return Promise.reject(error);
    };
}