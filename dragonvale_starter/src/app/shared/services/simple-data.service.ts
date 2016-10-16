/**
 * Created by maze on 10/15/16.
 */

import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export default class SimpleDataService {
    public constructor(
            private http: Http) { }

    public getNames(): Observable<string[]> {
        return this.http.get('names')
            .map((res: Response) => { return res.json(); });
    }

    public getParents(): Observable<string[]> {
        return this.http.get('parents')
            .map((res: Response) => { return res.json(); });
    }

    public getTimes(): Observable<string[]> {
        return this.http.get('times')
            .map((res: Response) => { return res.json(); });
    }
}
