import { PlaylistData } from '../../src/types/playlist-data';
import loadPlaylistData from '../../src/api/load-playlist-data';

const axios = require('axios');

jest.mock('axios');

describe('loadPlaylistData', () => {
    let response: PlaylistData[] = [];

    beforeEach(() => {
        response = [
            {
                "playlist":"Chip.n.Dail",
                "videos":["S01E11.mp4","S01E12.mp4","S01E13.mp4"]
            },
            {
                "playlist":"Ladybug",
                "videos":["S02E05.Riposte.mp4","S02E06.Robostus.mp4"]},{"playlist":"Songs",
                "videos":[
                    "Abba.-.Money,.Money,.Money.mp4",
                    "Ace.of.Base.-.Beautiful.Life.mp4",
                    "Baccara.-.Sorry,.I'am.a.Lady.mp4",
                    "Chubby.Checker.-.Let's.Twist.Again.mp4",
                    "Eurythmics.-.Sweet.Dreams.mp4",
                    "Fool's.Garden.-.Lemon.Tree.animation.mp4",
                    "Frozen.-.Let.It.Go.mp4",
                    "Little.Richard.-.Tutti.frutti.mp4"
                ],
                "options":{"random":true}
            },
            {
                "playlist":"SonicUnderground",
                "videos":["121.Dunes.Day.mp4","122.-.Mummy,.Dearest.mp4","123.-.The.Hedgehog.in.an.Iron.Mask.mp4","124.-.Six.is.a.Crowd.mp4"]
            },
            {
                "playlist":"The.Cat.in.the.Hat",
                "videos":["S01E13E14.mp4","S01E15E16.mp4","S01E17E18.mp4"]
            }
        ];

        axios.get.mockReturnValue(new Promise(resolve => {
            resolve({data: response});
        }));
    });

    test('Should return data from backend', () => {
        loadPlaylistData().then((data: PlaylistData[]) => {
            expect(data[0].playlist).toBe(response[0].playlist);
            expect(data[1].options).toEqual(response[1].options);
            expect(data[2].videos.length).toBe(response[2].videos.length);
            expect(data[3].videos).toEqual(response[3].videos);
        });
    });

});