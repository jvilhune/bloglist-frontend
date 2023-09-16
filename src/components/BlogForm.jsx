import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }


  return (
    <div>
      <form onSubmit={addBlog}>

        title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/>
        <br/>
        author:&nbsp;
        <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/>
        <br/>
        url:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/>
        <br/>
        likes:&nbsp;&nbsp;&nbsp;&nbsp;
        <input value={newLikes} onChange={event => setNewLikes(event.target.value)}/>
        <br/>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
