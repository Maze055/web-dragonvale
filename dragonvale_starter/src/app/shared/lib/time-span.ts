/**
 * Created by maze on 10/6/16.
 *
 * This file holds utility function for handling
 * time durations and moment.duration objects.
 *
 * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
 */

import moment = require('moment');

namespace timeSpan {

    /** Convenience shortcut for an union type. */
    export type TimeSpan = moment.Duration | string;

    /**
     * Typeguard wrapper for moment.isDuraton() method.
     *
     * @param time Variable which type is narrowed.
     * @return True if the passed variable is a moment.Duration instance.
     *
     * @see {@link http://momentjs.com/docs/#/durations/is-a-duration/ momentjs isDuration() method}.
     */
    export function isDuration(time: any): time is moment.Duration {
        return moment.isDuration(time);
    }

    /**
     * Returns true when a time displays days.
     *
     * @param time Input time string.
     * @return True if input time string displays days.
     */
    export function daysAreDisplayed(time: string): boolean {
        return time.length > 8;
    }

    /**
     * This method creates a moment.Duration instance
     * from a colon-separated time duration string, in
     * either 'dd:HH:mm:ss' or 'HH:mm:ss' format. If
     * the input already is a moment.Duration object,
     * it is left untouched.
     *
     * @param time Input time duration string, in either 'dd:HH:mm:ss' or 'HH:mm:ss' format.
     * @return A moment.Duration instance derived from input.
     *
     * @see {@link http://momentjs.com/docs/#/durations/ moment.js duration class}.
     */
    export function makeDuration(time: TimeSpan): moment.Duration {
        if (isDuration(time))
            return time;

        /*
         Days are present, so transforming string
         according to moment.js specifications.
         http://momentjs.com/docs/#/durations/creating/
         */
        if (daysAreDisplayed(time))
            time = time.replace(':', '.');

        return moment.duration(time);
    }
}

export default timeSpan;
