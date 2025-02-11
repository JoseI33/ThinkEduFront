export const getUserData = () =>{
    const userDataLocalStorage = localStorage.getItem('userData')
    if (userDataLocalStorage) return JSON.parse(userDataLocalStorage)
    else return userDataLocalStorage
}
export const getToken = () =>{
    return localStorage.getItem('token')
}