import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempComponent } from './temp/temp.component';
import { DemoFComponent } from './demo-f/demo-f.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'demo',component:DemoFComponent},
  {path:'temp',component:TempComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
