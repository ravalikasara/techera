import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {status: 'INITIAL', courseList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: 'LOADING'})

    const api = 'https://apis.ccbp.in/te/courses'

    const rawData = await fetch(api)
    if (rawData.ok) {
      const {courses} = await rawData.json()
      const courseList = courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({courseList, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We can't seems to find the page you are looking for.</p>
      <button type="button" onClick={this.getData()}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {courseList} = this.state
    return (
      <div>
        <h1 className="title">Courses</h1>
        <ul className="courses-list">
          {courseList.map(each => (
            <Link to={`courses/${each.id}`}>
              <li key={each.id} className="course">
                <img src={each.logoUrl} alt={each.name} className="logoUrl" />

                <p>{each.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {status} = this.state

    return (
      <>
        <Header />
        <div className="bg-container">
          {(() => {
            switch (status) {
              case 'LOADING':
                return this.renderLoading()
              case 'SUCCESS':
                return this.renderSuccess()
              case 'FAILURE':
                return this.renderFailure()
              default:
                return null
            }
          })()}
        </div>
      </>
    )
  }
}

export default Home
