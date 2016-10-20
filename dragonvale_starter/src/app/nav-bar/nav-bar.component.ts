/**
 * Created by maze on 10/19/16.
 */

import { Component } from '@angular/core';
import { ROUTES } from '../app-routing.module';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export default class NavBarComponent {
    private bbbbb = ROUTES;
}
