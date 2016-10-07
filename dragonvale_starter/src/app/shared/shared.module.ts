/**
 * Created by maze on 10/2/16.
 *
 * Feature module for shared utilities.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import DragonBoxComponent from './dragon-box/dragon-box.component';
import ImgUrlPipe from './pipes/img-url.pipe';

@NgModule({
    declarations: [
        DragonBoxComponent,
        ImgUrlPipe
    ],

    imports: [
        CommonModule
    ],

    exports: [
        DragonBoxComponent,
    ]
})
export default class SharedModule { }
