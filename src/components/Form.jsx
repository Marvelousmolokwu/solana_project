import {  useState } from "react";
import { Button } from "./Button";
import { useBlog } from "../Context/blog"; 

export const PostForm = (props) => {
  const { user } = useBlog();
  const {
    onSubmit,
    postTitle,
    postContent,
    setPostContent,
    postDate,
    setPostDate,
    postGenre,
    setPostGenre,
    setPostTitle,
    formHeader,
    buttonText = "Post",
  } = props;
  const [loading, setLoading] = useState(false);

  

  return (
    <section className=" ">

       <div className="rounded-lg py-4 px-6 bg- flex flex-col bg-black backdrop-blur-sm w-[40%] bg-bg-up-color bg-no-repeat bg-cover ">

      <form action="" className="flex flex-col gap-4 m-5">
      {formHeader}
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="Post title"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <input type="text" value={postGenre} onChange={(e)=> setPostGenre(e.target.value)} placeholder="Genre"   className="bg-white rounded-3xl h-10 px-4 black" />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        name="content"
        id="content-area"
        rows={3}
        placeholder="Describe your post..."
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></textarea>
       <input
        value={postDate}
        onChange={(e) => setPostDate(e.target.value)}
        type="date"
        placeholder="date"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <Button
        className="mt-3"
        disabled={!user}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </Button>
      </form>
      
    </div>
    </section>
   
  );
};