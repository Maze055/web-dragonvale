/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/7/16.
 *
 * Test file for timeSpan utility functions.
 */

import moment = require('moment');
import timeSpan from './time-span';

describe('Time span utility functions', () => {
    it('should tell whether days are displayed', () => {
        expect(timeSpan.daysAreDisplayed('02:00:00:00')).toBe(true);
        expect(timeSpan.daysAreDisplayed('02:00:00')).toBe(false);
    });

    it('should create a moment.duration instance from a string', () => {
        var duration = '12:00:30';
        expect(timeSpan.makeDuration(duration))
                .toEqual(moment.duration(duration));
    });

    it('should leave moment.duration instances untouched', () => {
        var duration = moment.duration('12:00:30');
        expect(timeSpan.makeDuration(duration))
            .toBe(duration);
    });
});
