import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
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
