/**
 * Created by maze on 10/6/16.
 *
 * This is just a convenience pipe that
 * merges both AlterDurationPipe and
 * FormatDurationPipe.
 *
 * @see AlterDurationPipe
 * @see FormatDurationPipe
 */

import { Pipe, PipeTransform } from '@angular/core';
import AlterDurationPipe from './alter-duration.pipe';
import FormatDurationPipe from './format-duration.pipe';
import timeSpan from '../lib/time-span';

@Pipe({
    name: 'hatchingTime'
})
export default class HatchingTimePipe implements PipeTransform {
    public constructor(
            private alter: AlterDurationPipe,
            private format: FormatDurationPipe) { }

    /**
     * The actual pipe function: it just
     * composes AlterDurationPipe with
     * FormatDurationPipe,
     *
     * @param duration Input time duration: when string, only 'dd:HH:mm:ss' and 'HH:mm:ss' format are accepted.
     * @param action The transformation to perform.
     * @param putDays When true, the result will be in 'dd:HH:mm:ss' format, but days will be hidden if none. When false, 'HH:mm:ss' format will be used.
     * @return Time duration string in either 'dd:HH:mm:ss' or HH:mm:ss' format.
     */
    public transform(duration: timeSpan.TimeSpan, action = AlterDurationPipe.Transformation.NONE,
                     putDays = false): string {
        return this.format.transform(this.alter.transform(duration, action), putDays);
    }
}
