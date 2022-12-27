import { Icon } from "@fortawesome/fontawesome-svg-core";
import { FigureType } from "./figure-type";

export interface Square{
    indexes: Array<number>;
    color: string;
    isHilighted: boolean;
    figure: FigureType
}