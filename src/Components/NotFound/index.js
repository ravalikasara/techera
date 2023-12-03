import './index.css'

const NotFound = props => {
  const notFoundRedirect = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        type="button"
        onClick={notFoundRedirect}
        className="not-found-button"
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
