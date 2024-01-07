import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [Courses, setCourses] = useState([])

    const fetchCourses = () => {
        axios.get('http://localhost:8080/api/course')
            .then((course) => { setCourses(course.data.courseName)})
            .catch((error) => { console.log(error) });
    }

    return (
        <>
        </>
    )

}

export default Courses;