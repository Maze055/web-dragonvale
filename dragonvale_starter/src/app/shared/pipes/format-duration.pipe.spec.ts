/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/7/16.
 *
 * FormatDuration pipe tests file
 */

import moment = require('moment');
import FormatDurationPipe from './format-duration.pipe';
import timeSpan from '../lib/time-span';

describe('FormatDuration pipe', () => {
    beforeAll(() => {
        this.instance = new FormatDurationPipe();
        this.duration24h = '28:00:00';
        this.duration24d = '01:04:00:00';
        this.duration = '22:00:00';
    });

    it('should create an instance', () => {
        expect(this.instance).toBeTruthy();
    });

    describe('Tests on string inputs', () => {
        describe('Durations greater than 24h', () => {
            it('should display days', () => {
                expect(this.instance.transform(this.duration24h, true))
                    .toEqual(this.duration24d);
            });

            it('should not display days', () => {
                expect(this.instance.transform(this.duration24d, false))
                    .toEqual(this.duration24h);
            });
        });

        describe('Duration less than 24h', () => {
            it('should not display days because there are none', () => {
                expect(this.instance.transform(this.duration, true))
                    .toEqual(this.duration);
            });

            it('should not display days because not told to', () => {
                expect(this.instance.transform(this.duration, false))
                    .toEqual(this.duration);
            });
        });
    });

    describe('Tests on moment.duration inputs', () => {
        describe('Durations greater than 24h', () => {
            it('should display days', () => {
                expect(this.instance.transform(timeSpan.makeDuration(this.duration24h), true))
                    .toEqual(this.duration24d);
            });

            it('should not display days', () => {
                expect(this.instance.transform(timeSpan.makeDuration(this.duration24d), false))
                    .toEqual(this.duration24h);
            });
        });

        describe('Duration less than 24h', () => {
            it('should not display days because there are none', () => {
                expect(this.instance.transform(timeSpan.makeDuration(this.duration), true))
                    .toEqual(this.duration);
            });

            it('should not display days because not told to', () => {
                expect(this.instance.transform(timeSpan.makeDuration(this.duration), false))
                    .toEqual(this.duration);
            });
        });
    });
});
