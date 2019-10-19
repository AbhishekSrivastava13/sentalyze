import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SentimentsService } from '../services/sentiments.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  results: Observable<any>;
  searchTerm: string = '';
  sentimentResponseMap: {'text inside map ': {
    'magnitude' : '0.8',
    'score' : '0.5'
  }};
  constructor(private sentimentService: SentimentsService) {}

  getSentiments(){
    console.log('Search term : ',this.searchTerm);
    this.results = this.sentimentService.getSentiments(this.searchTerm);
    console.log('Results in Main : ',this.results);
    /* this.results.subscribe(res => {
      console.log('inside subscribe : ',res);
      this.sentimentResponseMap = res.sentimentResponseMap;
      console.log('sentiment response map : ',this.sentimentResponseMap);
    }) */
  }

}
