/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/8/16.
 *
 * HatchingTimeManager component tests file.
 */

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import HatchingTimeManagerComponent from './hatching-time-manager.component';

describe('HatchingTimeManager component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HatchingTimeManagerComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        this.fixture = TestBed.createComponent(HatchingTimeManagerComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.hatching-time-manager'));
    });

    it('should create an instance', () => {
        var component = new HatchingTimeManagerComponent();
        expect(component).toBeTruthy();
    });

    it('should emit reduced event when the checkbox status changes', () => {
        var checkbox = this.element.query(By.css('#reduced'));
        this.comp.reduced.subscribe((isReduced: boolean) => {
            expect(isReduced).toBe(true);
        });

        expect(checkbox.nativeElement.checked).toBe(false);
        checkbox.nativeElement.checked = true;
        checkbox.triggerEventHandler('change', null);
    });

    it('should emit putDays event when the checkbox status changes', () => {
        var checkbox = this.element.query(By.css('#putDays'));
        this.comp.putDays.subscribe((daysArePut: boolean) => {
            expect(daysArePut).toBe(true);
        });

        expect(checkbox.nativeElement.checked).toBe(false);
        checkbox.nativeElement.checked = true;
        checkbox.triggerEventHandler('change', null);
    });
});
