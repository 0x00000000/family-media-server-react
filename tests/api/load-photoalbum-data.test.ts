import { PhotoalbumData } from '../../src/types/photoalbum-data';
import loadPhotoalbumData from '../../src/api/load-photoalbum-data';

const axios = require('axios');

jest.mock('axios');

describe('loadPhotoalbumData', () => {
    let response: PhotoalbumData[] = [];

    beforeEach(() => {
        response = [
            {
                "photoalbum":"20.01.19",
                "photos":["2020-01-19.20-36-01.P1195984.jpg","2020-01-19.22-10-40.P1195987.jpg","2020-01-19.22-10-43.P1195988.jpg","2020-01-19.22-11-12.P1195989.jpg","2020-01-19.22-11-21.P1195990.jpg","2020-01-19.22-11-52.P1195992.jpg","2020-01-19.22-20-51.P1195996.jpg","2020-01-19.22-21-11.P1195998.jpg","2020-01-19.22-21-18.P1195999.jpg","2020-01-19.22-21-26.P1196000.jpg","2020-01-19.22-21-31.P1196001.jpg"]
            },
            {
                "photoalbum":"20.07.12",
                "photos":["2020-07-12.18-39-10.IMG_20200712_183909227.jpg","2020-07-12.18-39-30.IMG_20200712_183926847_HDR.jpg","2020-07-12.18-39-47.IMG_20200712_183945212_HDR.jpg","2020-07-12.18-39-55.IMG_20200712_183952926_HDR.jpg","2020-07-12.18-40-06.IMG_20200712_184003816_HDR.jpg","2020-07-12.19-01-52.IMG_20200712_190148486_HDR.jpg","2020-07-12.19-02-12.IMG_20200712_190210117_HDR.jpg","2020-07-12.19-02-18.IMG_20200712_190215831_HDR.jpg","2020-07-12.19-26-07.IMG_20200712_192602154_HDR.jpg","2020-07-12.19-26-20.IMG_20200712_192616800_HDR.jpg","2020-07-12.19-26-29.IMG_20200712_192628578.jpg"]
            },
            {
                "photoalbum":"20.07.13",
                "photos":["2020-07-13.15-32-27.IMG_20200713_153227.jpg","2020-07-13.15-32-35.IMG_20200713_153235.jpg","2020-07-13.15-33-13.IMG_0457.jpg","2020-07-13.15-33-25.IMG_0459.jpg"]
            },
            {
                "photoalbum":"20.07.14",
                "photos":["2020-07-14.10-34-30.IMG_0462.jpg","2020-07-14.11-14-06.IMG_0464.jpg","2020-07-14.11-14-27.IMG_0466.jpg","2020-07-14.11-15-04.IMG_0469.jpg","2020-07-14.11-25-42.IMG_0473.jpg","2020-07-14.11-30-54.IMG_0475.jpg","2020-07-14.11-30-59.IMG_0476.jpg","2020-07-14.11-31-09.IMG_0477.jpg"]
            }
        ];

        axios.get.mockReturnValue(new Promise(resolve => {
            resolve({data: response});
        }));
    });

    test('Should return data from backend', () => {
        loadPhotoalbumData().then((data: PhotoalbumData[]) => {
            expect(data[0].photoalbum).toBe(response[0].photoalbum);
            expect(data[1].photos[1]).toBe(response[1].photos[1]);
            expect(data[2].photos.length).toBe(response[2].photos.length);
            expect(data[3].photos).toEqual(response[3].photos);
        });
    });

});