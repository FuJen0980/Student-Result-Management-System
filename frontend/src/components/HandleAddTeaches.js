import axios from 'axios';

const handleAddTeaches = async (teaches, courseName, Courses, Teaches, fetchTeaches, userID,header) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const showAlert = (alertElem, word) => {
        alertElem.innerHTML = `${word} not exit —check it out!`;
        alertElem.style.display = 'block';
    };
    const alertElem = document.getElementById("alert");
    if (!Courses.some(course => course.courseName === courseName)) {
        showAlert(alertElem, "Course");
        return;
    }

    if (teaches.year < "999") {
        showAlert(alertElem,"Year");
        return;
    }

    //handle input box
    const form = document.getElementById("teacherInput").reset();
    
    const courseId = Courses.find(c => c.courseName === courseName)?.course_id;
    const checkTeaches = Teaches.find(teach => teach.semester === teaches.semester && teach.teachYear === teaches.teachYear) || null;

    if (checkTeaches != null){
        const checkCourse = checkTeaches.courses.some(a => a.courseName === courseName);
        //allmatch
        if (checkCourse) return;
        //course not exit, add couse to teaches and user
        fetch(`${API_URL}/teaches/patch/add/${checkTeaches.teachesId}/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
        })
            .then(response => {

                fetchTeaches(); 
            })
            .catch(error => console.log(`Error: ${error}`))
        
    } else {
        //add teach+couse, add teach to user 
        axios.post('${API_URL}/teaches',teaches,header) 
            .catch(error => console.log(`Error: ${error}`))
        
        let teachesId = null;    
        axios.get('${API_URL}/teaches', header)
        .then(response => {
            const teachesList = response.data;
            teachesId = teachesList.find(a => a.courses.length === 0 && a.semester === teaches.semester && a.teachYear === teaches.teachYear).teachesId || null;

            fetch(`${API_URL}/teaches/patch/add/${teachesId}/${courseId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .catch(error => console.log(`Error: ${error}`))
        
            fetch(`${API_URL}/user/patch/teacher/add/${userID}/${teachesId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then((response) => {
                    fetchTeaches();
                    console.log(response);
                })
            .catch(error => console.log(`Error: ${error}`))
            

        }).catch(error => console.log(error))
     
    }
}

const addTeaches = async (event, userID, Courses, Teaches, fetchTeaches, header) => {
    event.preventDefault();
    document.getElementById("alert").style.display = "none";
    const { semester, year } = event.target;
    const courseName = event.target.courseName.value;
    const newTeaches = {
        semester: semester.value,
        teachYear: +year.value,
    }
    
    handleAddTeaches(newTeaches, courseName, Courses, Teaches, fetchTeaches, userID, header)

}

export{handleAddTeaches, addTeaches}