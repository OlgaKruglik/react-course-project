import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const apiToken = localStorage.getItem("apiToken"); // Получаем токен из локального хранилища

        const response = await axios.get(`${API_BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${apiToken}`, // Добавляем токен в заголовок
            },
            withCredentials: true
        });
            if (response.headers['content-type'].includes('application/json')) {
                const filteredUsers = response.data.map(user => ({
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    password: user.password,
                    apiToken: user.apiToken || null,
                    created_at: user.created_at,
                    is_lockedis_locked: user.is_locked || null,
                    is_deleted: user.is_deleted,
                    forms: user.forms
                }));
                setUsers(filteredUsers);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Error fetching users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const findUserByEmail = (email) => {
        return users.find(user => user.email === email);
    };

    return { users, loading, error, refetchUsers: fetchUsers, findUserByEmail };
};

export default useFetchUsers;

