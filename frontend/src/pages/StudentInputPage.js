import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import UserContext from './user-context.js';
import { useContext } from 'react';
import { pagestyle } from '../components/PageStyle.js';
import axios from 'axios';

const Student_input = () => {
    const [LetterGrade] = useState(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']);
    const [user, setUser] = useContext(UserContext);
    const [userID, setUserID] = useState(null);
    const [Taken, setTaken] = useState([]);
    const [Courses, setCourses] = useState([]);

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

    const fetchTaken = () => {
        axios.get(`http://localhost:8080/api/user/role/${user}`, header)
        .then((response) => {
    
            setUserID(response.data?.uid);
            const takenList = response.data?.takenList;
            takenList?.sort((a, b) => {
                if (a.taken_Year !== b.taken_Year) {
                    return b.taken_Year - a.taken_Year;
                }
                return b.semester - a.semester;
            })

            setTaken(takenList)
        })
        .catch(error => console.log(error));  
    }

    const fetchCourses = () => {
        axios.get("http://localhost:8080/api/courses",header)
            .then(response => {
                // console.log(response.data)
                setCourses(response.data)
            })
            .catch(error => console.log(error));
    }
    

    useEffect(() => {
        getUser();
        fetchTaken();
        fetchCourses();

    }, [])

    return (
        <>
        <main style = {pagestyle}>
            {/* <TeacherHeader /> */}
                
            <form className={`text-center`} onSubmit ={(event) => {}} id = "teacherInput">
            <select name = "semester" className= "m-2">
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                    <option value = "summer">Summer</option>
             </select>
                <input placeholder="course name" autocomplete="off" list="courseList" name="courseName" className='px-4 py-1  me-2 mt-4 rounded-2'></input>
                    
            <datalist id="letterList" placeholder="Letter Grade">
            {LetterGrade.map((letter) => (
                <option value={letter}>
                {letter}
                </option>
            ))}
            </datalist>
                    
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
                
                <Alert id="alert" variant='danger' style={{ display: 'none' }}>Courses not exit —check it out!</Alert>
                
        </main>

     </>
        
        

    );
    
}


export default Student_input;