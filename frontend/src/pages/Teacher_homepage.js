import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Row} from 'react-bootstrap';
import Head from './header.js';

const Teacher_home = () => {
    const homepagestyle = {
        backgroundImage: "url(" + "https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px'
    }
    const user = "gkfslsdjf;dfja;";
    
    return (
        
        <>
            <main style = {homepagestyle}>
                <Head/>
                <div className ={`text-center pt-5 pb-3`}>
                    <p><h className={`text-white display-3`}><strong>HELLO & WELCOME</strong></h></p>
                    <p><h className={`text-white display-3`}><strong>{user.toUpperCase()}</strong></h></p>
                </div>
                <Row className='offset-4  col-4 justify-content-end'>
                    <div className={`d-grid gap-2 pb-4`}>
                        <Button className={`btn-primary pd`} size='lg' href='/teacher_input'>Input</Button>
                     </div>
                    <div className={`d-grid gap-2`}>
                    <Button className = {`btn-primary`} size = 'lg' href = '/teacher_curve'>Grade</Button>
                    </div>
                </Row>

            </main>
            

        </>
    );
}

export default Teacher_home;