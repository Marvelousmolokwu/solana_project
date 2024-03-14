import {Children, createContext, useContext} from 'react'
import { useState } from 'react';
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { PublicKey, SystemProgram } from '@solana/web3.js';
import { getAvatarUrl } from '../pages/Welcome/functions/getAvatar';
import idl from "../../idl.json"
const BlogContext = createContext();



export const useBlog =() =>{
 const context = useContext(BlogContext);
 if(!context){
    throw new Error("parent must be wrapped inside provider")
 }
 return context;
}

export const BlogProvider =({children})=>{
    const [user, setUser] = useState({
        name: "", // Initialize the username to an empty string
        avatar: "https://res.cloudinary.com/ddgyd8szc/image/upload/v1700314755/Untitled_okmkvz.jpg"
    });
    const handleUsernameSubmit = (username) => {
        setUser({ ...user, name: username }); // Update the username in the state
        console.log(user)
    };

    return(
        <BlogContext.Provider 
        value={{user, handleUsernameSubmit}}>
            {children}
        </BlogContext.Provider>
    )

}

