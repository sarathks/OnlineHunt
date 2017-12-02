import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { RulesComponent } from './rules/rules.component';

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
}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeaderBoardComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
