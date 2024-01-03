import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
 
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8080/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    const deleteUser = (uid) => {
        axios.delete(`http://localhost:8080/api/users/${uid}`).then(() => {
            console.log('User Deleted')
            fetchUsers()
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteAllUsers = () => {
        axios.delete(`http://localhost:8080/api/users/delete`).then(() => {
            console.log('All Users Deleted')
            fetchUsers()
        }).catch((err) => {
            console.log(err)
        })
    }

    
    return (
    <>
        <TableContainer component={Paper} style={{ margin: 'auto' }}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Password</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.uid}>
                            <TableCell component="th" scope="row">
                                {user.uid}
                            </TableCell>
                            <TableCell align="left">{user.role}</TableCell>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.password}</TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => deleteUser(user.uid)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button variant="text" color="error" onClick={() => deleteAllUsers()}>
            Delete All Users
        </Button>
    </>
    );
}

export default UserList;
