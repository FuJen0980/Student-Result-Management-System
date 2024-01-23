import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TeacherHeader from '../components/TeacherHeader.js';
import { useState,useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import UserContext from './user-context.js';
import { useContext } from 'react';
import axios from 'axios';

const Teacher_input = () => {
    const homepagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '610px'
    }

    const [user, setUser] = useContext(UserContext);
    const [Teaches, setTeaches] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [userID, setUserID] = useState(null);
    //get token
    const token = localStorage.getItem('token');
    const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Methods': 'POST, PATCH, OPTIONS',
        },
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
            const teaches = response.data?.teachesList;
            teaches?.sort((a, b) => {
                if (a.year !== b.year) {
                    return b.teach_year - a.teach_tear;
                }
                return b.semester - a.semester;
            })
            setTeaches(teaches);
            console.log(teaches);
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

    const showAlert = (alertElem, word) => {
        alertElem.innerHTML = `${word} not exit —check it out!`;
        alertElem.style.display = 'block';
    }

    // const addCourseToTeachesAndUser = async (userID, teachesId, courseId,teaches) => {
    //     await axios.patch(`http://localhost:8080/api/teaches/${teachesId}/${courseId}`,header)
    //         .catch(error => console.log(`Error: ${error}`))

    //     await axios.patch(`http://localhost:8080/api/user/patch/teacher/${userID}/${teachesId}`,header) ///////
    //         .catch(error => console.log(`Error: ${error}`))
        
    //     fetchTeaches();
    // }

    const handleTeaches = (teaches, courseName) => {
    
        const alertElem = document.getElementById("alert");
        if (!Courses.some(course => course.courseName === courseName)) {
            showAlert(alertElem, "Course");
            return;
        }

        if (teaches.year < 999) {
            showAlert(alertElem,"Year");
            return;
        }

        const courseId = Courses.find(c => c.courseName === courseName)?.course_id;
        const checkTeaches = Teaches.find(teach => teach.semester === teaches.semester && teach.teachYear === teaches.teachYear) || null;
        

        if (checkTeaches != null){
            const checkCourse = checkTeaches.courses.some(a => a.courseName === courseName);

            //allmatch
            if (checkCourse) return;

            //course not exit, add couse to teaches and user

            axios.patch(`http://localhost:8080/api/teaches/${checkTeaches.teachesId}/${courseId}`,header)
                .catch(error => console.log(`Error: ${error}`))
            
        } else {
            //add teach+couse, add teach to user 
            axios.post('http://localhost:8080/api/teaches',teaches,header) 
                .catch(error => console.log(`Error: ${error}`))
            
            let teachID = null;    
            axios.get('http://localhost:8080/api/teaches', header)
            .then(response => {
                const teachesList = response.data;
                console.log("test")
                console.log(teachesList)
                console.log(teachesList[0].courses.length)
                teachID = teachesList.find(a => a.courses.length === 0 && a.semester === teaches.semester && a.teachYear === teaches.teachYear).teachesId || null;
    
            }).catch(error => console.log(error))
            console.log("test2")
            console.log(teachID);
            // addCourseToTeachesAndUser(userID,teachID, courseId, teaches)
            axios.patch(`http://localhost:8080/api/teaches/${teachID}/${courseId}`,header)
            .catch(error => console.log(`Error: ${error}`))

            axios.patch(`http://localhost:8080/api/user/patch/teacher/${userID}/${teachID}`,header) ///////
                .catch(error => console.log(`Error: ${error}`))
            
            fetchTeaches();
        }
    }

    const addTeaches = (event) => {

        event.preventDefault();
        document.getElementById("alert").style.display = "none";

        const { semester, year } = event.target;
        const courseName = event.target.courseName.value;
        const newCourse = {
            semester: semester.value,
            teachYear : +year.value,
        }
        handleTeaches(newCourse, courseName);
        
    }
   
    const deleteTeaches = async (id) => {
        //delete 
        try {
            await axios.delete(`http://localhost:8080/api/teaches/${id}`);
            fetchTeaches();
            
        } catch (error) {
            console.log(`Error: ${error}`);
        } 
    }

    return (
        <>
            <main style = {homepagestyle}>
                <TeacherHeader />
                
                <form className={`text-center`} onSubmit ={addTeaches} id = "teacherInput">
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
                                    <FaTrashAlt role="button" tabIndex="0" className="ms-3" onClick={()=>deleteTeaches(course.id)}/>
                                </li>
                                 
                            ))
                        ))}

                    </ul>
                </div>) : <p className = "text-white text-center pt-5">Your lists are empty</p>}

            </main>

            <footer className={`bg-black text-white display-6 text-center`}>
                <div className={`bg-secondary container-fluid pb-4 bg-opacity-25`}>
                   <p>Insert {Teaches.length} items</p>
                </div>
            </footer> 
        </>
    );
}

export default Teacher_input;