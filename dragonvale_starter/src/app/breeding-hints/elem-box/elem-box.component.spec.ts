/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 10/9/16.
 *
 * ElemBox component tests file.
 */

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import ElemBoxComponent from './elem-box.component';
import ImgUrlPipe from '../../shared/pipes/img-url.pipe';

describe('Elem Box component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ElemBoxComponent,
                ImgUrlPipe
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        this.img = new ImgUrlPipe();

        this.fixture = TestBed.createComponent(ElemBoxComponent);
        this.comp = this.fixture.componentInstance;
        this.element = this.fixture.debugElement.query(By.css('.elem-box'));

        this.elem = 'Metal';
        this.comp.elem = this.elem;

        this.fixture.detectChanges();
    });

    it('should create an instance', () => {
        var component = new ElemBoxComponent();
        expect(component).toBeTruthy();
    });

    it('should display elemental flags in img', () => {
        var img = this.element.query(By.css('img'));

        // Substr for removing 'http://'
        var src = img.nativeElement.src.substr(5);

        expect(src).toEqual(this.img.transform(this.elem, 'elemFlag'));
    });

    it('should display element name as text', () => {
        expect(this.element.nativeElement.textContent).toContain(this.elem);
    });
});
