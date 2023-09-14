// JSX
// space -> &nbsp;
// line break -> <br/>
// division of a section (line break) -> <div></div>
// paragraph break (single empty line fefore and after) -> <p></p>
// {/* This is a comment in JSX */}
// <!-- This is a comment in HTML -->
// This is a comment in javascript
/* This is a comment in javascript */

const Blog = ({ blog, butfunction }) => {
  let blogid = blog.id
  return (
    //<p className='blog'>
    <div>
      <p>
      {blog.title}
      <br/>
      {blog.author}
      <br/>
      <a href={blog.url}>{blog.url}</a>
      <br/>
      {blog.likes}
      <br/>
      <button onClick={() => butfunction(blogid)}>delete</button>
      </p>
    </div>
  )
}

export default Blog
