import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Head from './header.js';
import { useState,useEffect} from 'react';
import { Button} from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

const Teacher_input = () => {
    const homepagestyle = {
        backgroundImage: "url(" + "https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '610px'
    }

    const [Courses, setCourses] = useState([
        {
            id: 1,
            checked: false,
            courseName: "CMPT120",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 2,
            checked: false,
            courseName: "CMPT130",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 3,
            checked: false,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 4,
            checked: false,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        }
    ]);

    const handleCourse = (course) => {
        const CourseList = Courses.filter((c) => {
            return c.courseName === course.courseName && c.semester === course.semester && c.year === course.year;
        })
        if (!CourseList) {
            const courselist = [...Courses, course];
            setCourses(courselist);
        }
    }

    const addCourse = (event) => {
        event.preventDefault();
        const id = Courses.length + 1;
        const newCourse = {
            id: id,
            checked: false,
            courseName: event.target.courseName.value,
            semester: event.target.semester.value,
            year: event.target.year.value
        };
        handleCourse(newCourse);   
    }

    return (
        <>
            <main style = {homepagestyle}>
                <Head />
                
                <form className={`text-center`}>
                <select name = "semester" className= "m-2">
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value = "Summer">Summer</option>
                </select>
                    <input type="text" name = "courseName" placeholder='Course Name' className='px-4 py-1  me-2 mt-4 rounded-2'></input>
                    <input type="number" name = "year" placeholder='Year' className='px-4 py-1  me-3 mt-4 rounded-2'></input>
                    <Button className='mb-1' onClick = {addCourse} >Add</Button>
                </form>
                {/* <form className={`text-center`}>
                    <input type="text" placeholder='search courses' className='px-4 py-1  me-3 mt-4 rounded-2'></input>
                    <Button className='mb-1'>Search</Button>
                </form> */}
                {(Courses.length) ? (<div className="border border-secondary border-3 text-center display-6 rounded-3 mx-5 mt-3" >
                    
                    <ul className= {`text-white`} 
                    style = {{listStyleType: 'none',maxHeight: '400px',overflowY: 'auto'}}>
                    {Courses.map((course) => (
                        <li className="course" key={course.id} >
                            <input type="checkbox" checked={course.checked} className = "me-3"/>
                            <label onMouseOver={(event) => {
                                event.target.style.backgroundColor = 'grey';
                            }} onMouseOut={(event) => {
                                event.target.style.backgroundColor = '';
                            }}>{course.courseName}, {course.semester}, {course.year}</label>
                            <FaTrashAlt role="button" tabIndex="0" className = "ms-3"/>
                        </li>
                    ))}

                    </ul>
                </div>) : <p>Your lists are empty</p>}

            </main>

            <footer className={`bg-black text-white display-6 text-center`}>
                <div className={`bg-secondary container-fluid pb-4 bg-opacity-25`}>
                   <p>Insert {Courses.length} items</p>
                </div>
            </footer> 
        </>
    );
}

export default Teacher_input;