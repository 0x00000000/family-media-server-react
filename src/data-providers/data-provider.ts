interface DataProvider {
    init(params?: any): void;
    setData(data: any): void;
    getData(): any;
}

export default DataProvider;
