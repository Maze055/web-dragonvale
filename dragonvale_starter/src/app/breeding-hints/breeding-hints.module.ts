/**
 * Created by maze on 10/9/16.
 */

import { NgModule } from '@angular/core';
import { SelectModule } from 'angular2-select';
import SharedModule from '../shared/shared.module';
import BreedingHintComponent from './breeding-hint/breeding-hint.component';
import BreedingHintsComponent from './main/breeding-hints.component';
import ElemBoxComponent from './elem-box/elem-box.component';

@NgModule({
    declarations: [
        BreedingHintComponent,
        BreedingHintsComponent,
        ElemBoxComponent
    ],

    imports: [
        SelectModule,
        SharedModule
    ],

    exports: [
        BreedingHintsComponent
    ]
})
export default class BreedingHintsModule { }
