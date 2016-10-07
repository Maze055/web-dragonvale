/**
 * Created by maze on 10/6/16.
 *
 * This pipe reduces a time duration by 20%
 * or increases it by 25% (the inverse
 * transformation); also it can leave the
 * input untouched.
 *
 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
 */

import { Pipe, PipeTransform } from '@angular/core';
import moment = require('moment');
import timeSpan from '../lib/time-span';

@Pipe({
    name: 'alterDuration'
})
class AlterDurationPipe implements PipeTransform {

    /** Multiplier for duration reduction. */
    private static REDUCE_MULTIPLIER = 0.8;

    /** Multiplier for duration increasing. */
    private static INCREASE_MULTIPLIER = 1.25;

    /**
     * This method multiplies the supplied time duration by
     * a given value.
     *
     * @param multiplier Value the time duration will be multiplied by.
     * @param time Input time duration: only 'dd:HH:mm:ss' and 'HH:mm:ss' formats are accepted.
     * @return The new time duration.
     */
    private static alterTime(multiplier: number, time: timeSpan.TimeSpan): moment.Duration {
        var millis = timeSpan.makeDuration(time).asMilliseconds();
        return moment.duration(millis * multiplier);
    };

    /**
     * The actual pipe function.
     *
     * @param duration Input time duration: when string, only 'dd:HH:mm:ss' and 'HH:mm:ss' format are accepted.
     * @param action The transformation to perform.
     * @return The altered duration.
     */
    public transform(duration: timeSpan.TimeSpan, action = AlterDurationPipe.Transformation.NONE): moment.Duration {
        switch (action) {
            case AlterDurationPipe.Transformation.NONE:
                return timeSpan.makeDuration(duration);

            case AlterDurationPipe.Transformation.REDUCE:
                return AlterDurationPipe.alterTime(AlterDurationPipe.REDUCE_MULTIPLIER,
                        duration);

            case AlterDurationPipe.Transformation.INCREASE:
                return AlterDurationPipe.alterTime(AlterDurationPipe.INCREASE_MULTIPLIER,
                        duration);
        }
    }
}

namespace AlterDurationPipe {

    /** The implemented duration transformations. */
    export enum Transformation {
        NONE,
        REDUCE,
        INCREASE
    }
}

export default AlterDurationPipe;
