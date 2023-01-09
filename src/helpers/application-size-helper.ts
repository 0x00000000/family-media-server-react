class ApplicationSizeHelper {
    constructor(private document: any) {
    }

    public getWindowWidth(): number {
        return Math.max(this.document.documentElement.clientWidth, this.document.body.clientWidth);
    }
    public getWindowHeight(): number {
        return Math.max(this.document.documentElement.clientHeight, this.document.body.clientHeight);
    }
    public getApplicationWidth(): number {
        return Math.min(this.getWindowWidth(), this.getWindowHeight());
    }
}

export default ApplicationSizeHelper;
