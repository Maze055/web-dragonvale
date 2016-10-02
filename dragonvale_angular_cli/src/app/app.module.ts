import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import ImgUrlPipe from './shared/img-url.pipe';
import DragonBoxComponent from './shared/dragon-box/dragon-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgUrlPipe,
    DragonBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
