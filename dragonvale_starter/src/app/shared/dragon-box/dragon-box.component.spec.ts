/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 9/25/16.
 *
 * DragonBox component tests file.
 */

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import AlterDurationPipe from '../pipes/alter-duration.pipe';
import DragonBoxComponent from './dragon-box.component';
import FormatDurationPipe from '../pipes/format-duration.pipe';
import HatchingTimePipe from '../pipes/hatching-time.pipe';
import ImgUrlPipe from '../pipes/img-url.pipe';

describe('DragonBox component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DragonBoxComponent,
                HatchingTimePipe,
                ImgUrlPipe
            ],

            providers: [
                AlterDurationPipe,
                FormatDurationPipe
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        this.img = new ImgUrlPipe();
        this.time = new HatchingTimePipe(new AlterDurationPipe(), new FormatDurationPipe());

        this.fixture = TestBed.createComponent(DragonBoxComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.dragon-box'));

        this.dragon = {id: 58, name: 'Rust', time: '26:00:00', elems: ['Water', 'Metal']};
        this.comp.dragon = this.dragon;
        this.comp.putDays = false;
        this.comp.reduced = false;

        this.fixture.detectChanges();
    });

    it('should create an instance', () => {
        var component = new DragonBoxComponent();
        expect(component).toBeTruthy();
    });

    describe('input tests', () => {
        describe('displayed values', () => {
            it(`should display dragon name in div.name`, () => {
                var name = this.element.query(By.css('.name')).nativeElement;
                expect(name.textContent).toContain(this.dragon.name);
            });

            it(`should display dragon hatching time in div.hatching-time`, () => {
                var time = this.element.query(By.css('.hatching-time')).nativeElement;
                expect(time.textContent).toContain(this.dragon.time);
            });

            it('should reduce dragon hatching time when told to', () => {
                this.comp.reduced = true;
                this.fixture.detectChanges();

                var time = this.element.query(By.css('.hatching-time')).nativeElement;
                var expectedTime = this.time.transform(this.dragon.time,
                        AlterDurationPipe.Transformation.REDUCE, this.comp.putDays);
                expect(time.textContent).toContain(expectedTime);
            });

            it('should display days in dragon hatching time when told to', () => {
                this.comp.putDays = true;
                this.fixture.detectChanges();

                var time = this.element.query(By.css('.hatching-time')).nativeElement;
                var expectedTime = this.time.transform(this.dragon.time,
                        AlterDurationPipe.Transformation.NONE, this.comp.putDays);
                expect(time.textContent).toContain(expectedTime);
            });
        });

        describe('image sources', () => {

            it(`should display dragon image in img.dragon`, () => {
                var dragon = this.element.query(By.css('.dragon')).nativeElement;
                expect(dragon.src).toMatch(this.img.transform(this.dragon.name, 'dragon'));
            });

            it(`should display egg image in img.egg`, () => {
                var egg = this.element.query(By.css('.egg')).nativeElement;
                expect(egg.src).toMatch(this.img.transform(this.dragon.name, 'egg'));
            });

            it(`should display elemental flags in img.elem`, () => {
                var urls = this.dragon.elems.map((elem) => {
                    return this.img.transform(elem, 'elemFlag');
                });

                var elemFlags = this.element.queryAll(By.css('.elem'));
                var srcs = elemFlags.map((elem) => {

                    // Substr for removing 'http://'
                    return elem.nativeElement.src.substr(5);
                });

                expect(srcs).toEqual(urls);
            });

        });
    });

    describe('output tests', () => {
        it('should emit interact event when clicked', () => {
            this.comp.interact.subscribe((id: number) => {
               expect(id).toEqual(this.dragon.id);
            });
            this.element.triggerEventHandler('click', null);
        });
    });
});
