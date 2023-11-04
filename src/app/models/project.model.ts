export class Project {
    // Project Id
    id?: string;

    // Project Name
    name?: string;

    // Project Owner
    owner_id?: string;

    // Sharing Access
    shared_access?: Record<string, "READ-ONLY" | "READ-WRITE">
}

export class Board {
    // Board Id
    id: string;

    // Board Name
    name: string;

    // Board Type
    boardType?: BoardType;

    // Board Position
    pos: Vec2;

    // Board Size
    size: Vec2;

    // Board Min Size
    min_size: Vec2;

    // Board Content
    boardContent: any;


    constructor(id: string, name: string, boardType: BoardType) {
        this.id = id;
        this.name = name;
        this.boardType = boardType;
        
        // Default Values
        this.min_size = { x: 2, y: 2 };
        this.size = { x: 2, y: 2 };
        this.pos = { x: 0, y: 0 };
    }
}

export enum BoardType {
    STATIC,
    LINKED
}

export interface Vec2 {
    x: number,
    y: number
}