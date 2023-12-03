import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'
import {response} from 'msw'

class Course extends Component {
  state = {status: 'INITIAL', course: []}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({status: 'LOADING'})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/te/courses/${id}`

    const rawData = await fetch(api)
    if (rawData.ok) {
      const courseDetails = await rawData.json()
      const course = courseDetails.course_details
      console.log(course)

      this.setState({course, status: 'SUCCESS'})
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
      <button type="button" onClick={this.getCourse()}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {course} = this.state
    return (
      <div>
        <img src={course.image_url} alt="course" />
        <h1>{course.name}</h1>
        <p>{course.description}</p>
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

export default Course
