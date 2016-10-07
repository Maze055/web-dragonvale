/* tslint:disable:no-unused-variable */

/** DragonBox component tests file */

import { TestBed, async } from '@angular/core/testing';
import DragonBoxComponent from './dragon-box.component';
import { By } from '@angular/platform-browser';
import ImgUrlPipe from '../pipes/img-url.pipe';

describe('DragonBox component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DragonBoxComponent,
                ImgUrlPipe
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        this.dragon = {id: 58, name: 'Rust', time: '06:00:00', elems: ['Water', 'Metal']};
        this.fixture = TestBed.createComponent(DragonBoxComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.dragon-box'));
        this.comp.dragon = this.dragon;
        this.fixture.detectChanges();
        this.pipe = new ImgUrlPipe();
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

            it(`should display dragon name in div.hatching-time`, () => {
                var time = this.element.query(By.css('.hatching-time')).nativeElement;
                expect(time.textContent).toContain(this.dragon.time);
            });

        });

        describe('image sources', () => {

            it(`should display dragon image in img.dragon`, () => {
                var dragon = this.element.query(By.css('.dragon')).nativeElement;
                expect(dragon.src).toMatch(this.pipe.transform(this.dragon.name, 'dragon'));
            });

            it(`should display egg image in img.egg`, () => {
                var egg = this.element.query(By.css('.egg')).nativeElement;
                expect(egg.src).toMatch(this.pipe.transform(this.dragon.name, 'egg'));
            });

            it(`should display elemental flags in img.elem`, () => {
                var urls = this.dragon.elems.map((elem) => {
                    return this.pipe.transform(elem, 'elemFlag');
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
