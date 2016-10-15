/**
 * Created by maze on 10/9/16.
 */

import { Component, OnInit } from '@angular/core';
import BreedingHint from '../models/breeding-hint';

type NgSelectOption = {value: number, text: string};

@Component({
    selector: 'breeding-hints',
    templateUrl: './breeding-hints.component.html',
    styleUrls: ['./breeding-hints.component.scss']
})
export default class BreedingHintsComponent implements OnInit {
    private reduced: boolean;
    private putDays: boolean;

    public names: NgSelectOption[];

    public hints: BreedingHint[];

    public ngOnInit(): void {
        // this.names = service call
        // this.hints cached?
    }

    public addHint(id: number): void {
        // get hint from service
        // add it (copy angular1 code)
    }


}
