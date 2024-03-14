import React, { useEffect, useState, useHistory } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import {useBlog} from '../../Context/blog'

const Dashboard = () =>{
  const navigate = useNavigate()
  const [connectings, setConnectings] = useState(false)
  // const {connected, select} = useWallet()
  const { connect, select, connecting, connected } = useWallet();
  const [initialized, setInitialized] = useState(false);
  const {user} = useBlog()

  const posts =[];
  const createPosts =() =>{

  }
  const showModal = false
  const setShowModal = ()=>{

  }
  // const onConnect = ()=>{
  //   setConnectings(true)
  //   select(PhantomWalletName)
  // }
  const onConnect = async () => {
    try {
      // Connect with Phantom wallet
      await select(PhantomWalletName);
      console.log("md")
    } catch (error) {
      console.error('Failed to connect with Phantom wallet:', error);
    }
  };
  useEffect(() => {
    if (connected) {
      setConnectings(false)
      setInitialized(true)
    }
  }, [connected])
  return (
   <>
   
   <div>
    <p>name</p>
    <img src="" alt="name-pic" />
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
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : (
            // <Button
            //   loading={connectings}
            //   className="w-28"
            //   onClick={onConnect}
            //   leftIcon={
            //     <svg
            //       xmlns="http://www.w3.org/2000/svg"
            //       className="h-5 w-5 mr-1"
            //       fill="none"
            //       viewBox="0 0 24 24"
            //       stroke="currentColor"
            //     >
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            //       />
            //     </svg>
            //   }
            // >
            //   Connect
            // </Button>
            <Button
          loading={connecting}
          onClick={onConnect}
          disabled={connecting} // Disable button when connecting
        >
          {connecting ? 'Connecting...' : 'Connect with Phantom'}
        </Button>
          )}
    </div>
    <div>
        <img src="" alt="blog-pic" />
    </div>
    <article>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt vitae, reiciendis iste esse laudantium a voluptate quis perferendis? Porro eligendi, exercitationem iure magni laboriosam quo doloremque vero dignissimos quod culpa.</article>
    
    <div >
{posts.map((item)=>{
  return(
    <article className='post__card-2' onClick={()=>{navigate(`/read-post/${item.publickey.toString()}`)}} key={item.account.id}>
<div className='post__card-2'>
  <div className='post__card-2__img'>
<img src="" alt="" />
  </div>
</div>
<div className='post__card__meta'>

  <div className='post__card__cat-2'>2nd dec 2020</div>
  <p className='post__card__content-2'>
{item.account.content}
  </p>
</div>
    </article>
  )
})}

    </div>
    <div className={`modal ${showModal && 'show-modal'}`}>

      <div className='="modal-content'>
        <span className='modal-content' onClick={()=>setShowModal(false)}>X</span>
{/* <PostForm
postTitle={postTitle}
postContent = {postContent}
setPostTitle={setPostTitle}
setPostContent={setPostContent}
onSubmit={()=>createPost(postTitle)}
/> */}
      </div>
    </div>
    </>


  )
}
export default Dashboard