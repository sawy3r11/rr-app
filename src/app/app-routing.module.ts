import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryPageComponent } from './registry-page/registry-page.component';
import { AboutPageComponent } from './about-page/about-page.component';


const routes: Routes = [
  {path: 'registry', component: RegistryPageComponent},
  {path:'about', component: AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
