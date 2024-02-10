

const HandleDeleteTaken = async (taken_Id, fetchTaken, userID) => {
    const API_URL = process.env.REACT_APP_API_URL;
    await fetch(`${API_URL}/user/put/student/${userID}/${taken_Id}`, {
        method : "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(fetchTaken())
    .catch(error => console.log(error))

}

export { HandleDeleteTaken };