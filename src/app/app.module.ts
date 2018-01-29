import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { RulesComponent } from './rules/rules.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ModalComponent } from './modal/modal.component';

const appRoutes:Routes = [
{
  path:'',
  component: LoginComponent
},
{
  path:'home',
  component: HomeComponent
},
{
  path:'leader-board',
  component: LeaderBoardComponent
},
{
  path:'rules',
  component: RulesComponent
},
{
  path: '**',
  redirectTo: '/home'
}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeaderBoardComponent,
    RulesComponent,
    LoadingIndicatorComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),
    FormsModule,HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
