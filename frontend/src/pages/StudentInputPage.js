import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';
import UserContext from './user-context.js';
import { useContext } from 'react';
import { pagestyle } from '../components/PageStyle.js';
import { HandleAddTaken } from '../components/HandleAddTaken.js';
import { HandleDeleteTaken } from '../components/HandleDeleteTaken.js';
import StudentHeader from '../components/StudentHeader.js';
import LoadingScreen from '../components/LoadingScreen.js';
import AverageGPA from '../components/AverageGPA.js';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Student_input = () => {
    const [LetterGrade] = useState(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']);
    const [user, setUser] = useContext(UserContext);
    const [userID, setUserID] = useState(null);
    const [Taken, setTaken] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [GPA, setGPA] = useState(0);

    const header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`}
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
                if (a.taken_year !== b.taken_year) {
                    return a.taken_year - b.taken_year;
                }
                return a.semester - b.semester;
            })
                
                setTaken(takenList);
                setGPA(AverageGPA(takenList));

                
        })
        .catch(error => console.log(error));  
    }

    const fetchCourses = () => {
        axios.get("http://localhost:8080/api/courses",header)
            .then(response => {
                setCourses(response.data)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getUser();
        fetchTaken();
        fetchCourses();

        setTimeout(() => {
            setLoading(false);
        }, 2000);

    }, [])

    if (Loading) {
        return <LoadingScreen />;
    }

    const addTaken = async (event) => {
        event.preventDefault();
        document.getElementById("alert").style.display = "none";
        const { semester, year, letterGrade} = event.target;
        const courseName = event.target.courseName.value;
        const newTeaches = {
            semester: semester.value,
            taken_year: +year.value,
            letterGrade: letterGrade.value,
        }
        HandleAddTaken(newTeaches, courseName, userID, header, fetchTaken, Courses, LetterGrade, Taken);
        
    }

    return (
        <>
            <main style={pagestyle}>
            <StudentHeader />
                
            <form className={`text-center`} onSubmit ={(event) => {addTaken(event)}} id = "studentInput">
            <select name = "semester" className= "m-2">
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                    <option value = "summer">Summer</option>
             </select>
                <input placeholder="course name" autoComplete="off" list="courseList" name="courseName" className='px-4 py-1  me-2 mt-4 rounded-2'></input>
                <input placeholder="Grade" autoComplete="off" list="letterList" name="letterGrade" className='px-4 py-1  me-2 mt-4 rounded-2'></input>
        
                <datalist id="letterList" placeholder="Letter Grade">
                {LetterGrade.map((letter,index) => (
                    <option key={index} value={letter}>
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
                <div className='mx-5 text-center mt-3'>
                        <table className ="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Semester</th>
                                <th scope="col">Year</th>
                                <th scope="col">Letter Grade</th>
                                <th scope="col"></th>
                                </tr>
                        </thead>
                        <tbody>
                            {(Taken.length) ? (
                            
                                Taken.map((taken) => (
                                    <tr acope="row">
                                        <td>{taken.course.courseName}</td>
                                        <td>{taken.semester }</td>
                                        <td>{taken.taken_year}</td>
                                        <td>{taken.letterGrade}</td>
                                        
                                        <td><FaTrashAlt role="button" tabIndex="0" className="ms-3" onClick={()=>HandleDeleteTaken(taken.takenId,fetchTaken,userID)}/></td>
                                    </tr>  
                                ))

                            ) : (
                            <tr>
                                <td colSpan="5" className='text-center'>Table is empty</td>
                            </tr>

                            )}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-right'>GPA: {GPA}</td>
                            </tr>
                         </tbody>    
                        
                    </table>

                    {(Taken.length > 0) ? (<Button className={`btn-primary `} size='lg' href='/student/viewgrade'>View Transcript</Button>) : (<p></p>)}
 
                    
                </div>
                
        </main>
         <footer className={`bg-black text-white display-6 text-center`} style = {{minHeight: '10vh'}}>
              <div className={`bg-secondary container-fluid p-4 bg-opacity-25`}>
                   <p>Insert {Taken.length} items</p>
            </div>
        </footer> 
        

     </>
        
        

    );

}
    
                        


export default Student_input;