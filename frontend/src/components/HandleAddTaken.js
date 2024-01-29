import axios from 'axios';

const HandleAddTaken = async (taken, courseName, userID, header, fetchTaken, Courses, LetterGrade,Taken) => {

    
    const showAlert = (alertElem, word) => {
        alertElem.innerHTML = `${word} not exit —check it out!`;
        alertElem.style.display = 'block';
    };

    const alertElem = document.getElementById("alert");
    if (!Courses.some(course => course.courseName === courseName)) {
        showAlert(alertElem, "Course");
        return;
    }

    if (taken.taken_year < "999") {
        showAlert(alertElem, "Year");
        return;
    }
    // console.log(LetterGrade);
    if (!LetterGrade.some(letter => letter === taken.letterGrade)) {
        showAlert(alertElem, "Letter grade");
        return;
    }
    
   
    if(Taken.some(student => student.semester === taken.semester && student.taken_year === taken.taken_year
        && student.course === taken.course)) {
            showAlert(alertElem, "Duplicate exit");
    }
    
    //handle input box
    const form = document.getElementById("studentInput").reset();
    const courseId = Courses.find(c => c.courseName === courseName)?.course_id;

    console.log(taken)

    axios.post(`http://localhost:8080/api/taken/post/${courseId}/${userID}`,taken,header)
        .then(fetchTaken())
        .catch(error => console.log(error))
        
}

export { HandleAddTaken }

