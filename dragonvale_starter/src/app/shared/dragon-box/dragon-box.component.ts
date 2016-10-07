/**
 * Created by maze on 9/25/16.
 *
 * This component is made up of the pictures
 * of a dragon in its adult stage and its egg,
 * followed by dragons name and hatching time,
 * and finally by the elemental flag pictures
 * of its elements.
 *
 * @see Dragon
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import Dragon from '../models/dragon';

@Component({
    selector: 'dragon-box',
    templateUrl: './dragon-box.component.html',
    styleUrls: ['./dragon-box.component.scss']
})
export default class DragonBoxComponent {

    /** The data of the dragon that will be rendered. */
    @Input() private dragon: Dragon;

    /**
     * Emits the dragon id when the user
     * interacts with the component template.
     */
    @Output() private interact = new EventEmitter<number>();

    /**
     * Bound to click event in the template,
     * emits the dragon id.
     */
    public onClick(): void {
        this.interact.emit(this.dragon.id);
    }
}
