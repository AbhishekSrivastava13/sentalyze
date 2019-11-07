import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SentimentsService } from '../services/sentiments.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('pieChart',{static: false}) pieChart;
  results: Observable<any>;
  values: {};
  chartdata: {};
  bars: any;
  searchTerm: string = '';
  colorArray: any;
  sentimentResponseMap: {'text inside map ': {  
    'magnitude' : '0.8',
    'score' : '0.5'
  }};
  constructor(private sentimentService: SentimentsService, private changeDetector : ChangeDetectorRef) {}

  getSentiments(){
    console.log('Search term : ',this.searchTerm);
    this.results = this.sentimentService.getSentiments(this.searchTerm);
    console.log('Results in Main : ',this.results);
    this.results.subscribe(res => {
      this.values = res['responseList'];
      this.chartdata = res['countMap'];
      this.changeDetector.detectChanges();
      this.generateColorArray(5);
      this.createPieChart();
    })
  }

  /* ionViewDidEnter() {
    this.generateColorArray(8);
    this.createPieChart();
  } */

  generateColorArray(num) {
    this.colorArray = [];
    this.colorArray.push('#42e0ff');
    this.colorArray.push('#ed1000');
    this.colorArray.push('#f27979');
    this.colorArray.push('#02f002');
    this.colorArray.push('#025c02');
  }

  createPieChart() {
    let clabels,data : [];
    console.log('## the object method ',Object.keys(this.chartdata));
    console.log('## the object values ',Object.values(this.chartdata));
    this.bars = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: Object.keys(this.chartdata),
        datasets: [{
          label: 'Viewers in millions',
          data: Object.values(this.chartdata),
          backgroundColor: this.colorArray, 
          borderColor: this.colorArray,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
