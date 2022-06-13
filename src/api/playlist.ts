import axios from 'axios';
import {BASE_URL} from '../constants';

const ENDPOINT = 'playlistData.php';

export type PlaylistData = {
    playlist: string;
    videos: Array<string>;
}

type PlaylistDataResponse = {
    data: PlaylistData[];
}

export const loadPlaylistDataList = (): Promise<PlaylistData[]> =>
    axios
        .get(BASE_URL + ENDPOINT)
        .then((res: PlaylistDataResponse) => res.data)
        .catch(err => Promise.reject(err.response.data));
