import React from 'react'

export default function FullPost() {
  return (
   <>
   <section className='bg-black min-h-screen'>
    <div className='container text-purple-300'>

      <div className='flex flex-col gap-4 items-start'>
      <h1 className='font-semibold text-3xl'>Welcome to my blog</h1>

<img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710750844/gr-stocks-q8P8YoR6erg-unsplash_mvkw8l.jpg" className='h-80 w-full rounded-2xl' alt="" />
<h2 className='font-semibold text-2xl' >My first Post</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius enim quo magni officia ab tenetur, nemo libero, cumque ex beatae incidunt nisi voluptatem animi, voluptatibus repellat. Accusamus, aspernatur porro!</p>
<h3 className=' text-lg'>By: Ifeoma</h3>
<p>Created on 24th december 2024</p>
<a href="mailto:recipient@example.com" className="rounded-lg flex justify-center items-center border-purple-300  py-2 px-4 border  text-sm font-medium text-purple-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 focus:outline-none shadow-md w-[30%]">Connect</a>
    </div>
      </div>
    
   </section>
   
   </>
  )
}











// import { AnchorProvider, Program } from "@project-serum/anchor";
// import {
//   useAnchorWallet,
//   useConnection,
// } from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPostById } from "../../Context/functions/getPostById"; 
// import idl from "../../../idl.json"

// const PROGRAM_KEY = new PublicKey(idl.metadata.address);

// function getProgram(provider) {
//   return new Program(idl, PROGRAM_KEY, provider);
// }

// export const FullPost = () => {
//   const { id } = useParams();
//   const wallet = useAnchorWallet();
//   const { connection } = useConnection();
//   const [provider, setProvider] = useState();
//   const [post, setPost] = useState();

//   useEffect(() => {
//     try {
//       if (provider) {
//         const getPost = async () => {
//           const program = getProgram(provider);
//           const post = await getPostById(id.toString(), program);
//           setPost(post);
//           console.log(post)
//         };
//         getPost();
//       }
//     } catch(err) { console.log(err)}
//   }, [provider]);

//   useEffect(() => {
//     if (wallet) {
//       const provider = new AnchorProvider(connection, wallet, {});
//       setProvider(provider);
//       console.log(post)
//     }
//   }, [connection, wallet]);


//   return (
//     <article className="hentry background-color">
//       <div className="featured-image">
//         <img
//           src="https://images.unsplash.com/photo-1531096187418-86ac6b31baea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9d6cd4e7c48dfc78f5e9c0fb07b692f0&auto=format&fit=crop&w=1350&q=80"
//           alt=""
//         />
//       </div>
//       <h1 className="entry-title">{post?.title}</h1>
//       <div className="entry-meta">
//         <p>
//           <span className="author">
//             Written by <a href="#">Lavi Perchik</a>
//           </span>{" "}
//           <span className="date">Monday, July 9, 2018</span>
//         </p>
//       </div>
//       <div className="entry-content">
//         <p>{post?.content}</p>
//       </div>
//     </article>
//   );
// };