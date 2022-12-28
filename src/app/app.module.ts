import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SquareComponent } from './square/square.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FigureComponent } from './figure/figure.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SquareComponent,
    FigureComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
