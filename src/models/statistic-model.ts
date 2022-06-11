import StorageModel from './storage-model';

type LastWatched = {
    directory: string,
    filename: string,
}

type LastWatchedList = LastWatched[];

class MediaStatisticModel {
    _type: string = '';
    _historyLength: number = 100;
    _storage: StorageModel = new StorageModel();
    _watchedList: any;

    constructor(type: string) {
        this.init(type);
    }

    init(type: string) {
        this._type = type;
        this._watchedList = this._storage.get(this._type);
    }

    getWatchedFile(directory: string): string {
        let watched: LastWatched = this._watchedList?.find((watched: LastWatched) => (watched.directory === directory));
        if (! watched) {
            return '';
        } else {
            return watched.filename;
        }
    }

    addWatchedFile(directory: string, filename: string): void {
        let index: number = this._watchedList?.findIndex((watched: LastWatched) => (watched.directory === directory));
        if (index !== -1) {
            this._watchedList?.splice(index, 1);
        }
        let lastWatched: LastWatched = {directory: directory, filename: filename,};
        this._watchedList?.push(lastWatched);
        if (this._watchedList?.length > this._historyLength) {
            this._watchedList?.splice(0, this._watchedList?.length - this._historyLength);
        }
        this._storage.set(this._type, this._watchedList);
    }

}

export default MediaStatisticModel;
