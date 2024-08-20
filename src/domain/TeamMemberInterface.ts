export enum accessLevel {
    view = 1,
    edit = 2
}


export enum isBlocked {
    not_bloked = 0,
    is_bloked = 1
}

export interface TeamMember {
    _id?: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
    isGoogle: boolean;
    permissions: {
        dbDesign: accessLevel;
        modules: accessLevel;
        board: accessLevel;
    };
    created_at?: Date;
    updated_at?: Date;
}
