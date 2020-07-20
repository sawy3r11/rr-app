import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialImportModule } from './material-import/material-import.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegistryPageComponent } from './registry-page/registry-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {MatCardModule} from '@angular/material/card';
import { RegistryTableComponent } from './registry-page/registry-table/registry-table.component';
import { HttpClientModule } from '@angular/common/http';
import { RefuellingRegistryService } from './core/service/refuelling-registry.service';
import { RefuellingDialogComponent } from './registry-page/refuelling-dialog/refuelling-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MessageDialogComponent } from './core/components/message-dialog/message-dialog.component';
import { RefuellingPersonService } from './core/service/refuelling-person.service';
import { RefuellingPersonFormComponent } from './registry-page/refuelling-person-form/refuelling-person-form.component';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RegistryPageComponent,
    AboutPageComponent,
    RegistryTableComponent,
    RefuellingDialogComponent,
    MessageDialogComponent,
    RefuellingPersonFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialImportModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    RefuellingDialogComponent,
    MessageDialogComponent
  ],
  providers: [RefuellingRegistryService, RefuellingPersonService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
