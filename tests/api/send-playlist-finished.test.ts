import sendPlaylistFinished from '../../src/api/send-playlist-finished';

const axios = require('axios');

jest.mock('axios');

describe('sendPlaylistFinished', () => {
    let response: any;
    let playlist = 'Chip.n.Dail';

    beforeEach(() => {
        response = {"data":"ok"};

        axios.get.mockReturnValue(new Promise(resolve => {
            resolve({data: response});
        }))
    });

    test('Check returned data', () => {
        sendPlaylistFinished(playlist).then((data: any) => {
            expect(data.data).toBe(response.data);
        });
    });
});