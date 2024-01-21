import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Row} from 'react-bootstrap';
import TeacherHeader from '../components/TeacherHeader.js';
import { useNavigate } from 'react-router-dom';
import UserContext from './user-context.js';
import { useContext } from 'react';

const Teacher_home = () => {
    const homepagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px'
    }
    // const user = "gkfslsdjf;dfja;";
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const handleLogout = () => {
      // Remove JWT token from local storage
        localStorage.removeItem("token");
        setUser(null);
      // Redirect to the login page
      navigate('/');
    };

    return (
        
        <>
            <main style = {homepagestyle}>
                <TeacherHeader/>
                <div className ={`text-center pt-5 pb-3`}>
                    <p><h className={`text-white display-3`}><strong>HELLO & WELCOME</strong></h></p>
                    <p><h className={`text-white display-3`}><strong>{user.toUpperCase()}</strong></h></p>
                </div>
                <Row className='offset-4  col-4 justify-content-end'>
                    <div className={`d-grid gap-2 pb-2`}>
                        <Button className={`btn-primary pd`} size='lg' href='/teacher/input'>Input</Button>
                     </div>
                    <div className={`d-grid gap-2 pb-2`}>
                    <Button className = {`btn-primary`} size = 'lg' href = '/teacher/curve'>Grade</Button>
                    </div>
                    <div className={`d-grid gap-2`}>
                    <Button className = {`btn-primary`} size = 'lg' onClick={handleLogout}>Log Out</Button>
                    </div>
                </Row>

            </main>
            

        </>
    );
}

export default Teacher_home;