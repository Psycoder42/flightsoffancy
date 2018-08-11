// Main app component
class App extends React.Component {
  // Initialize the main app
  constructor(props) {
    super(props)
    // Default state
    this.state = {
      curUser: null,
      showCredForm: false,
      credFormIsSignIn: true
    }
    // Bind the custom functions
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.toggleCredForm = this.toggleCredForm.bind(this)
  }

  // Function for handling a new user registration
  register(creds) {
    // Send the credentials to the server to see if they are valid
    fetch('/users', {
      body: JSON.stringify(creds),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(loggedInUser => {
      // Make sure the state is updated to reflect the log in
      this.setState({ curUser: loggedInUser })
      this.toggleCredForm()
    }).catch(error => console.log(error))
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
      this.toggleCredForm()
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

  // Function to show/hide the credentials form
  toggleCredForm(isSignIn=this.state.credFormIsSignIn) {
    this.setState({
      credFormIsSignIn: isSignIn,
      showCredForm: !this.state.showCredForm
    })
  }

  // Render this component
  render() {
    return (
      <div className="container-fluid">
        <Navigation
          curUser={this.state.curUser}
          logout={this.logout}
          toggleCredForm={this.toggleCredForm}
        />
        <CredentialsForm
          signin={this.state.credFormIsSignIn}
          visible={this.state.showCredForm}
          onSubmit={this.state.credFormIsSignIn ? this.login : this.register}
          onCancel={this.toggleCredForm}
        />
        <div className="container search">
          <h1>Welcome{this.state.curUser ? ` ${this.state.curUser.username}` : ''}!</h1>
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
