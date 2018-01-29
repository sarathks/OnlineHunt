import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
@Injectable()

export class DataService {
	private isUserLoggedIn;
	public url:any = 'http://10.4.5.23:8080';
	public englishWords:any = ["Polichu", "vere level" , "Thani raavanan","congrats"];
    public malayalamWords:any = ["കുടുക്കി !! തിമിർത്ത്  !! കലക്കി !!", "നേരാ തിരുമേനീ !!" , "ശെരിയുത്തരം !!","പൊളിച്ചു !!","അടിച്ചു മോനേ !!","നീ സുലൈമാൻ അല്ല, ഹനുമാനാണ്  !!","പണ്ഡിതനാണെന്ന് തോന്നുന്നു !!","ഭീകരൻ ആണ്  കൊടും ഭീകരൻ !!","നമിച്ചു അളിയാ ...","ഇനിയും വരില്ലേ , ഇത് വഴി ആനകളെയും തെളിച്ചു കൊണ്ട് ","എന്റെ ശിവനെ ..","ഹൗ ബ്യൂട്ടിഫുൾ പീപ്പിൾ","ചേട്ടൻ  സൂപ്പറാ", "നീ പൊന്നപ്പൻ  അല്ലെടാ തങ്കപ്പൻ ...തങ്കപ്പൻ", "ഭയങ്കരം തന്നെ!!", "ബെസ്ററ് കണ്ണാ  ബെസ്ററ് ","അഭിനന്ദനങ്ങൾ!", "അടിച്ചു മോളെ ..!", "ആഹ്ലാദിപ്പിൻ ആർമാദിപ്പിൻ ...", "കബാലി ഡാ..", "കയ്യടിക്കടാ..","കൊള്ളാല്ലോ നീയ് "];
	constructor(private http: Http) {
		this.isUserLoggedIn = false;
	}

	fetchData(dataToServer: any, nameOfApi:any){

		const paramsBody = (dataToServer);//stringfy sometimes
		return this.http.post(environment.url+ nameOfApi, paramsBody);
	}

	passwordReset(dataToServer: any, nameOfApi:any){
		const paramsBody = (dataToServer);//stringfy sometimes
		return this.http.patch(environment.url+ nameOfApi, paramsBody);
	}

	fetchUserDetails(nameOfApi:any){
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', localStorage.access_token);
		const options = new RequestOptions({headers: headers});
		return this.http.get(environment.url+ nameOfApi, options);
	}

	sendAnswer(dataToServer: any, nameOfApi:any){
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', localStorage.access_token);
		const options = new RequestOptions({headers: headers});
		const paramsBody = (dataToServer);//stringfy sometimes
		return this.http.post(environment.url+ nameOfApi, paramsBody,options);
	}

	getMalayalamWords(){
		return (this.malayalamWords[Math.floor(Math.random() * this.malayalamWords.length)]);
	}

	getEnglishWords(){
		return (this.englishWords[Math.floor(Math.random() * this.englishWords.length)]);

	}



	setUserLoggedIn() {
		this.isUserLoggedIn = true;
	}

	getUserLoggedIn() {
		return this.isUserLoggedIn;
	}

}
