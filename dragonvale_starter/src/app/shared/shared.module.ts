/**
 * Created by maze on 10/2/16.
 *
 * Feature module for shared utilities.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import DragonBoxComponent from './dragon-box/dragon-box.component';
import HatchingTimeManagerComponent from './hatching-time-manager/hatching-time-manager.component';
import AlterDurationPipe from './pipes/alter-duration.pipe';
import FormatDurationPipe from './pipes/format-duration.pipe';
import HatchingTimePipe from './pipes/hatching-time.pipe';
import ImgUrlPipe from './pipes/img-url.pipe';

@NgModule({
    declarations: [
        DragonBoxComponent,
        HatchingTimeManagerComponent,
        HatchingTimePipe,
        ImgUrlPipe
    ],

    providers: [
        AlterDurationPipe,
        FormatDurationPipe
    ],

    imports: [
        CommonModule
    ],

    exports: [
        DragonBoxComponent,
        HatchingTimeManagerComponent
    ]
})
export default class SharedModule { }