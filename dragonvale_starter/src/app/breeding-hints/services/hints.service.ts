/**
 * Created by maze on 10/14/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import BreedingHint from '../models/breeding-hint';

@Injectable()
export default class HintsService {

    public constructor(
            private http: Http) { }

    public getHint(id: number): Observable<BreedingHint> {
        return this.http.get(`breeding-hint/${ id }`)
            .map((res: Response) => { return res.json(); });
    }
}
