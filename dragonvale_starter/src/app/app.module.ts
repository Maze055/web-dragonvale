import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from './app.component';
import ImgUrlPipe from './shared/img-url.pipe';
import DragonBoxComponent from './shared/dragon-box/dragon-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgUrlPipe,
    DragonBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
      AppComponent
  ]
})
export default class AppModule { }
