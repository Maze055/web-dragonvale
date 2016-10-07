/**
 * Created by maze on 10/2/16.
 *
 * Root module for Dragonvale App.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from './app.component';
import SharedModule from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        SharedModule
    ],

    bootstrap: [
        AppComponent
    ]
})
export default class AppModule { }
