import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Head from './header.js';
import { useState,useEffect} from 'react';
import { Button, Row } from 'react-bootstrap';
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
            checked: true,
            courseName: "CMPT120",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 2,
            checked: true,
            courseName: "CMPT130",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 3,
            checked: true,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 4,
            checked: true,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        }
    ]);

    return (
        <>
            <main style = {homepagestyle}>
                <Head />
                
                <form className={`text-center`}>
                    <input type="text" placeholder='course name' className='px-4 py-1  me-3 mt-4 rounded-2'></input>
                    <Button className='mb-1'>Add</Button>
                </form>
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
                </div>) : <p>No course</p>}

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