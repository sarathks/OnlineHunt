import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class DataService {

  constructor(private http: Http) { }
  fetchData(dataToServer: any, nameOfApi:any){
  	const paramsBody = (dataToServer);//stringfy sometimes
  	var url = 'http://10.4.7.24:8081'
  	return this.http.post(url+ nameOfApi, paramsBody);
  }
}
