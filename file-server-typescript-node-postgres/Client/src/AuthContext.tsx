import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';
import dummyUser from './dummyUser';

// type setTer = Dispatch<SetStateAction<any>>;

type User = {
    id: string;
    username: string;
    email: string;
    isadmin: boolean;
} | null

interface UserType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (user: User | null) => void;
    logout: () => void;
    [key: string]:any;
}

export const UserContext = createContext<UserType>({
    user: {id: '', username: '', email: '', isadmin: false},
    setUser: (_user: User | null) => {},
    login: (_user: User | null) => {},
    logout: () => {}
});

const UserAuthProvider:React.FC<PropsWithChildren> = ({children}:any) => {
    const persistedUser = localStorage.getItem('user');

    const [user, setUser] = useState<User>( persistedUser? JSON.parse(persistedUser) : null );

    // get a user from localStorage
    useEffect(() => {
        const getPresentUser = () => {
            const persistedUser = localStorage.getItem('user');

            if (persistedUser) {
                setUser(JSON.parse(persistedUser));
            }
        };
        getPresentUser();
    }, [])

    // set a user into localStorage
    useEffect(() => {
        const setUserToStorage = () => {
            localStorage.setItem('user', JSON.stringify(user))
        };
        setUserToStorage();
    }, [user])

    const login = (newUser: User) => {
        setUser(newUser)
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <UserContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserAuthProvider;