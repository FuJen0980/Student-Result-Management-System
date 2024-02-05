import React from 'react';
import { jsPDF } from "jspdf";
import LoadingScreen from '../components/LoadingScreen.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import {Button,Row} from 'react-bootstrap';
import StudentHeader from '../components/StudentHeader.js';
import AverageGPA from '../components/AverageGPA.js';
import PageStyle2 from '../components/PageStyle2.js';
import axios from 'axios';

const StudentViewGradePage = () => {

    const [Taken, setTaken] = useState([]);
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [GPA, setGPA] = useState(0);
    const [Loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    const getUser = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const u = JSON.parse(userData);
            setUser(u);
        }
    };

    const header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`}
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
                console.log("test");
                console.log(takenList);
        })
        .catch(error => console.log(error));  
    }

    useEffect(() => {
        getUser();
        fetchTaken();
        setTimeout(() => {
            setLoading(false);
        }, 2000);

    }, [])

    if (Loading) {
        return <LoadingScreen />;
    }

    const info = {
        semester: null,
        taken_year: null
    }
    const generatePDF = () => { 
        const doc = new jsPDF();
        const content = document.getElementById('result').innerText;
        doc.text(content, 10, 10);
        doc.save(`${user}'s_transcript.pdf`);
    }

        return (
            <>
                <main style={PageStyle2} className = 'text-center' >
                    <StudentHeader />
                    <div id="result" className='text-light text-center py-4'>
                        <h1> {user}'s Transcript</h1>
                        <p>Date: {date.toDateString()}</p>
                        {Taken && Taken.length > 0 ? (Taken.map((taken, index) => {

                            if (taken.semester !== info.semester || taken.taken_year !== info.taken_year) {
                                info.semester = taken.semester;
                                info.taken_year = taken.taken_year;
                            
                                return (
                                    <div key={`${info.semester}-${info.taken_year}`}>
                                        
                                        <div class="container">
                                            <h4 className = 'col-12'>{info.semester} {info.taken_year}</h4>
                                            <div className = 'col-12'>--------------------------------------------------------</div>
                                            <div className="row">
                                                <div className="col-12">
                                                Course
                                                </div>
                                                <div className="col">
                                                Grade
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                {taken.course.courseName}
                                                </div>
                                                <div className="col">
                                                {taken.letterGrade}
                                                </div>
                                         </div>
                                        </div>                                        
                                    </div>
                                );
                            } else {
                                return (
                                    <div class="container">
                                        <div className="row">
                                                <div className="col">
                                                {taken.course.courseName}
                                                </div>
                                                <div className="col">
                                                {taken.letterGrade}
                                                </div>
                                        </div>
                                    </div>

                                );
                            }
                        })
                        ) : <p>Loading....</p>}

                        <div>
                            <p>GPA : {GPA}</p>
                        </div>      
                        
                    </div>
                    
                    <Button className={`btn-primary my-4`} size='lg' onClick={generatePDF}>Download Transcript</Button>
                    
                </main>
            </>
        
        );
}
    
export default StudentViewGradePage; 