import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import {TasksComponent} from './component/tasks/tasks.component'
import {PrivateTasksComponent} from './component/private-tasks/private-tasks.component'
import {SignupComponent} from './component/signup/signup.component'
import {SigninComponent} from './component/signin/signin.component'

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tasks',
    pathMatch:'full'
  },
  {
    path:'tasks',
    component:TasksComponent
  },
  {
    path:'private',
    component: PrivateTasksComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
