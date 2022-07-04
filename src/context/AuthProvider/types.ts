export interface IUser {
    email?: string;
    token?: string;
}

export interface IUserEntity {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}

export interface UserProps {
    users: IUserEntity;
}