import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        role: 'student', // Set the default role to 'student'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(`${API_URL}/auth/register`, formData, {
            headers: {
                'Content-Type': 'application/json', 
            }
        });

        if (response.status === 200) {
            const data = response.data;
            console.log('Registration successful:', data);
            // Redirect to login page or handle as needed
            navigate('/');
        } else {
            console.error('Registration failed');
        }
        } catch (error) {
        console.error('Error during registration:', error);
        }
    };

    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </label>
            <br />
            <label>
            Password:
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </label>
            <br />
            <label>
            Role:
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
            >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default RegisterPage;
