import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonFormComponent } from './json-form/json-form.component';
import { NewformComponent } from './newform/newform.component';

const routes: Routes = [
  {
    path:'', redirectTo:'json-form', pathMatch:'full'
  },
  {
    path:'newform', component:NewformComponent
  },
  {
    path:'json-form', component:JsonFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
