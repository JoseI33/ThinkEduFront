import instance from "../../api/axios"
export const getUserData = () =>{
    const userDataLocalStorage = localStorage.getItem('userData')
    if (userDataLocalStorage) return JSON.parse(userDataLocalStorage)
    else return userDataLocalStorage
}
export const getToken = () =>{
    return localStorage.getItem('token')
}

export const getAllStudents = async() =>{
    try{
       return (await instance.get('/student')).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const createNewStudent = async(student) =>{
    try{
       return (await instance.post('/student', student)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const editStudent = async(student, id) =>{
    try{
       return (await instance.put(`/student/${id}`, student)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const changeStudentState = async(body, id) =>{
    try{
       return (await instance.patch(`/student/${id}/state`, body)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const createAssignments = async(body) =>{
    try{
       return (await instance.post(`/assignment`, body)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const editAssignments = async(body) =>{
    try{
       return (await instance.put(`/assignment`, body)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const getStudentById = async(id) =>{
    try{
       return (await instance.get(`/student/${id}`)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}
export const createAccount = async(body) =>{
    try{
       return (await instance.post(`/register`, body)).data
    } 
    catch(e){
        console.log(e)
        return []
    }
}