import DataProvider from '../../src/data-providers/data-provider';
import DataProviderMemory from '../../src/data-providers/data-provider-memory';
import StorageModel from '../../src/models/storage-model';

describe('StorageModel', () => {
    let dataProvider: DataProvider = new DataProviderMemory();
    let storageModel: StorageModel = new StorageModel(dataProvider);

    beforeEach(() => {
        dataProvider = new DataProviderMemory();
        storageModel = new StorageModel(dataProvider);
    });

    test('Check StorageModel', () => {
        expect(storageModel).toBeInstanceOf(StorageModel);
    });

    test('Check empty storage', () => {
        const section: string = 'test';
        expect(storageModel.get(section)).toEqual({});
    });

    test('Check set and get data', () => {
        const section1: string = 'section1';
        const data1: Array<number> = [1, 2, 3];
        const section2: string = 'section2';
        const data2: Object = {key1: 'value1', key2: 'value2'};
        const section3: string = 'section3';
        const data3: Object = {};
        const section4: string = 'section4';
        const data4: Object = {'object': {key: 'value'}, 'array': ['cat', 'dog']};
        const section5: string = 'section5';
        const data5: Array<Object> = [{key1: 'value1'}, {key1: 'value1'}];
        storageModel.set(section1, data1);
        storageModel.set(section2, data2);
        storageModel.set(section3, data3);
        storageModel.set(section4, data4);
        storageModel.set(section5, data5);

        expect(storageModel.get(section1)).toEqual(data1);
        expect(storageModel.get(section2)).toEqual(data2);
        expect(storageModel.get(section3)).toEqual(data3);
        expect(storageModel.get(section4)).toEqual(data4);
        expect(storageModel.get(section5)).toEqual(data5);

        expect(storageModel.get(section1)).not.toEqual(data2);
        expect(storageModel.get(section1)).not.toEqual(data3);

        expect(storageModel.get(section2)).not.toEqual(data1);
        expect(storageModel.get(section2)).not.toEqual(data3);

        expect(storageModel.get(section3)).not.toEqual(data1);
        expect(storageModel.get(section3)).not.toEqual(data2);
    });
});
