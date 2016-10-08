/**
 * Created by maze on 10/8/16.
 *
 * This component displays two checkboxes
 * for displaying the daus in hatching times
 * and reducing them by 20%.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hatching-time-manager',
    templateUrl: './hatching-time-manager.component.html',
    styleUrls: ['./hatching-time-manager.component.scss']
})
export default class HatchingTimeManagerComponent {

    /** Used to emit reduced checkbox status. */
    @Output() private reduced = new EventEmitter<boolean>();

    /** Used to emit putDays checkbox status. */
    @Output() private putDays = new EventEmitter<boolean>();

    /** Convenience method to emit a boolean through an EventEmitter. */
    private static emitBool(emitter: EventEmitter<boolean>, value: boolean): void {
        emitter.emit(value);
    }

    public constructor() {
        this.reducedChange = HatchingTimeManagerComponent.emitBool
                .bind(this, this.reduced);
        this.putDaysChange = HatchingTimeManagerComponent.emitBool
                .bind(this, this.putDays);
    }

    /**
     * Bound to reduced chackbox change event,
     * emits its status.
     */
    public reducedChange: (isReduced: boolean) => void;

    /**
     * Bound to putDays chackbox change event,
     * emits its status.
     */
    public putDaysChange: (daysArePut: boolean) => void;
}
