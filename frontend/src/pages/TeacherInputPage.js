import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TeacherHeader from '../components/TeacherHeader.js';
import { useState,useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import UserContext from './user-context.js';
import { useContext } from 'react';
import { addTeaches } from '../components/HandleAddTeaches';
import { deleteTeaches } from '../components/HandleDeleteTeaches.js';
import axios from 'axios';

const Teacher_input = () => {
    const homepagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '90vh'
    }

    const [user, setUser] = useContext(UserContext);
    const [Teaches, setTeaches] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [userID, setUserID] = useState(null);
    const [CourseNum, setCourseNum] = useState(0);
    //get token
    const token = localStorage.getItem('token');
    const header = {
        headers: {
          Authorization: `Bearer ${token}`}
    };
    
    const getUser = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const u = JSON.parse(userData);
            setUser(u);
        }
    };


    const fetchTeaches = () => {

        axios.get(`http://localhost:8080/api/user/role/${user}`, header)
        .then((response) => {
    
            setUserID(response.data?.uid);
            const teachesList = response.data?.teachesList;
            teachesList?.sort((a, b) => {
                if (a.teachYear !== b.teachYear) {
                    return b.teachYear - a.teachYear;
                }
                return b.semester - a.semester;
            })
            let courseNum = 0;
            for (const teaches of teachesList) {
                courseNum += teaches.courses.length;   
            }

            setCourseNum(courseNum);
            setTeaches(teachesList);
            
        })
        .catch(error => console.log(error));  
    }

    const fetchCourses = () => {
        axios.get("http://localhost:8080/api/courses",header)
            .then(response => {
                // console.log(response.data)
                setCourses(response.data)
            })
            .catch(error => console.log("fail to get courses"));
    }

    useEffect(() => {
        getUser();
        fetchTeaches();
        fetchCourses();
    }, [])

    return (
        <>
            <main style = {homepagestyle}>
                <TeacherHeader />
                
                <form className={`text-center`} onSubmit ={(event) => addTeaches(event, userID, Courses, Teaches, fetchTeaches,header)} id = "teacherInput">
                <select name = "semester" className= "m-2">
                        <option value="fall">Fall</option>
                        <option value="spring">Spring</option>
                        <option value = "summer">Summer</option>
                 </select>
                <input placeholder = "course name" autocomplete="off" list = "courseList" name = "courseName" className='px-4 py-1  me-2 mt-4 rounded-2'></input> 
                <datalist id="courseList" placeholder="Course Name">
                {Courses.map((course) => (
                    <option key={course.course_id} value={course.courseName}>
                    {course.courseName}
                    </option>
                ))}
                </datalist>
                    <input type="number" name = "year" placeholder='Year' className='px-4 py-1  me-3 mt-4 rounded-2'></input>
                    <input type = "submit" value = "add" className='btn btn-primary md-1'></input>
                </form>
                <Alert id = "alert" variant='danger' style = {{display:'none'}}>Courses not exit —check it out!</Alert>

                {(Teaches.length) ? (<div className="border border-secondary border-3 text-center display-6 rounded-3 mx-5 mt-3" >
                    
                    <ul className= {`text-white`} 
                    style = {{listStyleType: 'none',maxHeight: '400px',overflowY: 'auto'}}>
                        {Teaches.map((teaches) => (
                            teaches.courses.map((course) => (
                                
                                <li className="course">
                                    <label onMouseOver={(event) => {
                                        event.target.style.backgroundColor = 'grey';
                                    }} onMouseOut={(event) => {
                                        event.target.style.backgroundColor = '';
                                    }}>{course.courseName}, {teaches.semester}, {teaches.teachYear}</label>
                                    <FaTrashAlt role="button" tabIndex="0" className="ms-3" onClick={()=>deleteTeaches(teaches, course.course_id, header,fetchTeaches)}/>
                                </li>
                                 
                            ))
                        ))}

                    </ul>
                </div>) : <p className="text-white text-center pt-5">Your lists are empty</p>}
        

            </main>
            <footer className={`bg-black text-white display-6 text-center`} style = {{minHeight: '10vh'}}>
                <div className={`bg-secondary container-fluid p-4 bg-opacity-25`}>
                   <p>Insert {CourseNum} items</p>
                </div>
            </footer> 


        </>
    );
}

export default Teacher_input;