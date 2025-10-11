import React from 'react'
import data from './data.json'

const PostList = () => {
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>{post.date}</small>
        </div>
      ))}
    </div>
  )
}

export default PostList