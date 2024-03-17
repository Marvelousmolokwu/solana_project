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
  setPostDate( new Date().toLocaleDateString())
  

  return (
    <div className="rounded-lg py-4 px-6 bg- flex flex-col ">
      {formHeader}
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        type="text"
        placeholder="Post title"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <input type="text" value={postGenre} onChange={(e)=> setPostGenre(e.target.value)} placeholder="Genre" />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        name="content"
        id="content-area"
        rows={3}
        placeholder="Describe your post..."
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></textarea>
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
    </div>
  );
};