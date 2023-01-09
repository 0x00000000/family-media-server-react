import DataProvider from './data-provider';
class DataProviderCookie implements DataProvider {
    private _key: string = 'familyMediaServer';
    private _lifeTimeMilliseconds: number = 2592000000;
    private _document: any;

    constructor() {
        this.init();
    }
    /**
     * Optional initialisation of data provider.
     * Set this._document from params or uses window.document by default.
     *
     * @param any params
     * @return void
     */
    public init(params?: any): void {
        if (params?.document) {
            this._document = params.document;
        } else if (typeof window !== 'undefined' && window?.document) {
            this._document = window.document;
        }
    }

    public setData(data: any): void {
        var d = new Date();
        d.setTime(d.getTime() + this._lifeTimeMilliseconds);
        var expires = 'expires=' + d.toUTCString();
        this._document.cookie = this._key + '=' + JSON.stringify(data) + "; " + expires;
    }

    public getData(): any {
        let match: any = this._document.cookie.match(new RegExp('(^| )' + this._key + '=([^;]+)'));
        if (match && match[2]) {
            return JSON.parse(match[2]);
        } else {
            return {};
        }
    }
}

export default DataProviderCookie;
