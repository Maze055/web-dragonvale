/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/9/16.
 *
 * BreedingHints component tests file.
 */

import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SelectModule } from 'angular2-select';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import AlterDurationPipe from '../../shared/pipes/alter-duration.pipe';
import BreedingHint from '../models/breeding-hint';
import BreedingHintsComponent from './breeding-hints.component';
import BreedingHintComponent from '../breeding-hint/breeding-hint.component';
import ElemBoxComponent from '../elem-box/elem-box.component';
import FormatDurationPipe from '../../shared/pipes/format-duration.pipe';
import HatchingTimePipe from '../../shared/pipes/hatching-time.pipe';
import HintsService from '../services/hints.service';
import SharedModule from '../../shared/shared.module';
import SimpleDataService from '../../shared/services/simple-data.service';

const HATCHING_TIME = '27:30:00';

class MockHintsService {
    public getHint(id: number): Observable<BreedingHint> {
        return Observable.from([{
            id: id,
            name: 'Kite',
            time: HATCHING_TIME,
            elems: ['Water', 'Metal']
        }]);
    }
}

class MockSimpleDataService {
    public getNames(): Observable<string[]> {
        return Observable.from([[
            'Kite',
            'Obsidian',
            'Pyrite'
        ]]);
    }
}

describe('BreedingHints component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BreedingHintsComponent,
                BreedingHintComponent,
                ElemBoxComponent
            ],

            imports: [
                SelectModule,
                SharedModule
            ],

            providers: [
                {provide: HintsService, useClass: MockHintsService},
                {provide: SimpleDataService, useClass: MockSimpleDataService}
            ]

        }).compileComponents();
    }));

    beforeEach(fakeAsync(() => {
        this.fixture = TestBed.createComponent(BreedingHintsComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.breeding-hints'));

        this.hintsData = this.fixture.debugElement.injector.get(HintsService);
        this.hatchingTimePipe = new HatchingTimePipe(new AlterDurationPipe(),
                new FormatDurationPipe());

        this.id = 12;

        spyOn(this.hintsData, 'getHint').and.callThrough();

        this.comp.addHint(this.id);
        tick();

        this.fixture.detectChanges();

        this.hatchingTime = this.element.query(By.css('.hatching-time'));
    }));

    it('should create an instance', () => {
        var component = new BreedingHintsComponent(null, null);
        expect(component).toBeTruthy();
    });

    it('should get dragon names from the service at initialization', () => {

        /*
            In the second beforeEach this.fixture.detectChanges();
            triggers ngOnInit()
        */
        expect(this.comp.names).toBeTruthy();
    });

    describe('hints array management', () => {
        it('should get and display hint from the service', fakeAsync(() => {
            // The first hint is requested in the second beforeEach

            var hint = this.element.query(By.css('.breeding-hint'));

            expect(this.hintsData.getHint).toHaveBeenCalled();
            expect(hint).toBeTruthy();
        }));

        it('should bring the requested hint on top of the list if already in it', fakeAsync(() => {
            spyOn(this.comp.hints, 'splice').and.callThrough();

            // Just another id
            this.comp.addHint(this.id + 1);
            tick();
            this.comp.addHint(this.id);

            expect(this.comp.hints.splice).toHaveBeenCalled();
        }));

        it('should do nothing when the selected hint is already on top of the list', fakeAsync(() => {
            spyOn(this.comp.hints, 'unshift').and.callThrough();

            this.comp.addHint(this.id);

            expect(this.comp.hints.unshift).not.toHaveBeenCalled();
        }));
    });

    describe('Reduced and putDays propagation', () => {
        it('should display reduced hatching times', () => {
            var reduced = this.element.query(By.css('#reduced'));

            reduced.nativeElement.checked = true;
            reduced.triggerEventHandler('change', null);
            this.fixture.detectChanges();

            var reducedTime = this.hatchingTimePipe.transform(HATCHING_TIME,
                    AlterDurationPipe.Transformation.REDUCE, false);

            expect(this.hatchingTime.nativeElement.textContent).toContain(reducedTime);
        });

        it('should display days in hatching times', () => {
            var putDays = this.element.query(By.css('#putDays'));

            putDays.nativeElement.checked = true;
            putDays.triggerEventHandler('change', null);
            this.fixture.detectChanges();

            var daysTime = this.hatchingTimePipe.transform(HATCHING_TIME,
                AlterDurationPipe.Transformation.NONE, true);

            expect(this.hatchingTime.nativeElement.textContent).toContain(daysTime);
        });
    });
});
