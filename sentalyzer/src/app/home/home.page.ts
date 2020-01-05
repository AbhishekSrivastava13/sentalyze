import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SentimentsService } from '../services/sentiments.service';
import { Chart } from 'chart.js';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('pieChart',{static: false}) pieChart;
  @ViewChild('barChart',{static: false}) barChart;
  @ViewChild('geoChart',{static: false}) geoChart :  GoogleChartInterface;
  results: Observable<any>;
  values: {};
  chartdata: {};
  isLoading = false;
  showSpiner= false;
  bars: any;
  searchTerm: string = '';
  colorArray: any;
  sentimentResponseMap: {'text inside map ': {  
    'magnitude' : '0.8',
    'score' : '0.5',
    'sentimentScore' : '1',
    'latitude' : '0.0',
    'longitude' : '0.0'
  }};
  constructor(private sentimentService: SentimentsService, private route: ActivatedRoute, private changeDetector : ChangeDetectorRef, public loadingController: LoadingController) {
    console.log('home page ka constructor chala or geochart : ',this.geoChart);
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot.paramMap.get('id');
    console.log('id value home page : ',this.searchTerm);
    console.log('geochart is : ',this.geoChart);
    this.getSentiments();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  getSentiments(){
    this.showSpiner = true;
    console.log('Search term : ',this.searchTerm);
    this.results = this.sentimentService.getSentiments(this.searchTerm);
    console.log('Results in Main : ',this.results);
    this.results.subscribe(res => {
      this.values = res['responseList'];
      this.chartdata = res['countMap'];
      this.changeDetector.detectChanges();
      this.generateColorArray(5);
      this.createBarChart();
      this.createPieChart();
     this.loadGeoChart();
     this.showSpiner = false;
    })
  }

  generateColorArray(num) {
    this.colorArray = [];
    this.colorArray.push('#42e0ff');
    this.colorArray.push('#ed1000');
    this.colorArray.push('#f27979');  
    this.colorArray.push('#02f002');
    this.colorArray.push('#025c02');
   }

   createBarChart() {
    let clabels,data : [];
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(this.chartdata),
        datasets: [{
          label: 'Number of user per sentiment',
          data: Object.values(this.chartdata),
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
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

  createPieChart() {
    let clabels,data : [];
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
  loadGeoChart() { 
    
    this.geoChart = {
      chartType: 'GeoChart',
      dataTable: [
         ['Lat','Long','Color','Size',{type:'string', role:'tooltip', p:{html:true}}],
         [0,0,0,0,'']
      ],
      opt_firstRowIsData: false,
      options: {
        colorAxis: {colors: this.colorArray},
       region: 'world',
        backgroundColor: 'white',      
        datalessRegionColor: '#d6d3c9',
        defaultColor: '#F5F5F5',
        displayMode: 'auto',
        domain : 'IN',
        enableRegionInteractivity : true,
        legend: 'none',
        tooltip: {
          isHtml: true,
          showTitle: false
        }
      },
    };
    var counter= 0;
    for (var i in Object.keys(this.values)){
      if(this.values[i].latitude != '0.0' && this.values[i].longitude != '0.0'){
        console.log( this.geoChart.dataTable);
        if(counter == 0){
          this.geoChart.dataTable.splice(1,1);
        }
        console.log( this.geoChart.dataTable);
        var newVal = 0;
        newVal = parseInt(this.values[i].sentimentScore)-1;
        //console.log("color"+newVal);
        console.log('plotting lat & long as : ',this.values[i])

        
        this.geoChart.dataTable.push([this.values[i].latitude, this.values[i].longitude, 
          newVal, 200, this.values[i].category]); 
          counter ++;
    }
  }
  if(counter == 0){
    this.geoChart.dataTable.splice(1,1);
  }

  
  }

}
