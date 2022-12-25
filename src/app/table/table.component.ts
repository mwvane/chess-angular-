import { Component, OnInit } from '@angular/core';
import { Square } from '../model.square';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  squares: Square[] = [];
  ngOnInit(): void {
    this.getSquares();
  }
  private getSquares() {
      let line = []
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        line.push({ color: 'black', isComfortable: true });
      } else {
        line.push({ color: 'red', isComfortable: true });
      }
    }
    for(let i = 0; i < 8; i++){
      this.squares.push(...line)
      line = line.reverse()
    }
  }
}
