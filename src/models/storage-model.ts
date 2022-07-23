class StorageModel {
    _key: string = 'familyMediaServer';
    _lifeTimeMilliseconds: number = 2592000000;

    get(section: string): object {
        const storageData: any = this.getStorageData();
        if (section in storageData) {
            return storageData[section];
        } else {
            return {};
        }
    }

    set(section: string, data: object) {
        const storageData: any = this.getStorageData();
        storageData[section] = data;
        this.setStorageData(storageData);
    }

    setStorageData(data: any): void {
        var d = new Date();
        d.setTime(d.getTime() + this._lifeTimeMilliseconds);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = this._key + '=' + JSON.stringify(data) + "; " + expires;
    }

    getStorageData(): any {
        let match: any = document.cookie.match(new RegExp('(^| )' + this._key + '=([^;]+)'));
        if (match && match[2]) {
            return JSON.parse(match[2]);
        } else {
            return {};
        }
    }

}

export default StorageModel;
