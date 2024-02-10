import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PageStyle2 from '../components/PageStyle2.js';
import TeacherHeader from '../components/TeacherHeader.js';
import LoadingScreen from '../components/LoadingScreen.js';
import { useState, useEffect } from 'react';

const Teacher_curve = () => {
    
    const [Loading, setLoading] = useState(true);
    const [File, setFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    if (Loading) {
        return <LoadingScreen />;
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            const lines = fileContent.split('\n');
            
            const data = lines.map(line => {
                const v = line.split(',');
                v[1] = parseInt(v[1], 10);
                return v;

            });

            console.log(data);
            setFileContent(data);
        };

        reader.readAsText(file, 'utf-8');
    };


    //再去database里头取和存太麻烦了，就直接file取进去然后就和272一样了
    //太麻烦了，这个page也可以直接删掉

    return (
        <>
            <main style = {PageStyle2} className = 'text-light'>
                <TeacherHeader />

                <div>
                    <input type="file" onChange={handleFile} />
                </div>


                
                
            </main>
        </>
    );
}


export default Teacher_curve;