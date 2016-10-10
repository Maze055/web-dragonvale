/**
 * Created by maze on 10/9/16.
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import BreedingHint from '../models/breeding-hint';

@Component({
    selector: 'breeding-hint',
    templateUrl: './breeding-hint.component.html',
    styleUrls: ['./breeding-hint.component.scss']
})
export default class BreedingHintComponent implements OnInit {
    @Input() private hint: BreedingHint;
    @Input() private reduced: boolean;
    @Input() private putDays: boolean;
    @Output() private dragonSelected = new EventEmitter<number>();

    private isBasicBreedingRule: boolean;

    public ngOnInit(): void {
        this.isBasicBreedingRule = !(this.hint.parent1 || this.hint.parent2
                || this.hint.breedElems || this.hint.notes);
    }

    public emitSelected(id: number): void {
        this.dragonSelected.emit(id);
    }
}
