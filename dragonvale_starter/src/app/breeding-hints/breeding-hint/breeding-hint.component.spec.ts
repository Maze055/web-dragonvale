/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/9/16.
 *
 * BreedingHint component test file.
 */

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import BreedingHintComponent from './breeding-hint.component';
import ElemBoxComponent from '../elem-box/elem-box.component';
import SharedModule from '../../shared/shared.module';

describe('BreedingHint component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BreedingHintComponent,
                ElemBoxComponent
            ],

            imports: [
                SharedModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        this.fixture = TestBed.createComponent(BreedingHintComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.breeding-hint'));

        this.dragon = {id: 53, time: '02:09:10', name: 'Wisp', elems: ['Earth', 'Dark']};
        this.parent1 = {id: 128, time: '02:09:10', name: 'Wisp', elems: ['Earth', 'Dark']};
        this.parent2 = {id: 290, time: '02:09:10', name: 'Wisp', elems: ['Earth', 'Dark']};
        this.breedElems = ['Light', 'Water'];
        this.notes = 'Notes';

        this.bothParents = Object.assign({parent1: this.parent1, parent2: this.parent2}, this.dragon);
        this.parent1Elems = Object.assign({parent1: this.parent1, breedElems: this.breedElems}, this.dragon);
        this.parent1Notes = Object.assign({parent1: this.parent1, notes: this.notes}, this.dragon);
        this.breedElemsHint = Object.assign({breedElems: this.breedElems}, this.dragon);
        this.breedElemsNotes = Object.assign({breedElems: this.breedElems, notes: this.notes}, this.dragon);
        this.notesHint = Object.assign({notes: this.notes}, this.dragon);
        this.defaultHint = this.dragon;

        this.comp.reduced = false;
        this.comp.putDays = false;
    });

    it('should create an instance', () => {
        var component = new BreedingHintComponent();
        expect(component).toBeTruthy();
    });

    describe('display tests', () => {
        it('should display both parents only', () => {
            this.comp.hint = this.bothParents;
            this.fixture.detectChanges();

            // The dragon object of the hint and both parents
            expect(this.element.queryAll(By.css('.dragon-box')).length).toEqual(3);

            expect(this.element.query(By.css('.elem-box'))).toBeFalsy();
            expect(this.element.query(By.css('.notes'))).toBeFalsy();
        });
    });

    describe('Output test', () => {
        it('should emit parents id when they are clicked', () => {
            var emittedId: number;
            this.comp.dragonSelected.subscribe((id: number) => {
                emittedId = id;
            });

            this.comp.hint = this.bothParents;
            this.fixture.detectChanges();

            // 0-dragon is the object of the hint
            var dragons = this.element.queryAll(By.css('.dragon-box'));

            dragons[1].triggerEventHandler('click', null);
            expect(emittedId).toEqual(this.parent1.id);

            dragons[2].triggerEventHandler('click', null);
            expect(emittedId).toEqual(this.parent2.id);
        });
    });

});
