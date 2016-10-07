/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/6/16.
 *
 * AlterDuration pipe tests file
 */

import AlterDurationPipe from './alter-duration.pipe';
import FormatDurationPipe from './format-duration.pipe';
import timeSpan from '../lib/time-span'

describe('AlterDuration pipe', () => {
    beforeAll(() => {
        this.format = new FormatDurationPipe();
        this.duration24h = '20:00:00';
        this.durationObject = timeSpan.makeDuration(this.duration24h);
        this.instance = new AlterDurationPipe();
        this.check = function(duration: timeSpan.TimeSpan,
                              action: AlterDurationPipe.Transformation,
                              expected: string): void {
            var transformed = this.instance.transform(duration, action);
            expect(this.format.transform(transformed)).toEqual(expected);
        };
    });

    it('should create an instance', () => {
        expect(this.instance).toBeTruthy();
    });

    describe('Tests on string inputs', () => {
        it('should do nothing', () => {
            this.check(this.duration24h,
                AlterDurationPipe.Transformation.NONE,
                this.duration24h);
        });

        it('should increase time by 25%', () => {
            this.check(this.duration24h,
                AlterDurationPipe.Transformation.INCREASE,
                '25:00:00');
        });

        it('should decrease time by 20%', () => {
            this.check(this.duration24h,
                AlterDurationPipe.Transformation.REDUCE,
                '16:00:00');
        });
    });

    describe('Tests on moment.duration inputs', () => {
        it('should do nothing', () => {
            this.check(this.durationObject,
                AlterDurationPipe.Transformation.NONE,
                this.duration24h);
        });

        it('should increase time by 25%', () => {
            this.check(this.durationObject,
                AlterDurationPipe.Transformation.INCREASE,
                '25:00:00');
        });

        it('should decrease time by 20%', () => {
            this.check(this.durationObject,
                AlterDurationPipe.Transformation.REDUCE,
                '16:00:00');
        });
    });
});
