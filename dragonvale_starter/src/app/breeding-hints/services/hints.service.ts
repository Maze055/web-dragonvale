/**
 * Created by maze on 10/14/16.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export default class HintsService {

    public constructor(
            private http: Http) { }

    public getHint(id: number) {
        this.http.get(`breeding-hint/${ id }`);
    }

}
