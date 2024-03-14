import React from 'react'

const FullPost =() => {
  return (
    <article className="hentry background-color">
      <div className="featured-image">
        <img
          src="https://images.unsplash.com/photo-1531096187418-86ac6b31baea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9d6cd4e7c48dfc78f5e9c0fb07b692f0&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>
      <h1 className="entry-title">{post?.title}</h1>
      <div className="entry-meta">
        <p>
          <span className="author">
            Written by <a href="#">Lavi Perchik</a>
          </span>{" "}
          <span className="date">Monday, July 9, 2018</span>
        </p>
      </div>
      <div className="entry-content">
        <p>{post?.content}</p>
      </div>
    </article>
  );
}
export default FullPost