import React, { useEffect, useState, useHistory } from 'react'
import { useWallet   } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import {useBlog} from '../../Context/blog'
import { PostForm } from '../../components/Form';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';

const Dashboard = () =>{
  const navigate = useNavigate()
  const [connecting, setConnectings] = useState(false)
  const [connected, setConnected] = useState(false)
  
  
  // const { select, connecting, disconnect } = useWallet();

 

  const {user, initialized, initUser, showModal, setShowModal,createPost,posts } = useBlog()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postGenre, setPostGenre] = useState("");
  const [postDate, setPostDate] = useState("")
  const [provider, setProvider] = useState(null);


  
 

 
  

  // const connectWallet = async () => {
  //   try {
  //     setConnectings(true);

  //     // Check if Phantom is installed and accessible
  //     if (!window.solana) {
  //       console.log("isfalse")
  //       // Phantom not detected, redirect to download page
  //       window.open('https://phantom.app/download', '_blank');
  //       return; // Stop further execution
  //     }

  //     // Connect with Phantom wallet if present
  //     const { select } = await window.solana.connect({ onlyIfTrusted: true });
  //     if (select) {
  //     select(PhantomWalletName) // Request accounts from user
  //       setConnected(true);
  //       console.log('Wallet connected successfully:', accounts);
  //     } else {
  //       console.log('User rejected connection request');
  //     }
  //   } catch (error) {
  //     console.error('Error connecting with Phantom wallet:', error);
  //   } finally {
  //     setConnectings(false);
  //   }
  // };

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
  setProvider(provider)
      if (provider?.isPhantom) {
        return provider;
      }
    }
  
    window.open('https://phantom.app/', '_blank');
  };

  

  const connectWallet= async ()=>{
    const provider = getProvider(); 
    setConnectings(true);
    try {
      const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      setConnected(true);
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
  } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
  }finally {
        setConnectings(false);
      }
      provider.on("connect", () => console.log("connected!"));
  }

  const disconnectWallet = async ()=>{
    try {

       await provider.disconnect();
      
      setConnected(false);
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
  } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
  }
  }
  // useEffect(() => {
  //   const provider = getProvider();
  //   // Store user's public key once they connect
    
  //  provider.on("connect", (publicKey) => {
  //    setPubKey(publicKey);
  //  });
 
  //  // Forget user's public key once they disconnect
  //  provider.on("disconnect", () => {
  //    setPubKey(null);
  //  });
  //  }, [provider])

  // const disconnectWallet = async () => {
  //   try {
  //     await disconnect();
  //     console.log('Wallet disconnected successfully!');
  //     // Update UI to reflect disconnected state
  //   } catch (error) {
  //     console.error('Error disconnecting wallet:', error);
  //     // Optional: Handle errors gracefully
  //   }
  // };
  useEffect(() => {
    if (connected) {
      setConnectings(false)
      console.log("connected")
      
      // setInitialized(true)
    }
    console.log(user.name)
  }, [connected])

  
  return (
   <>
   
   <section className='nav min-h-full bg-black '>
    <nav className='bg-blue-500'>
      <div className='logo text-4xl font-extrabold bg-gradient-to-r from-[#aa367c]  to-[#4a2fbd] w-fit text-transparent bg-clip-text'>Excolo</div>
      <div>
      {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2 capitalize underlinepink">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                   
                    initUser()
                    console.log("init")
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : 
          (!connected && (
            <Button
              onClick={connectWallet}
              loading={connecting}
              disabled={connecting} // Disable button while connecting
            >
              {connecting ? 'Connecting...' : 'Connect with Phantom'}
            </Button>
          ))
          }
      </div>
      <div className="flex items-center">
  <button onClick={() => disconnectWallet()}>Disconnect Wallet</button>
</div>
    </nav>
   </section>
   






    <div>
        <img src="" alt="blog-pic" />
    </div>
    <article>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt vitae, reiciendis iste esse laudantium a voluptate quis perferendis? Porro eligendi, exercitationem iure magni laboriosam quo doloremque vero dignissimos quod culpa.</article>
    
    <div >
{posts.map((item)=>{
  return(
    <article className='post__card-2 bg-slate-500' onClick={()=>{navigate(`/read-post/${item.publickey.toString()}`)}} key={item.account.id}>
<div className='post__card-2'>
  {item.account.title}
  <div className='post__card-2__img'>
<img src="" alt="" />
  </div>
</div>
<div className='post__card__meta'>

  <div className='post__card__cat-2'>{item.account.date}</div>

  <p className='post__card__content-2'>
{item.account.content}
  </p>
</div>
    </article>
  )
})}

    </div>
    {showModal &&<div >

      <div className='="modal-content'>
        <span className='modal-content text-blue-800' onClick={()=>setShowModal(false)}>X</span>
<PostForm
postTitle={postTitle}
postContent = {postContent}
postGenre = {postGenre}
setPostGenre ={setPostGenre}
postDate = {postDate}
setPostDate = {setPostDate}
setPostTitle={setPostTitle}
setPostContent={setPostContent}
onSubmit={()=>createPost(postTitle, postContent, postDate, postGenre)}
/>
      </div>
    </div>}
    </>


  )
}
export default Dashboard