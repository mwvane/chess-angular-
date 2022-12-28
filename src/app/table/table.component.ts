import { Component, OnInit } from '@angular/core';
import { FigureType } from '../figure-type';
import { Square } from '../model.square';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  squares: Square[][] = [];
  currentSquare = null;
  ngOnInit(): void {
    this.getSquares();
    const figures = [
      FigureType.rook,
      FigureType.knight,
      FigureType.bishop,
      FigureType.queen,
      FigureType.king,
      FigureType.bishop,
      FigureType.knight,
      FigureType.rook,
    ];
    for (let i = 0; i < figures.length; i++) {
      this.squares[i][7].figure = figures[i];
      this.squares[i][6].figure = FigureType.pawn;
    }
  }
  private getSquares() {
    for (let i = 0; i < 8; i++) {
      this.squares.push([]);
      for (let j = 0; j < 8; j++) {
        this.squares[i].push({
          indexes: [j, i],
          color: (i + j) % 2 !== 0 ? 'red' : 'black',
          isHilighted: false,
          figure: FigureType.none,
        });
      }
    }
  }
  unhilightAllFigures() {
    this.squares.forEach((squares) =>
      squares.forEach((square) => (square.isHilighted = false))
    );
  }

  onClick(square) {
    if (square.isHilighted && this.currentSquare.figure !== FigureType.none) {
      square.figure = this.currentSquare.figure;
      this.currentSquare.figure = FigureType.none;
      this.unhilightAllFigures();
      return;
    }

    if (square.figure !== FigureType.none) {
      this.currentSquare = square;
      this.unhilightAllFigures();
    }

    const indexes = this.getHilightableSquaresIndexes(square);
    if(indexes){
      for (const [x, y] of indexes) {
        if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
          if (this.squares[y][x].figure === FigureType.none) {
            this.squares[y][x].isHilighted = true;
          }
        }
      }
    }
  }
  existsFigure(indexes) {
    const square = this.squares[indexes[0]][indexes[1]];
    if (!square) {
      return false;
    }
    return square.figure !== FigureType.none;
  }
  getIndexesByVariant(square, variants) {
    const indexes = [];
    for (let [addY, addX] of variants) {
      let [currentY, currentX] = square.indexes;
      while (true) {
        currentX += addX;
        currentY += addY;
        if (
          currentX >= 0 &&
          currentX <= 7 &&
          currentY >= 0 &&
          currentY <= 7 &&
          !this.existsFigure([currentX, currentY])
        ) {
          indexes.push([currentY, currentX]);
        } else {
          break;
        }
      }
    }
    return indexes;
  }
  getHilightableSquaresIndexes(square) {
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
        ].map((item) => [
          item[0] + square.indexes[0],
          item[1] + square.indexes[1],
        ]);
      case FigureType.king:
        return [
          [-1, 0],
          [-1, 1],
          [-1, -1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ].map((item) => [
          item[0] + square.indexes[0],
          item[1] + square.indexes[1],
        ]);
      case FigureType.pawn:
        let indexes =
          square.indexes[0] > 5
            ? [
                [-1, 0],
                [-2, 0],
              ]
            : [[-1, 0]];
        return indexes.map((item) => [
          item[0] + square.indexes[0],
          item[1] + square.indexes[1],
        ]);
      case FigureType.rook:
        return this.getIndexesByVariant(square, [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]);
      case FigureType.bishop:
        return this.getIndexesByVariant(square, [
          [-1, -1],
          [1, 1],
          [-1, 1],
          [1, -1],
        ]);
      case FigureType.queen:
        return this.getIndexesByVariant(square, [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [1, 1],
          [-1, 1],
          [1, -1],
        ]);
    }
  }
}
