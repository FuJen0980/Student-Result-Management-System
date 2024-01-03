import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TeacherHeader from '../components/TeacherHeader.js';

const Teacher_curve = () => {
    const homepagestyle = {
        backgroundImage: 'url("https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px'
    }
    return (
        <>
            <main style = {homepagestyle}>
                <TeacherHeader/>
            </main>
        </>
    );
}

export default Teacher_curve;