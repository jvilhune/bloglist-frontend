import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Errnotification from './components/Errnotification'
import Oknotification from './components/Oknotification'
import Footer from './components/Footer'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'


const refresh = () => {
  window.localStorage.clear()
  window.location.reload(true)
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    console.log('blogObject', blogObject)
    blogFormRef.current.toggleVisibility()  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogForm = () => (
  <Togglable buttonLabel="new blog" ref={blogFormRef} >
    <BlogForm createBlog={addBlog} />
  </Togglable>
  )

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