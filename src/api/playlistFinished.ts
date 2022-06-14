import axios from 'axios';
import { BASE_URL } from '../constants';

const ENDPOINT = 'playlistFinished.php';

const playlistFinished = (playlist: string): Promise<unknown> =>
    axios
        .get(BASE_URL + ENDPOINT + '?playlist=' + playlist)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.data));

export default playlistFinished;
