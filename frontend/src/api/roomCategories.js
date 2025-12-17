import axios from 'axios';
const API = 'http://localhost:3001/api/room-categories';

export const getRoomCategories = () => axios.get(API);
