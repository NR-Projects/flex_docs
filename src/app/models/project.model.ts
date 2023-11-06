export class Project {
    // Project Id
    id?: string;

    // Project Name
    name?: string;

    // Project Owner
    owner_id: string = '';

    // Sharing Access [uid -> access_type]
    // * = Everyone
    // <uid> = UID of specific user
    shared_access: Record<string, string> = {}
}

export class Board {
    // Board Id
    id: string;

    // Board Name
    name: string;

    // Board Type
    boardType: string;

    // Board Content
    boardContent: any;

    // Board Position
    pos: Vec2;

    // Board Size
    size: Vec2;
    
    // Board Min Size
    min_size: Vec2;

    // REMOVABLE
    _is_pos_changed?: boolean;

    constructor(name: string, boardType: string, boardContent: string) {
        this.id = '';
        this.name = name;
        this.boardType = boardType;
        this.boardContent = boardContent;
        this._is_pos_changed = false;
        
        // Default Values
        this.min_size = { x: 2, y: 2 };
        this.size = { x: 9, y: 16 };
        this.pos = { x: 0, y: 0 };
    }
}

export interface Vec2 {
    x: number,
    y: number
}