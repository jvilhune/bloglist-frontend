const BlogForm = ({ onSubmit, handleTitleChange, newTitle, handleAuthorChange, newAuthor, handleUrlChange, newUrl, handleLikesChange, newLikes }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newTitle} onChange={handleTitleChange}/>
        <br/>
        author:&nbsp;
        <input value={newAuthor} onChange={handleAuthorChange}/>
        <br/>
        url:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newUrl} onChange={handleUrlChange}/>
        <br/>
        likes:&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newLikes} onChange={handleLikesChange}/>
        <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
