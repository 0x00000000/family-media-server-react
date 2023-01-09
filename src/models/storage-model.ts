import DataProvider from '../data-providers/data-provider';

class StorageModel {
    _dataProvider: DataProvider;

    constructor(dataProvider: DataProvider) {
        this._dataProvider = dataProvider;
    }

    public get(section: string): object {
        const storageData: any = this.getStorageData();
        if (section in storageData) {
            return storageData[section];
        } else {
            return {};
        }
    }

    public set(section: string, data: object) {
        const storageData: any = this.getStorageData();
        storageData[section] = data;
        this.setStorageData(storageData);
    }

    public setStorageData(data: any): void {
        this._dataProvider.setData(data);
    }

    public getStorageData(): any {
        return this._dataProvider.getData();
    }
}

export default StorageModel;
