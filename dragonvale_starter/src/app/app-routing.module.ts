/**
 * Created by maze on 19/10/16.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import BreedingHintsComponent from './breeding-hints/main/breeding-hints.component';

export const ROUTES: Routes = [
  // { path: '',      component: SearchComponent },
  // { path: 'search',      component: SearchComponent },
  {
      path: 'breeding-hints',
      component: BreedingHintsComponent,
      data: { title: 'Breeding Hints' }
  }
  // { path: '**',    component: SearchComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],

    exports: [
        RouterModule
    ]
})
export default class AppRoutingModule { }
