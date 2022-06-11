import axios from 'axios';

const loadVideosList = (): Promise<unknown> =>
    axios
        .get('http://localhost:3000/videosList.php')
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.data));

export default loadVideosList;
