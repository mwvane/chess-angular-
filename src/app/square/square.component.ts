import { Component, Input } from '@angular/core';
import { Square } from '../model.square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() square: Square
}
