import React, { useEffect, useState, useHistory } from 'react'
import { useWallet   } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import {useBlog} from '../../Context/blog'
import { PostForm } from '../../components/Form';
import { Link } from 'react-router-dom';
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
   <section className='relative'>
   <div className="nav h-screen bg-black bg-hero-img ">
    <div className="container">
    <nav className='flex justify-between items-center '>
      <div className='logo text-4xl font-extrabold bg-gradient-to-r from-pink-500  to-purple-300 w-fit text-transparent bg-clip-text'>Excolo</div>
      <div className='flex justify-between items-center' >
      {connected ? (
            <div className="flex items-center text-purple-300">
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
           <div className="flex items-center">
  {connected && <Button className='bg-gradient-to-r from-pink-500  to-purple-300 text-black hover:bg-black hover:text-white' onClick={() => disconnectWallet()}>Disconnect Wallet</Button>}
</div>
      </div>
     
    </nav>


    <section className='flex items-center justify-between mt-16'>
      <div className='flex items-end  gap-4'>
      <img
                src={user?.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full bg-purple-200 shadow ring-2 ring-purple-400 ring-offset-2 ring-opacity-50"
              />
              <div>
                <p className='text-gray-300 border-b border-gray-300 p-4 font-semibold' onClick={() => {
                    setShowModal(true)
                  }}>Hi {user.name} Type what your'e feeling</p>
              </div>
      </div>

      <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710700268/header-img_2_w6viae.svg" alt=""  className="w-96 animate-updown"/>
    </section>
    </div>
    
   </div>
   





{/* Estimation and information section */}
  <section className='h-screen  bg-black bg-bg-color bg-no-repeat bg-cover'>
<div className='container '>
<div className='border border-purple-300 bg-black rounded-lg h-[70%] z-40 -mt-20 text-purple-300   flex  justify-between items-center px-10 text-center'>
 <div className="flex-col justify-center items-center   ">
  <div className='flex justify-center'>
     <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710729820/icons8-circle-64_kpekmk.png" className='w-16 ' alt="Image " />
  </div>
 
 <h5 >Reader</h5>
 <p>10 Complete reads</p>
</div>
<div className="flex-col justify-center items-center">
   <div className='flex justify-center'>
  <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710730096/icons8-circle-64_1_wkbupl.png" alt="Image" className='w-16 ' />
 </div>
 <h5 >30 </h5>
 <p>Bookmarks</p>
</div>
<div className="flex-col justify-center items-center ">
   <div className='flex justify-center'>
  <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710730096/icons8-circle-50_zpadg2.png" alt="Image" className='w-16 ' />
 </div>
 <h5 >Connect </h5>
 <p>with Beautiful Writers <br/> all over the world</p>
</div>
<div className="flex-col justify-center items-center">
   <div className='flex justify-center'>
  <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710729820/icons8-circle-64_kpekmk.png" alt="Image" className='w-16 '/>
 </div>
 <h5 >10 </h5>
 <p>Exciting posts</p>
</div>
</div>
</div>

    </section >

    
    {/* Posts */}
     <section className='h-screen  bg-black bg-bg-up-color bg-no-repeat bg-cover text-purple-300'>
      <div className='container text-white text-center'>
      
        
      <div className='grid grid-cols-3 gap-6' >
        
          <button onClick={()=>navigate(`/posts/${"politcs"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
   <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent '>Politics & Finance</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710732669/pawel-czerwinski-cPxNce0o_Jk-unsplash_nuzv10.jpg" alt="" className='h-full w-full rounded-lg -z-10 ' />
</button>
<button onClick={()=>navigate(`/posts/${"technology"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
<div className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-30'>
  <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent '>Technology</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710748603/nasa-Q1p7bh3SHj8-unsplash_nwcyyv.jpg" alt="" className='h-full w-full rounded-lg' />
</div>
</button>
<button onClick={()=>navigate(`/posts/${"fantasy"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
<div className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-30'>
   <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent text-black '>Fantasy & Stories</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710732669/james-fitzgerald-Xv3xUBpHvOU-unsplash_ylqyfd.jpg" alt="" className='h-full w-full rounded-lg' />
</div>
</button>
<button onClick={()=>navigate(`/posts/${"Stocks"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
<div className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-30'>
   <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent '>Stocks & Cryptocurrencies</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710748613/pascal-bernardon-zt0HWquGXlQ-unsplash_krerhn.jpg" alt="" className='h-full w-full rounded-lg' />
</div></button>
<button onClick={()=>navigate(`/posts/${"entertainment"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
<div className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-30'>
     <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent '>Lifesyle & Entertainment</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710750844/gr-stocks-q8P8YoR6erg-unsplash_mvkw8l.jpg" alt="" className='h-full w-full rounded-lg' />

</div>
</button>
<button onClick={()=>navigate(`/posts/${"others"}`)} className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-300'>
<div className='w-full h-[14rem] rounded-lg  relative overflow-hidden hover:border hover:border-purple-30'>
   <h2 className='text-center pt-20 text-xl hover:text-2xl absolute w-full h-full bg-transparent text-black'>Others</h2>
    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710750805/ella-jardim-M0zs81FNm6s-unsplash_ecqdo1.jpg" alt="" className='h-full w-full rounded-lg' />

</div>
</button>
</div>
        



{/* {posts.map((item)=>{
  return(




  )
})} */}

    
      </div>
    

    </section>


    {/* Footer */}

    <section className='bg-black h-screen'>
      <div className='container'>
<div className='bg-white rounded-3xl h-[40%]  flex justify-between items-center p-20 -mt-24'>

  <h5 className='text-black w-1/2'>Subcribe to our Newsletters & and never miss latest updates</h5>

  <div className='border border-pink-500 p-1 flex justify-between rounded-lg'>
    <input type=" 
    " placeholder="Email Address" className='outline-none'/>
    <Button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[50%]'>Submit</Button>
  </div>
</div>
<div className='flex flex-col justify-center  gap-10 mt-20'>
    <div className='logo text-4xl font-extrabold bg-gradient-to-r from-pink-500  to-purple-300 w-fit text-transparent bg-clip-text'>Excolo</div>
<div className='text-purple-300 font-semibold flex justify-between items-center text-xl '>
  <ul className='flex flex-col gap-2'>
  <li><a href=""></a>X</li>
  <li><a href="">LinkedIn</a></li>
  <li><a href="">Instagram</a></li>
</ul>
<ul className='flex flex-col gap-2'>
  <li><a href="">+2348139574141</a></li>
  <li><a href="">Abuja, Nigeria</a></li>
  <li><a href="">help@excolo.com</a></li>
</ul>
<ul className='flex flex-col gap-2'>
  <li><a href="">About us</a></li>
  <li><a href="">FAQs</a></li>
  <li><a href="">Security</a></li>
</ul>
</div>

</div>
      </div>
    </section>
   
    {showModal && <div className='' >

      <div className="fixed top-[2%] w-full left-[25%] ">
      
        <span className='modal-content font-semibold cursor-pointer  text-purple-300 h-8 w-8 text-sm border border-purple-300 rounded-full px-2 py-1 z-20 ' onClick={()=>{
          console.log(showModal)
          setShowModal(false)}}>X</span>
      
      
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
    </section>
    </>


  )
}
export default Dashboard