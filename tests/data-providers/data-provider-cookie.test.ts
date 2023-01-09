import {JSDOM} from 'jsdom';

import DataProvider from '../../src/data-providers/data-provider';
import DataProviderCookie from '../../src/data-providers/data-provider-cookie';

describe('DataProviderCookie', () =>  {
    let document: any;
    let dataProvider: DataProvider;

    beforeEach(() => {
        document = (new JSDOM()).window.document;
        dataProvider = new DataProviderCookie();
        dataProvider.init({document: document});
    });

    test('Creating data provider', () => {
        expect(dataProvider).toBeInstanceOf(Object);
    });

    test('You should be able to call set and get methods', () => {
        let data: string = 'Hello world!';

        dataProvider.setData(data);
        expect(dataProvider.getData()).toBeTruthy();
    });
});