// JSX
// space -> &nbsp;
// line break -> <br/>
// division of a section (line break) -> <div></div>
// paragraph break (single empty line fefore and after) -> <p></p>
// {/* This is a comment in JSX */}
// <!-- This is a comment in HTML -->
// This is a comment in javascript
/* This is a comment in javascript */

import '../index.css'

const SubFunc = ( {username, blogusername, subaction, butfunction, value3} ) => {

  /*
  console.log('username', username)
  console.log('blogusername', blogusername)
  console.log('subaction', subaction)
  */

  if(username === blogusername) {
    return (
      <button onClick={() => butfunction(value3)}>delete</button>
    )
  }
  return (
    <></>
  )
}


const Blog = ({ blog, username, viewvals, blogview, loggedin, butfunction, butfunction2, butfunction3, update }) => {

  /* blogview and update are extra parameters, not used here but maybe in the future ... */
  let blogid = blog.id
  const viewObject = viewvals.find(n => n.blog_id === blogid)
  const label = viewObject.view
    ? 'hide' : 'view'
  /*
  console.log('FROM BLOG.JSX')
  console.log('update', update)
  console.log('FROM BLOG.JSX')
  */

  if(viewObject.view === true) {
    return (
    //<p className='blog'>
    <div>
    <p className='blog'>
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
      <SubFunc username={username} blogusername={blog.user.username} subaction={loggedin} butfunction={butfunction} value3={blogid} />
      </p>
    <p><br/></p>
    </div>
    )
  }
  else if(viewObject.view === false) {
    return (
    //<p className='blog'>
    <div>
    <p className='blog'>
      {blog.title}&nbsp;
      <button onClick={() => butfunction2(blogid)}>{label}</button>
      <br/>
      <SubFunc username={username} blogusername={blog.user.username} subaction={loggedin} value3={blogid} />
      </p>
    <p><br/></p>
    </div>
    )
  }
}

export default Blog