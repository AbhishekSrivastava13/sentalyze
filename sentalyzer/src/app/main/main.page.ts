import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadResults(){
    console.log('chal gaya bc : :D');
    let term = this.searchTerm;
    let url = '/home'+'/'+term;
    console.log('final url with term : ', url);
    this.router.navigate([url]);

  }

}
