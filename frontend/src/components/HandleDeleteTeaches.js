import axios from 'axios';

const deleteTeaches = (teaches, courseId, header,fetchTeaches) => {
    const API_URL = process.env.REACT_APP_API_URL;
    if (teaches.courses.length <= 1) {
        axios.delete(`${API_URL}/teaches/delete/${teaches.teachesId}`,header)
            .then(fetchTeaches())
            .catch(error => console.log(error))
            
    } else {
        fetch(`${API_URL}/teaches/patch/delete/${teaches.teachesId}/${courseId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(fetchTeaches())
            .catch(error => console.log(error))

    }
}

export { deleteTeaches };