import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SentimentsService {

 // url = 'http://localhost:8090/getSentiments';
  //uncomment for prod
  url = 'http://sentalyze.ap-south-1.elasticbeanstalk.com/getSentiments';
  constructor(private http: HttpClient) {}

  getSentiments(keyword: string): Observable<any> {
    return this.http.get(`${this.url}?keyword=${encodeURI(keyword)}`).pipe(
      map(results => {
        console.log('Raw results : ',results);
        return results;
      })
    );
  }
}
