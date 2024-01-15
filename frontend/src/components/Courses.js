import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [Courses, setCourses] = useState([])

    const fetchCourses = () => {
        axios.get(`${API_URL}/course`)
            .then((course) => { setCourses(course.data.courseName)})
            .catch((error) => { console.log(error) });
    }

    return (
        <>
        </>
    )

}

export default Courses;