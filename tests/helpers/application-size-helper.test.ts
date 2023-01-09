import {JSDOM} from 'jsdom';

import ApplicationSizeHelper from '../../src/helpers/application-size-helper';

describe('ApplicationSizeHelper', () => {
    let document: any = (new JSDOM()).window.document;
    let helper: ApplicationSizeHelper = new ApplicationSizeHelper(document);

    beforeEach(() => {
        helper = new ApplicationSizeHelper(document);
    });

    test('Check ApplicationSizeHelper', () => {
        expect(helper).toBeInstanceOf(Object);
    });

    test('Check getWindowWidth', () => {
        expect(helper.getWindowWidth()).toBeDefined();
        expect(typeof helper.getWindowWidth()).toBe('number');
        expect(helper.getWindowWidth()).toBeGreaterThanOrEqual(document.documentElement.clientWidth);
        expect(helper.getWindowWidth()).toBeGreaterThanOrEqual(document.body.clientWidth);
    });

    test('Check getWindowHeight', () => {
        expect(helper.getWindowHeight()).toBeDefined();
        expect(typeof helper.getWindowHeight()).toBe('number');
        expect(helper.getWindowHeight()).toBeGreaterThanOrEqual(document.documentElement.clientHeight);
        expect(helper.getWindowHeight()).toBeGreaterThanOrEqual(document.body.clientHeight);
    });

    test('Check getApplicationWidth', () => {
        expect(helper.getApplicationWidth()).toBeDefined();
        expect(typeof helper.getApplicationWidth()).toBe('number');
        expect(helper.getApplicationWidth()).toBeGreaterThanOrEqual(helper.getWindowWidth());
        expect(helper.getApplicationWidth()).toBeGreaterThanOrEqual(helper.getWindowHeight());
    });

});

export {};
