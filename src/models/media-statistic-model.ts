import DataProvider from '../data-providers/data-provider';
import StorageModel from './storage-model';

type WatchedData = {
    directory: string,
    filename: string,
}

class MediaStatisticModel {
    private _type: string = '';
    private _historyLength: number = 100;
    private _dataProvider: DataProvider;
    private _storage: StorageModel;
    private _watchedList: WatchedData[] = [];

    constructor(type: string, dataProvider: DataProvider) {
        this._dataProvider = dataProvider;
        this._storage = new StorageModel(this._dataProvider)
        this.init(type);
    }

    private init(type: string) {
        this._type = type;
        this._watchedList = this.safeGetWatchedList(this._storage.get(this._type));
    }

    public safeGetWatchedList(data: any): WatchedData[] {
        let watchedList: WatchedData[] = [];
        if (data && Array.isArray(data)) {
            data.forEach((item: any) => {
                if (item.directory && item.filename) {
                    watchedList.push({directory: item.directory, filename: item.filename});
                }
            });
        }
        return watchedList;
    }

    public getWatchedFile(directory: string): string {
        let watched: WatchedData | undefined = this._watchedList.find((watched: WatchedData) => (watched.directory === directory));
        if (! watched) {
            return '';
        } else {
            return watched.filename;
        }
    }

    public addWatchedFile(directory: string, filename: string): void {
        let index: number = this._watchedList.findIndex((watched: WatchedData) => (watched.directory === directory));
        if (index !== -1) {
            this._watchedList.splice(index, 1);
        }
        let watchedData: WatchedData = {directory: directory, filename: filename,};
        this._watchedList.push(watchedData);
        if (this._watchedList.length > this._historyLength) {
            this._watchedList.splice(0, this._watchedList.length - this._historyLength);
        }
        this._storage.set(this._type, this._watchedList);
    }
}

export default MediaStatisticModel;
