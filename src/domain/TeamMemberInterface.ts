export enum accessLevel {
    view = 1,
    edit = 2
}

export interface TeamMember {
    _id?: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    avatar?: string;
    permissions: {
        dbDesign: accessLevel;
        modules: accessLevel;
        board: accessLevel;
    };
    created_at?: Date;
    updated_at?: Date;
}
