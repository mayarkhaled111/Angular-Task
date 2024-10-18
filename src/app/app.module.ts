import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { AddModalComponent } from './Components/add-modal/add-modal.component';
import { EmployeesTableComponent } from './Components/employees-table/employees-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule} from '@angular/forms';
import { LoadingComponent } from './Components/loading/loading.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddModalComponent,
    EmployeesTableComponent,
    LoadingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
