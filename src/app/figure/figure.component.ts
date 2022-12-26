import { Component, Input, OnInit } from '@angular/core';
import { Square } from '../model.square';
import {
  faChessKnight,
  faChessRook,
  faChessKing,
  faChessQueen,
  faChessPawn,
  faChessBishop,
} from '@fortawesome/free-solid-svg-icons';
import { FigureType } from '../figure-type';
@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css'],
})
export class FigureComponent implements OnInit {
  ngOnInit(): void {
    this.currentFigure = this.getFigure()
  }
  currentFigure = faChessPawn
  knight = faChessKnight;
  rook = faChessRook;
  king = faChessKing;
  queen = faChessQueen;
  pawn = faChessPawn;
  bishop = faChessBishop;
  @Input() figureType: FigureType
  @Input() currentIndex: number
  getFigure() {
    switch (this.figureType) {
      case FigureType.knight:
        return this.knight  
      case FigureType.king:
        return this.king;
      case FigureType.queen:
        return this.queen;
      case FigureType.pawn:
        return this.pawn;
      case FigureType.rook:
        return this.rook;
      case FigureType.bishop:
        return this.bishop;
    }
  }
}
