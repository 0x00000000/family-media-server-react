import DataProvider from './data-provider';
class DataProviderMemory implements DataProvider {
    private _data: any = {};

    public init(params?: any): void {
    }

    public setData(data: any): void {
        this._data = data;
    }

    public getData(): any {
        return this._data;
    }
}

export default DataProviderMemory;
