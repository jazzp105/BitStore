import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importamos modulo http
import { HttpClientModule } from '@angular/common/http';
// Importamos el forms
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/home/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
