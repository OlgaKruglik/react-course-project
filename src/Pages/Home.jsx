import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { API_BASE_URL } from '../config';

function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/users`, {
                    withCredentials: true // 🔹 Важно для CORS
                });

                console.log('API Response:', response.data);

                if (response.headers['content-type']?.includes('application/json')) {
                    setUsers(response.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err.message || 'Ошибка при загрузке пользователей');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                component={RouterLink} 
                to="/login"
            >
                Sign Up
            </Button>
            <h1>Список пользователей</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.username}</strong> ({user.email})
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>Пользователи не найдены</p>
            )}
        </div>
    );
}

export default Home;
