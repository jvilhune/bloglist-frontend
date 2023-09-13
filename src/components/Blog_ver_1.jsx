// JSX
// space -> &nbsp;
// line break -> <br/>
// division of a section (line break) -> <div></div>
// paragraph break (single empty line fefore and after) -> <p></p>

const Blog = ({ blog, butfunction }) => {
  let blogid = blog.id
  return (
    //<p className='blog'>
    <div>
      {blog.title}, {blog.author}, {blog.url}, {blog.likes} &nbsp;
      <button onClick={() => butfunction(blogid)}>delete</button>
    </div>
    //</p>
  )
}

export default Blog
