import axios from 'axios';
import { SCRIPTS_URL } from '../constants';

const ENDPOINT = 'photoalbumData.php';

export type PhotoalbumData = {
    photoalbum: string;
    photos: Array<string>;
}

type PlaylistDataResponse = {
    data: PhotoalbumData[];
}

export const loadPhotoalbumDataList = (): Promise<PhotoalbumData[]> =>
    axios
        .get(SCRIPTS_URL + ENDPOINT)
        .then((res: PlaylistDataResponse) => res.data)
        .catch(err => Promise.reject(err.response.data));
