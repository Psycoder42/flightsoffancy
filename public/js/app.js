// Main app component
class App extends React.Component {
  // Initialize the main app
  constructor(props) {
    super(props)
    // Default state
    this.state = {
      curUser: null
    }
    // Bind the custom functions
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  // Function for handling a user logging in
  login(creds) {
    // Send the credentials to the server to see if they are valid
    fetch('/sessions', {
      body: JSON.stringify(creds),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(loggedInUser => {
      // Make sure the state is updated to reflect the log in
      this.setState({ curUser: loggedInUser })
    }).catch(error => console.log(error))
  }

  // Function for handling a user logging out
  logout() {
    // Tell the server to end the session
    fetch('/sessions', { method: 'DELETE' })
      .then(res => {
        // Make sure the state is updated to reflect the log out
        this.setState({ curUser: null })
      }).catch(error => console.log(error))
  }

  // Render this component
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
        <div className="container search">
          <div className="row login-box">
              {
                this.props.curUser
                ?
                  <h3>
                    Hello {this.props.curUser.username}!
                    (<span className="text-link" onClick={this.logout}>sign out</span>)
                  </h3>
                :
                  <CredentialsForm signin={true} onSubmit={this.login}/>
              }
          </div>
        </div>
      </div>
    )
  }
}

// Render the main app into the index page
ReactDOM.render(
  <App/>,
  document.querySelector('body')
)
