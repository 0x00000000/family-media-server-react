import axios from 'axios';

import { PlaylistData } from '../types/playlist-data';
import { SCRIPTS_URL } from '../constants';

const ENDPOINT = 'playlistData.php';

type PlaylistDataResponse = {
    data: PlaylistData[];
}

const loadPlaylistData = (): Promise<PlaylistData[]> =>
    axios
        .get(SCRIPTS_URL + ENDPOINT)
        .then((res: PlaylistDataResponse) => res.data)
        .catch(err => Promise.reject(err.response.data));

export default loadPlaylistData;
