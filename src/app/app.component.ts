import { Component } from '@angular/core';
import { Router,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

    constructor(private router:Router) {

   		//detect router change
 router.events.forEach((event) => {
    if(event instanceof NavigationStart) {
    	if(event.url == '/' && localStorage.access_token){
         this.router.navigate(['/home'])
    	}
    }
    
  });

      window.addEventListener("orientationchange", function() {
        // Announce the new orientation number
        location.reload();
      }, false);
}


}
