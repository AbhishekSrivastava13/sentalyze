import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-geochart',
  templateUrl: './geochart.page.html',
  styleUrls: ['./geochart.page.scss'],
})
export class GeochartPage {

  public geoChart: GoogleChartInterface;

  constructor() {

  }

  ionViewDidEnter() {
    this.loadGeoChart();
  }

  loadGeoChart() {
    
    this.geoChart = {
      chartType: 'GeoChart',
      //mapsApiKey : 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY',
      dataTable: [
       /*  ['Lat','Long','Color','Size',{type:'string', role:'tooltip', p:{html:true}}],
         [41.099550000113, -73.415400000078, 0,200,'<strong>Very Positive</strong>' ],
          [24.4852, 86.6948, 1,200,'<strong>Positive</strong>'],
          [18.5204, 73.8567, 2,200,'<strong>Neutral</strong>'],
          [40.7128, 74.0060, 3,200,'<strong>Negative</strong>'],
          [51.5074, -0.1278, 4,200,'<strong>Very Negative</strong>']*/
          ['City', 'Color','Size',{type:'string', role:'tooltip', p:{html:true}}],
          ['Rome', 1,500,'<strong>Positive</strong>'],
          ['Mumbai', 5,500,'Neutral']
          /*['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300]*/
      ],
      opt_firstRowIsData: true,
      options: {
       colorAxis: {colors: ['green','blue','yellow', 'orange','red']},
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
  }


}
