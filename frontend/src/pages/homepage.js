import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Body = () => {
    const homepagestyle = {
        backgroundImage: "url(" + "https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px'
    }
    const [login, setlogin] = useState(false);
    //fasle - teacherhomepage, true - studenthomepage
    const [InnerHome, setInnerHome] = useState(null);


    if (login && !InnerHome) {
            return <Navigate to="/teacher_home" />;
    }
    if (login && !InnerHome) {
        return <Navigate to="/student_home" />;
    }


    return (
        <>
        <main style = {homepagestyle}>
            <Row className = {`pt-5`}>
                <h1 className = {`text-white  text-center`}>Student Result Management System</h1>

            </Row>
            
            <Row className='pt-5 offset-4 col-4'>
              <div className='border border-primary rounded pt-1 pd-2'>
                <Form>
                    <fieldset>
                        <legend><strong className='text-white'>Login</strong></legend>

                                <p><select className={`form-control`} onChange={(event) => {
                                    const e = event.target.value === "Student";
                                    setInnerHome(e);
                                }}>
                                <option defaultValue = "default">Identity</option>
                                <option value= "Administraion">Administraion</option>
                                <option value = "Student">Student</option>
                            </select></p>

                        <p><input type="text" placeholder='Name' className = {`form-control`}></input></p>
                        <p><input type="text" placeholder='Password'className = {`form-control`}></input></p>

                        <div className={`d-grid gap-2`}>
                                    <Button href="#" className={`btn-primary pr-5`} onClick={() => {
                                        setlogin(true); 
                                    }}>Login</Button>      
                        </div><br></br>

                        
                    </fieldset>
                    
                </Form>
                </div>
                </Row>
            
        </main>
        
        </>  
    );
    
}
export default Body;