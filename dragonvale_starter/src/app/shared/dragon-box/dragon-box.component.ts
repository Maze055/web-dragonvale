/**
 * Created by maze on 9/25/16.
 *
 * @fileoverview
 *
 * This component is made up of the pictures
 * of a dragon in its adult stage and its egg,
 * followed by dragons name and hatching time,
 * and finally by the elemental flag pictures
 * of its elements.
 *
 * The input is a Dragon instance, whose data
 * will be rendered.
 *
 * The output is a callback, onClick, fired on
 * the namesake event: an 'id' argument is
 * passed, holding the represented dragon id.
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
  @Input() private dragon: Dragon;
  @Output() private interact = new EventEmitter<number>();

  public constructor() { }

  public onClick(): void {
    this.interact.emit(this.dragon.id);
  }
}
