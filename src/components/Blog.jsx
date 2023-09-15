// JSX
// space -> &nbsp;
// line break -> <br/>
// division of a section (line break) -> <div></div>
// paragraph break (single empty line fefore and after) -> <p></p>
// {/* This is a comment in JSX */}
// <!-- This is a comment in HTML -->
// This is a comment in javascript
/* This is a comment in javascript */

const Blog = ({ blog, viewvals, blogview, butfunction, butfunction2, butfunction3, update }) => {

  /* blogview and update are extra parameters, not used here but maybe in the future ... */
  let blogid = blog.id
  const viewObject = viewvals.find(n => n.blog_id === blogid)
  const label = viewObject.view
    ? 'hide' : 'view'

  console.log('FROM BLOG.JSX')
  console.log('update', update)
  console.log('FROM BLOG.JSX')

  if(viewObject.view === true) {
    return (
    //<p className='blog'>
    <div>
      <p>
      {blog.title}&nbsp;
      <button onClick={() => butfunction2(blogid)}>{label}</button>
      <br/>
      {blog.author}
      <br/>
      <a href={blog.url}>{blog.url}</a>
      <br/>
      {blog.likes}&nbsp;
      <button onClick={butfunction3}>{'likes'}</button>
      <br/>
      {blog.user.name}
      <br/>
      <button onClick={() => butfunction(blogid)}>delete</button>
      </p>
    </div>
    )
  }
  else if(viewObject.view === false) {
    return (
    //<p className='blog'>

    <div>
      <p>
      {blog.title}&nbsp;
      <button onClick={() => butfunction2(blogid)}>{label}</button>
      <br/>
      <button onClick={() => butfunction(blogid)}>delete</button>
      </p>
    </div>
    )
  }
}
export default Blog
