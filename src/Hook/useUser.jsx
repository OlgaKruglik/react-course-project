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
            const response = await axios.get(`${API_BASE_URL}/users`);
            console.log('API Response:', response.data);

            if (response.headers['content-type'].includes('application/json')) {
                const filteredUsers = response.data.map(user => ({
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    password: user.password,
                    created_at: user.created_at,
                    is_lockedis_locked: user.is_locked || null,
                    is_deleted: user.is_deleted
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

    return { users, loading, error, refetchUsers: fetchUsers };
};

export default useFetchUsers;

