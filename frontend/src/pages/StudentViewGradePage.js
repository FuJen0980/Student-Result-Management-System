import React from 'react';
import { jsPDF } from "jspdf";
import { usePDF } from 'react-to-pdf';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import {Button,Row} from 'react-bootstrap';
import StudentHeader from '../components/StudentHeader.js';
import axios from 'axios';

const StudentViewGradePage = () => {
    const pagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    }

    const [Taken, setTaken] = useState([]);
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [GPA, setGPA] = useState(null);

    const getUser = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const u = JSON.parse(userData);
            setUser(u);
        }
    };

    const fetchTaken = () => {
        axios.get(`http://localhost:8080/api/user/role/${user}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then((response) => {
            
                setUserID(response.data?.uid);
                const takenList = response.data?.takenList;
                takenList?.sort((a, b) => {
                    if (a.taken_year !== b.taken_year) {
                        return a.taken_year - b.taken_year;
                    }
                    return a.semester - b.semester;
                })

                setTaken(takenList)
                // console.log(Taken)
                
            })
            .catch(error => console.log(error));
    }

    const AverageGPA = () => {
        let totalGPA = 0;
        for (const taken of Taken) {
            switch (taken.grade) {
                case 'A+':
                    totalGPA += 4.3;
                    break;
                case 'A':
                    totalGPA += 4.0;
                    break;
                case 'A-':
                    totalGPA += 3.7;
                    break;
                case 'B+':
                    totalGPA += 3.3;
                    break;
                case 'B':
                    totalGPA += 3.0;
                    break;
                case 'B-':
                    totalGPA += 2.7;
                    break;
                case 'C+':
                    totalGPA += 2.3;
                    break;
                case 'C':
                    totalGPA += 2.0;
                    break;
                case 'C-':
                    totalGPA += 1.7;
                    break;
                case 'D':
                    totalGPA += 1.0;
                    break;
                case 'F':
                    totalGPA += 0.0;
                    break;
                default:
                    break;
            
            }
            setGPA(totalGPA / Taken.length);
        }
    }

    useEffect(() => {
        getUser();
        fetchTaken();
        AverageGPA();
    }, [])
        
    const info = {
        semester: null,
        taken_year: null
    }

    const generatePDF = () => { 
        const doc = new jsPDF();
        const content = document.getElementById('result');
        doc.text(content, 10, 10);
        doc.save(`${user}transcript.pdf`);
    }

        return (
            <>
                <main style={pagestyle}>
                    <StudentHeader />
                    <div id="result">
                        <h>{user} Grade result</h>
                        {Taken.map((taken, index) => {
                            if (taken.semester !== info.semester && taken.taken_year !== info.taken_year) {
                                info.semester = taken.semester;
                                info.taken_year = taken.taken_year;

                                return (
                                    <div key={index}>
                                        <h>{info.semester} {info.taken_year}</h>
                                        <div>
                                            <span>{taken.course.courseName}</span>
                                            <span>{taken.letterGrade}</span>
                                        </div>
                                    </div>
                                );

                            } else {
                                return (
                                    <div key={index}>
                                        <span>{taken.course.courseName}</span>
                                        <span>{taken.letterGrade}</span>
                                    </div>
                                );
                            }
                        })}
                        <div>
                            <p>GPA : {GPA}</p>
                        </div> 
                    </div>

                    <Button className={`btn-primary`} size='lg' onclick={generatePDF}>Download Transcript</Button>
                    
                </main>
            </>
        
        );
}
    
export default StudentViewGradePage; 