import {Children, createContext, useContext, useMemo, useEffect} from 'react'
import { useState } from 'react';
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';

import { getAvatarUrl } from '../pages/Welcome/functions/getAvatar';
import idl from "../../idl.json"
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
const BlogContext = createContext();

// public key
const PROGRAM_KEY = new PublicKey(idl.metadata.address)

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
        avatar: "",
        email: "",
        pay: "",
        about:""
    });
    const handleUsernameSubmit = (username, email, pay, about) => {
        setUser({ ...user, name: username,  email:email, pay: pay, about: about });
        
         // Update the username in the state
       
    };
const [initialized, setInitialized] = useState(false)
const [transactionpending, setTransactionpending] = useState(false)
const [showModal, setShowModal] = useState(false)
const [postId, setPostId] = useState(0)
    const anchorWallet = useAnchorWallet()
    const {connection} = useConnection()
    const {publicKey} = useWallet()
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]) 

    const program = useMemo(()=>
    {
        if(anchorWallet){
            const provider = new anchor.AnchorProvider(connection,anchorWallet, anchor.AnchorProvider.defaultOptions)
        return new anchor.Program(idl, PROGRAM_KEY, provider)
        }

    }, [connection, anchorWallet])
    console.log(program)
    

useEffect(()=>{
    const start = async ()=>{
        if (program && publicKey){
            try{
                const [userpda] = await findProgramAddressSync([utf8.encode('user'),publicKey.toBuffer()], program.programId)
            const user = await program.account.userAccount.fetch(userpda)
            if (user){
                setInitialized(true)
                setUser({ name: user.name, avatar: user.avatar, about: user.about, email: user.email, pay: user.pay });
                console.log(user)
                setPostId(user.postId)
                const postAccounts = await program.account.postAccount.all()
                setPosts(postAccounts)
                // user posts
                setFilteredPosts( posts.filter((postData) => postData.publicKey === user.publicKey))
            console.log(program)
            }
           
            }catch(err){
console.log("no user")
setInitialized(false)
            }
        }
    }
    start()
},[program])

// initialize user
const initUser = async ()=>{
if (program && PublicKey){
    try {
        console.log("me2")
        setTransactionpending(true)
        
        const name = user.name
        const avatar = getAvatarUrl(name)
        const email = user.email
        const role = user.pay
        const about = user.about
   
    const [userpda] = findProgramAddressSync([utf8.encode('user'),publicKey.toBuffer()], program.programId)

    await program.methods
.initUser(name, avatar, email, role, about)
.accounts({
    userAccount: userpda,
    authority: publicKey,
    systemprogram: SystemProgram.programId,
}).rpc()
setInitialized(true)

}catch(err){
    console.log(err)
}finally{
    setTransactionpending(false)
}
}
}

const createPost = async (title, content, date, genre)=>{
    if(program && publicKey){
        setTransactionpending(true)
        try{
            const [userpda] = findProgramAddressSync([utf8.encode('user'),publicKey.toBuffer()], program.programId) 
            const [postpda] = findProgramAddressSync([utf8.encode('post'),publicKey.toBuffer(),Uint8Array.from([postId
            ])], program.programId) 

            await program.methods
            .createPost(title,content, date, genre)
            .accounts({
                postAccount:postpda,
                userAccount:userpda,
                authority:publicKey,
                systemprogram:SystemProgram
            }).rpc()
            setShowModal(false)
        }
        catch(err){
            console.log(err)
        }
    }
}
    return(
        <BlogContext.Provider 
        value={{user, handleUsernameSubmit,initialized, initUser, showModal, setShowModal,createPost, posts, filteredPosts}}>
            {children}
        </BlogContext.Provider>
    )

    }

