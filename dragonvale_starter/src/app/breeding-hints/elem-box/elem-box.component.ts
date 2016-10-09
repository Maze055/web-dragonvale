/**
 * Created by maze on 10/9/16.
 *
 * This component displays a box containing the name
 * of an element below its elemental flag image
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'elem-box',
    templateUrl: './elem-box.component.html',
    styleUrls: ['./elem-box.component.scss']
})
export default class ElemBoxComponent {

    /** The name of the element. */
    @Input() private elem: string;
}
