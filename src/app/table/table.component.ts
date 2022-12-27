import { Component, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
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
    for (let i = 48; i < 56; i++) {
      this.squares[i].figure = FigureType.pawn;
    }
  }
  private getSquares() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.squares.push({
          indexes: [i, j],
          color: (i + j) % 2 !== 0 ? 'red' : 'black',
          isHilighted: false,
          figure: FigureType.none,
        });
      }
    }
  }
  unhilightAllFigures() {
    this.squares.map((square) => (square.isHilighted = false));
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
    const [squareY, squareX] = square.indexes;

    for (const [y, x] of indexes) {
      const toHilightSquare = this.squares.find(
        ({ indexes, figure }) =>
          indexes[0] === y && indexes[1] === x && figure === FigureType.none
      );
      if (toHilightSquare) {
        toHilightSquare.isHilighted = true;
      }
    }
  }
  existsFigure(indexes) {
    const square = this.squares.find(
      (item) => item.indexes[0] === indexes[0] && item.indexes[1] === indexes[1]
    );
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
          !this.existsFigure([currentY, currentX])
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
        return [
          [-1, 0],
          [-2, 0],
        ].map((item) => [
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
