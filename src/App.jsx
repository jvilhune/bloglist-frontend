import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Errnotification from './components/Errnotification'
import Oknotification from './components/Oknotification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'


const refresh = () => {
  window.localStorage.clear()
  window.location.reload(true)
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')

	setOkMessage(
          `New blog '${returnedBlog.title}' was succesfully added to the bloglist`
        )
        setTimeout(() => {
          setOkMessage(null)
        }, 5000)
      })

      .catch(error => {
        setErrorMessage(
          //`New blog '${returnedBlog.title}' cannot add to the bloglist`
          `error : ${error.response.data.error} ${error.message}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setOkMessage(
        `User '${user.username}' was succesfully login`
        )
        setTimeout(() => {
          setOkMessage(null)
        }, 5000)

      } catch (exception) {
      setErrorMessage('login failed, wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br/>author:&nbsp;
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br/>url:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br/>likes:&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        value={newLikes}
        onChange={handleLikesChange}
      />
      <br/>
      <button type="submit">create</button>
    </form>  
  )

  const handledeleteClick = (blogid) => {
    const blog = blogs.find(n => n.id === blogid)

    if (window.confirm(`Delete ${blog.title}?`) === true) {
      blogService
      .delItem(blog.id)
          .then(returnedlBlog => {
          setBlogs(blogs.filter(n => n.id !== blogid))
          console.log('blogid', blogid)
          //timeout(1000)

          setOkMessage(
            `Blog '${blog.title}' was succesfully removed from the server`
          )
          setTimeout(() => {
            setOkMessage(null)
          }, 5000)

        })
        .catch(error => {
          setErrorMessage(
            `error : ${error.response.data.error} ${error.message}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          //setBlogs(blogs.filter(n => n.id !== blogid))
       })
    }
  }

  return (
    <div>

      <Errnotification message={errorMessage} />
      <Oknotification message={okMessage} />

      {!user && loginForm()} 
      {user && <div>
        <p>
        {user.name} logged in&nbsp;
        <button onClick={refresh}>logout</button>
        </p>

        <h3>Create New</h3>

          {blogForm()}
        </div>
      }

      <h3>blogs</h3>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} butfunction = {handledeleteClick} />
      )}
      </div>
      <Footer />
    </div>
  )
}

export default App