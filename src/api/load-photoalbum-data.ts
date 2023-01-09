import axios, { AxiosError } from 'axios';

import { PhotoalbumData } from '../types/photoalbum-data';
import { SCRIPTS_URL } from '../constants';

const ENDPOINT = 'photoalbumData.php';

type PhotoalbumDataResponse = {
    data: PhotoalbumData[];
}

const loadPhotoalbumData = (): Promise<PhotoalbumData[]> =>
    axios
        .get(SCRIPTS_URL + ENDPOINT)
        .then((res: PhotoalbumDataResponse) => res.data)
        .catch((err: Error | AxiosError) => Promise.reject(err));

export default loadPhotoalbumData;
