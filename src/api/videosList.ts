import axios from 'axios';
import {BASE_URL} from '../constants';

type VideosItem = {
    playlist: string;
    videos: Array<string>;
}

export type VideosList = Array<VideosItem>;

type VideosListResponse = {
    data: VideosList;
}

export const loadVideosList = (): Promise<VideosList> =>
    axios
        .get(BASE_URL + 'videosList.php')
        .then((res: VideosListResponse) => res.data)
        .catch(err => Promise.reject(err.response.data));
