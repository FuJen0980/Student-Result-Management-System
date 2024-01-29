import axios from 'axios';

const HandleDeleteTaken = async (taken_Id, fetchTaken, userID) => {

    await fetch(`http://localhost:8080/api/user/put/student/${userID}/${taken_Id}`, {
        method : "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(fetchTaken())
    .catch(error => console.log(error))

}

export { HandleDeleteTaken };