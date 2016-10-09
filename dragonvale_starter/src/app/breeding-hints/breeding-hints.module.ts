/**
 * Created by maze on 10/9/16.
 */

import { NgModule } from '@angular/core';
import SharedModule from '../shared/shared.module';
import BreedingHintsComponent from './main/breeding-hints.component';
import ElemBoxComponent from './elem-box/elem-box.component';

@NgModule({
    declarations: [
        BreedingHintsComponent,
        ElemBoxComponent
    ],

    imports: [
        SharedModule
    ],

    exports: [
        BreedingHintsComponent
    ]
})
export default class BreedingHintsModule { }
