import './App.css'
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      getMessage: '',
      postMessage: '',
      inputValue: '',

    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000/api/hello')
      const data = await response.json()
      this.setState({ getMessage: data.message })
    } catch (error) {
      console.error('Error fetching GET /api/hello:', error)
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: this.state.inputValue }),
      })
      const data = await response.json()
      this.setState({ postMessage: data.message })
    } catch (error) {
      console.error('Error fetching POST /api/world:', error)
    }
  }

  render() {
    return (
      <>
        <h1>{this.state.getMessage}</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
          <h2>{this.state.postMessage}</h2>
      </>
    )
  }
}

export default App
