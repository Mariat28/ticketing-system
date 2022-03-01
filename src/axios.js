import axios from 'axios';

// axios.defaults.baseURL='https://soft-desk.nl/backend/api/';
axios.defaults.baseURL='http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization']='Bearer ' + sessionStorage.getItem('access_token');
