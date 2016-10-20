/**
 * Created by maze on 10/9/16.
 */

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import BreedingHint from '../models/breeding-hint';
import HintsService from '../services/hints.service';
import SimpleDataService from '../../shared/services/simple-data.service';

type NgSelectOption = {value: number, text: string};

@Component({
    selector: 'breeding-hints',
    templateUrl: './breeding-hints.component.html',
    styleUrls: ['./breeding-hints.component.scss']
})
export default class BreedingHintsComponent implements OnInit {
    private reduced: boolean;
    private putDays: boolean;
    private title: string;

    public names: NgSelectOption[];

    public hints: BreedingHint[] = [];

    public constructor(
            private route: ActivatedRoute,
            private hintsSource: HintsService,
            private data: SimpleDataService) { }

    public ngOnInit(): void {
        this.route.data.subscribe((data: {title: string}) => {
            this.title = data.title;
        });

        this.data.getNames().subscribe((names: string[]) => {
            this.names = names.map((name: string, id: number) => {
                return {value: id, text: name};
            });
        });
        // this.hints cached?
    }

    public addHint(id: number): void {
        var hintIndex = this.hints.findIndex((hint: BreedingHint) => {
            return id == hint.id;
        });

        // Hint not found, requesting it through AJAX
        if (hintIndex == -1)
            this.hintsSource.getHint(id).subscribe((hint: BreedingHint) => {
                this.hints.unshift(hint);
            });

        // Hint found, but not first: moving to top
        else if (hintIndex)
            this.hints.unshift(this.hints.splice(hintIndex, 1)[0]);
    }
}
