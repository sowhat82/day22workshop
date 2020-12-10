import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient){}


// get text/html format
  async getTextHTML(){

    const httpHeaders = new HttpHeaders().set('Accept', 'text/html')
    const result = await this.http.get('/order/total/30', {headers: httpHeaders, responseType: 'text'}).toPromise()  
    console.info('text style', result)
  }

// get json format
  async getJSON(){

    const httpHeaders = new HttpHeaders().set('Accept', 'application/json')
    const result = await this.http.get('/order/total/30', {headers: httpHeaders}).toPromise()  
    console.info('json style', result)
  }

}
