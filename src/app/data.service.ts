import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
@Injectable()
export class DataService {
private isUserLoggedIn;
constructor(private http: Http) {
this.isUserLoggedIn = false;
}
fetchData(dataToServer: any, nameOfApi:any){
const paramsBody = (dataToServer);//stringfy sometimes
var url = 'http://10.4.5.23:8080'
return this.http.post(url+ nameOfApi, paramsBody);
}
fetchUserDetails(nameOfApi:any){
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', localStorage.access_token);

const options = new RequestOptions({headers: headers});
var url = 'http://10.4.5.23:8080'
return this.http.get(url+ nameOfApi, options);
}
setUserLoggedIn() {
this.isUserLoggedIn = true;
}
getUserLoggedIn() {
return this.isUserLoggedIn;
}

}
