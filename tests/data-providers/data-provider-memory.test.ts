import {JSDOM} from 'jsdom';

import DataProvider from '../../src/data-providers/data-provider';
import DataProviderMemory from '../../src/data-providers/data-provider-memory';

describe('DataProviderCookie', () =>  {
    let dataProvider: DataProvider;

    beforeEach(() => {
        dataProvider = new DataProviderMemory();
    });

    test('Creating data provider', () => {
        expect(dataProvider).toBeInstanceOf(Object);
    });

    test('Set and get data', () => {
        let dataPrimitive: Array<any> = [
            'Hello world!',
            42,
            true,
            false,
            null,
            undefined,
        ];

        let dataObject: Array<any> = [
            [10, 0, -1, 1.5, 1, 1, 2, 3, 5, 8],
            ['cat', 'dog', 'zibra', 'lion'],
            ['cat', 'dog', 2, null, false, true, undefined, '42', 33],
            {hello: 'World', key: 42},
            {hello: 'World', innerObject: {hi: 'there'}, innerArray: [1, 2, 'cat']},
        ];

        dataPrimitive.forEach((value: any) => {
            dataProvider.setData(value);
            expect(dataProvider.getData()).toBe(value);
        });

        dataObject.forEach((value: any) => {
            dataProvider.setData(value);
            expect(dataProvider.getData()).toEqual(value);
        });
    });
});