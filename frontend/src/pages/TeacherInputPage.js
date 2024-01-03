import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TeacherHeader from '../components/TeacherHeader.js';
import { useState,useEffect} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';

const Teacher_input = () => {
    const homepagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '610px'
    }

    const [Courses, setCourses] = useState([
        {
            id: 1,
            courseName: "CMPT120",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 2,
            courseName: "CMPT130",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 3,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        },
        {
            id: 4,
            courseName: "CMPT125",
            semester: "Fall",
            year:2022
            
        }
    ]);

    useEffect(() => {

        setCourses((prevCourses) => {
            const CoursesList = [...prevCourses];
            CoursesList.sort((a, b) => {
                if (a.year !== b.year)
                    return b.year - a.year;
                
                return b.semester - a.semester;
            });
            return CoursesList;
        })

    }, [Courses])
    
    const showAlert = (alertElem, word) => {
        alertElem.innerHTML = `${word} not exit —check it out!`;
        alertElem.style.display = 'block';
    }

    const handleCourse = (course) => {

        const alertElem = document.getElementById("alert");

        if (!Courses.some((a) => {
            return a.courseName === course.courseName;
        })) {
            showAlert(alertElem,"Course");

            return;
        }
        if (course.year < 999) {
            showAlert(alertElem,"Year");
            return;
        }

        const checkExit = Courses.some((c) => {
            return c.courseName === course.courseName && c.semester === course.semester && c.year === course.year;
        })
        if (!checkExit) {
            const courseList = [...Courses, course];
            setCourses(courseList);
 
        }
    }

    const addCourse = (event) => {
        event.preventDefault();
        document.getElementById("alert").style.display = "none";
        const id = Courses.length + 1;
        const { courseName, semester, year } = event.target;
        const newCourse = {
            id, checked: false,
            courseName: courseName.value,
            semester: semester.value,
            year: year.value,
        }
        handleCourse(newCourse);
        document.getElementById("teacherInput").reset();
        console.log(Courses);
    };

    const deleteCourse = (id) => {
        const courseList = Courses.filter((course) => {
            return course.id !== id;
        })
        setCourses(courseList);
    }


    const [options] = useState([
        'CMPT120',
        'CMPT125',
        'CMPT225',
        'CMPT272',
        'CMPT295',
        'CMPT276',
        'CMPT300',
        'CMPT354',
        'CMPT353',
        'MATH150',
        'MATH151',
        'MATH152',
        'MATH232',
        'MATH240',
        'MACM101',
        'MACM201',
        'MACM316',
    ])

    return (
        <>
            <main style = {homepagestyle}>
                <TeacherHeader />
                
                <form className={`text-center`} onSubmit ={addCourse} id = "teacherInput">
                <select name = "semester" className= "m-2">
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value = "Summer">Summer</option>
                 </select>
                <input placeholder = "course name" list = "courseList" name = "courseName" className='px-4 py-1  me-2 mt-4 rounded-2'></input> 
                <datalist id = "courseList" placeholder='Course Name'>
                    {options.map((option,index) => (
                        <option key={index} value={option}></option>
                    ))}
                </datalist>
                    <input type="number" name = "year" placeholder='Year' className='px-4 py-1  me-3 mt-4 rounded-2'></input>
                    <input type = "submit" value = "add" className='btn btn-primary md-1'></input>
                </form>
                <Alert id = "alert" variant='danger' style = {{display:'none'}}>Courses not exit —check it out!</Alert>

                {(Courses.length) ? (<div className="border border-secondary border-3 text-center display-6 rounded-3 mx-5 mt-3" >
                    
                    <ul className= {`text-white`} 
                    style = {{listStyleType: 'none',maxHeight: '400px',overflowY: 'auto'}}>
                    {Courses.map((course) => (
                        <li className="course" key={course.id} >
                            {/* <input type="checkbox" checked={course.checked} className = "me-3"/> */}
                            <label onMouseOver={(event) => {
                                event.target.style.backgroundColor = 'grey';
                            }} onMouseOut={(event) => {
                                event.target.style.backgroundColor = '';
                            }}>{course.courseName}, {course.semester}, {course.year}</label>
                            <FaTrashAlt role="button" tabIndex="0" className="ms-3" onClick={()=>deleteCourse(course.id)}/>
                        </li>
                    ))}

                    </ul>
                </div>) : <p className = "text-white text-center pt-5">Your lists are empty</p>}

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