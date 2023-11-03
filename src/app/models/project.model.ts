export class Project {
    // Project Id
    id?: string;

    // Project Name
    name?: string;

    // Project Owner
    owner_id?: string;

    // Sharing Access
    shared_access?: Record<string, "READ-ONLY" | "READ-WRITE">

    // Boards
    board?: Array<Board>;
}

export class Board {
    // Board Name
    name?: string;

    // Board Type
    boardType?: BoardType;

    // Board Position
    pos?: Coords;

    // Board Content
    boardContent: any;
}

export enum BoardType {
    STATIC,
    LINKED
}

export interface Coords {
    x: number,
    y: number
}