import { Component, OnInit } from '@angular/core';
import { FigureType } from '../figure-type';
import { Square } from '../model.square';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  squares: Square[] = [];
  currentSquare = null;
  ngOnInit(): void {
    this.getSquares();
    this.squares[62].figure = FigureType.knight;
    this.squares[63].figure = FigureType.rook;
    this.squares[61].figure = FigureType.bishop;
    this.squares[60].figure = FigureType.king;
    this.squares[59].figure = FigureType.queen;
    this.squares[63].figure = FigureType.rook;
    this.squares[58].figure = FigureType.bishop;
    this.squares[56].figure = FigureType.rook;
    this.squares[57].figure = FigureType.knight;
  }
  private getSquares() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            this.squares.push({
              indexes: [i, j],
              color: 'black',
              isComfortable: false,
              figure: FigureType.none,
            });
          } else {
            this.squares.push({
              indexes: [i, j],
              color: 'red',
              isComfortable: false,
              figure: FigureType.none,
            });
          }
        } else {
          if (j % 2 === 0) {
            this.squares.push({
              indexes: [i, j],
              color: 'red',
              isComfortable: false,
              figure: FigureType.none,
            });
          } else {
            this.squares.push({
              indexes: [i, j],
              color: 'black',
              isComfortable: false,
              figure: FigureType.none,
            });
          }
        }
      }
    }
  }

  onClick(square) {
    if (square.figure !== FigureType.none) {
      this.currentSquare = square;
    }
    if (square.isComfortable && this.currentSquare.figure !== FigureType.none) {
      square.figure = this.currentSquare.figure;
      this.currentSquare.figure = FigureType.none
      this.squares.map((square) => (square.isComfortable = false));
      return
    }
    const indexes = this.getIndexes(square);
    for (let i = 0; i < indexes.length; i++) {
      let y = square.indexes[0] + indexes[i][0];
      let x = square.indexes[1] + indexes[i][1];
      console.log(x + ':' + y);
      if (x >= 0 && y >= 0) {
        for (let item of this.squares) {
          if (
            item.indexes[0] === y &&
            item.indexes[1] === x &&
            item.figure === FigureType.none
          ) {
            item.isComfortable = true;
          }
        }
      }
    }
  }
  getIndexes(square) {
    let left;
    let right;
    let top;
    let botom;
    switch (square.figure) {
      case FigureType.knight:
        return [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ];
      case FigureType.rook:
        let indexes = [];
      case FigureType.king:
        return [
          [-1, 0],
          [-1, 1],
          [-1, -1],
          [0, -1],
          [0, 1],
          [1,-1],
          [1,0],
          [1,1]
        ];
    }
  }
}
