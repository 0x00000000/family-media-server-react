import MediaStatisticModel from '../../src/models/media-statistic-model';
import DataProvider from '../../src/data-providers/data-provider';
import DataProviderMemory from '../../src/data-providers/data-provider-memory';

describe('MediaStatisticModel', () => {
    let dataProvider: DataProvider = new DataProviderMemory();
    let statisticType1 = 'type1';
    let statisticType2 = 'type2';
    let statistic1: MediaStatisticModel = new MediaStatisticModel(statisticType1, dataProvider);
    let statistic2: MediaStatisticModel = new MediaStatisticModel(statisticType2, dataProvider);

    const testData: Array<any> = [
        {
            directory: 'examples/test1',
            filesList: ['file1.mp4', 'file2.mp4', 'file3.avi', 'file4'],
        },
        {
            directory: 'examples/test2/',
            filesList: ['file1.mp4', 'file2.mp4', 'file3.avi', 'file4'],
        },
        {
            directory: 'test3',
            filesList: ['file1.mp4', 'file2.mp4', 'file3.avi', 'file4'],
        },
        {
            directory: 'test4/',
            filesList: ['file1.mp4', 'file2.mp4', 'file3.avi', 'file4'],
        },
    ];

    beforeEach(() => {
        dataProvider = new DataProviderMemory();
        statistic1 = new MediaStatisticModel(statisticType1, dataProvider);
        statistic2 = new MediaStatisticModel(statisticType2, dataProvider);
    });

    test('Check MediaStatisticModel', () => {
        expect(statistic1).toBeInstanceOf(MediaStatisticModel);
    });

    test('Check set and get watched files', () =>{
        statistic1.addWatchedFile(testData[0].directory, testData[0].filesList[0]);
        statistic1.addWatchedFile(testData[1].directory, testData[1].filesList[1]);
        statistic1.addWatchedFile(testData[2].directory, testData[2].filesList[2]);
        statistic1.addWatchedFile(testData[3].directory, testData[3].filesList[3]);

        expect(statistic1.getWatchedFile(testData[0].directory)).toBe(testData[0].filesList[0]);
        expect(statistic1.getWatchedFile(testData[1].directory)).toBe(testData[1].filesList[1]);
        expect(statistic1.getWatchedFile(testData[2].directory)).toBe(testData[2].filesList[2]);
        expect(statistic1.getWatchedFile(testData[3].directory)).toBe(testData[3].filesList[3]);

        expect(statistic1.getWatchedFile(testData[0].directory)).not.toBe(testData[0].filesList[1]);
        expect(statistic1.getWatchedFile(testData[0].directory)).not.toBe(testData[0].filesList[2]);
        expect(statistic1.getWatchedFile(testData[0].directory)).not.toBe(testData[0].filesList[3]);
    });

    test('Check unwatched directories', () => {
        let notExistedDirecotry: string = 'notExistedDirecotry';
        expect(statistic1.getWatchedFile(testData[0].directory)).toBe("");
        expect(statistic1.getWatchedFile(notExistedDirecotry)).toBe("");
    });

    test('Check different statistic types', () => {
        statistic1.addWatchedFile(testData[0].directory, testData[0].filesList[0]);
        statistic2.addWatchedFile(testData[1].directory, testData[1].filesList[1]);

        expect(statistic1.getWatchedFile(testData[0].directory)).toBe(testData[0].filesList[0]);
        expect(statistic2.getWatchedFile(testData[1].directory)).toBe(testData[1].filesList[1]);
        expect(statistic2.getWatchedFile(testData[0].directory)).toBe('');
    });
});
