import axios from 'axios';

const deleteTeaches = (teaches, courseId, header,fetchTeaches) => {
    if (teaches.courses.length <= 1) {
        axios.delete(`http://localhost:8080/api/teaches/delete/${teaches.teachesId}`,header)
            .then(fetchTeaches())
            .catch(error => console.log(error))
            
    } else {
        fetch(`http://localhost:8080/api/teaches/patch/delete/${teaches.teachesId}/${courseId}`, {
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