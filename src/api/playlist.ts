import axios from 'axios';
import { SCRIPTS_URL } from '../constants';

const ENDPOINT = 'playlistData.php';

export type PlaylistData = {
    playlist: string;
    videos: Array<string>;
    options?: {
        random?: boolean;
    }
}

type PlaylistDataResponse = {
    data: PlaylistData[];
}

export const loadPlaylistDataList = (): Promise<PlaylistData[]> =>
    axios
        .get(SCRIPTS_URL + ENDPOINT)
        .then((res: PlaylistDataResponse) => res.data)
        .catch(err => Promise.reject(err.response.data));
