/**
 * Created by maze on 10/6/16.
 *
 * This pipe formats time durations to
 * either display days separately or
 * convert them to hours.
 *
 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { sprintf } from 'sprintf';
import timeSpan from '../lib/time-span';

@Pipe({
    name: 'formatDuration'
})
export default class FormatDurationPipe implements PipeTransform {

    /** sprintf format that displays days. */
    private static readonly DAYS_FORMAT = '%02d:%02d:%02d:%02d';

    /** sprintf format that doesn't display days. */
    private static readonly NO_DAYS_FORMAT = '%02d:%02d:%02d';

    /**
     * The actual pipe function: formats a time duration
     * to either 'dd:HH:mm:ss' or HH:mm:ss' format: in
     * other words days are either displayed or converted
     * to hours.
     *
     * @param duration Input time duration: when string, only 'dd:HH:mm:ss' and 'HH:mm:ss' format are accepted.
     * @param putDays When true, the result will be in 'dd:HH:mm:ss' format, but days will be hidden if none. When false, 'HH:mm:ss' format will be used.
     * @return Time duration string in either 'dd:HH:mm:ss' or HH:mm:ss' format.
     *
     * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
     */
    public transform(duration: timeSpan.TimeSpan, putDays = false): string {
        duration = timeSpan.makeDuration(duration);

        /*
         moment.duration().as*() methods all return
         doubles: truncation is handled by sprintf
         due to %d format.
         */
        var daysCount = duration.asDays();
        if (putDays && daysCount >= 1)
            return sprintf(FormatDurationPipe.DAYS_FORMAT, daysCount, duration.hours(),
                duration.minutes(), duration.seconds());
        return sprintf(FormatDurationPipe.NO_DAYS_FORMAT, duration.asHours(),
            duration.minutes(), duration.seconds());
    }
}
