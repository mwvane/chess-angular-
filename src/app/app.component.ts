import { Component } from '@angular/core';
enum figure{
  hourse = "leo"
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess';
  figure: typeof figure = figure
}
