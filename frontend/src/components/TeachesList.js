import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Courses from '../components/Courses.js';
import 'bootstrap/dist/css/bootstrap.css';

const TeachesList = () => {

    const [Teaches, setTeaches] = useState([]);

    const fetchTeaches = () => {
        axios.get('http://localhost:8080/api/teaches')
            .then((teaches) => {
                const res = teaches.data;
                res.sort((a, b) => {
                    if (a.year !== b.year) {
                        return b.teach_year - a.teach_tear;
                    }
                    return b.semester - a.semester;
                })
                setTeaches(res);
            })
            .catch (error => console.log(error));
          
    }

    useEffect(() => {
        fetchTeaches();
    }, [])
    
    const handleTeaches = (teaches) => {

        const alertElem = document.getElementById("alert");

        if (!Courses.courses.some((course) => {
            return course === teaches.courseName;
        })) {
            showAlert(alertElem,"Course");
            return;
        }
        if (teaches.year < 999) {
            showAlert(alertElem,"Year");
            return;
        }

        const checkExit = Teaches.some((teach) => {
            return teaches.courseName === teach.courseName && teaches.semester === teach.semester && teaches.year === teach.year;
        })

        if (!checkExit) {
            
            seTimeout(() => {
                //test
                const id = 2;
                axios.post('http://localhost:8080/api/teaches', teaches, id) ///////
                    .then(fetchTeaches())
                    .catch(error => console.log(`Error: ${error}`))

            }, 1000);
        }
    }
    
    const addTeaches = (event,teacher_id) => {

        event.preventDefault();
        document.getElementById("alert").style.display = "none";

        const { courseName, semester, year } = event.target;
        const newCourse = {
            // courseName: courseName.value,
            semester: semester.value,
            teach_year: year.value,
            teacher_id: teacher_id

        }
        handleTeaches(newCourse);

    }

    const deleteTeaches = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/teaches/${id}`);
            fetchTeaches();
            
        } catch (error) {
            console.log(`Error: ${error}`);
        } 
    }


    return (
        <>
            
        </>
    )
}

export default TeachesList;