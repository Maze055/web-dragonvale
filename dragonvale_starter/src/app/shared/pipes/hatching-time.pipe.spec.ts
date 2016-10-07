/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/7/16.
 *
 * HatchingTime pipe test file. It is purposely
 * lacking some use cases since it's just a
 * convenience pipe.
 */

import AlterDurationPipe from './alter-duration.pipe';
import FormatDurationPipe from './format-duration.pipe';
import HatchingTimePipe from './hatching-time.pipe';

describe('HatchingTime pipe', () => {
    beforeAll(() => {
        this.instance = new HatchingTimePipe(new AlterDurationPipe(),
            new FormatDurationPipe());
    });

    it('should create an instance', () => {
        expect(this.instance).toBeTruthy();
    });

    it('should reduce an hatching time and convert days to hours', () => {
        expect(this.instance.transform('02:00:00:00', AlterDurationPipe.Transformation.REDUCE,
                false)).toEqual('38:24:00');
    });

    it('should increase an hathing time and display days', () => {
        expect(this.instance.transform('20:00:00', AlterDurationPipe.Transformation.INCREASE,
                true)).toEqual('01:01:00:00');
    });
});
