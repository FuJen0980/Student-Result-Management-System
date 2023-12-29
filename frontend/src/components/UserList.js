import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>User List Page</h1>
            <ul>
                {users.map(user => (
                    <li key={user.uid}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;