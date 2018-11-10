import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-41e7b.firebaseio.com/'
})

export default instance;