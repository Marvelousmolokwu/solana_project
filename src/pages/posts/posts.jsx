import { useParams } from "react-router-dom";
import { useBlog } from "../../Context/blog"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Posts = ()=>{
    const { genreprop } = useParams()
const navigate = useNavigate()
    const {posts} = useBlog()
    const filteredPosts = posts.filter(post =>
        genreprop === "others" || post.account.genre === genreprop.toLowerCase()
      );
    
return(
    <>
    <section className="bg-black overflow-x-hidden min-h-screen text-purple-300">
    <div className='logo text-3xl absolute top-5 left-10 font-extrabold bg-gradient-to-r from-pink-500  to-purple-300 w-fit text-transparent bg-clip-text'>Excolo</div>
        <div className="container flex flex-col  ">
            <div className=" flex justify-center my-10">
                <div className="border-2 border-purple-300 rounded-2xl w-[50%] bg-black text-purple-300 hover:outline">
                <input type="search" placeholder="search" className="bg-transparent outline-none p-2 w-full"/>
                </div>
                
                

            </div>
            
          {filteredPosts.map(item =>(
           
                    <article className="border-t border-purple-300  flex items-center gap-10" key={item.account.id} onClick={navigate(`/fullpost/`)}>
                    <div className='w-[30%] h-40 rounded-lg py-2' >
                    <img src="https://res.cloudinary.com/ddgyd8szc/image/upload/v1710732669/james-fitzgerald-Xv3xUBpHvOU-unsplash_ylqyfd.jpg" alt="" className='h-full w-full rounded-lg' />
                    </div>
                   <div className="w-1/2">
                   <h2 className='font-semibold'>
                    {item.account.title}
                  </h2>
                  
                  
                  <p className='truncate mt-2'>{item.account.content}</p>
                  <div className="flex gap-2 font-light  items-center">
                  <p className="text-sm"> LastUpdated: {item.account.date}</p>
                  <div className='flex gap-2 items-center  '>
                  <div className='h-2 w-2 rounded-full bg-pink-500'></div>
                    <p className='font-light text-sm '>{item.account.genre}</p>
                  
                  </div>
                  </div>
                  
                   </div>
                  
                  </article>
          ))}
  

        </div>
    </section>
    
    </>
)


}
export default Posts