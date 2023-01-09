import axios from 'axios';

import { SCRIPTS_URL } from '../constants';

const ENDPOINT = 'playlistFinished.php';

const sendPlaylistFinished = (playlist: string): Promise<unknown> =>
    axios
        .get(SCRIPTS_URL + ENDPOINT + '?playlist=' + playlist)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response.data));

export default sendPlaylistFinished;
