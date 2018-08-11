class Navigation extends React.Component {
  // Initialize the navigation component
  constructor(props) {
    super(props)
    // Bind the custom functions
    this.doLogin = this.doLogin.bind(this)
    this.doRegister = this.doRegister.bind(this)
  }

  // Function for handling the user clicking the Sign In link
  doLogin() {
    // Passing true maked is a log in box
    this.props.toggleCredForm(true)
  }

  // Function for handling the user clicking the Register link
  doRegister() {
    // Passing a false makes it a registration box
    this.props.toggleCredForm(false)
  }

  render() {
    // Default register link
    let registerLink = <span className="login text-link" onClick={this.doRegister}>
      Register
    </span>
    // Default sign in link
    let loginLink = <span className="login text-link" onClick={this.doLogin}>
      Sign In
    </span>
    // Change the links if a user is signed in
    if (this.props.curUser) {
      // Register link disappears
      registerLink = null
      // Sign in becomes sign out
      loginLink = <span className="login text-link" onClick={this.props.logout}>
        Sign Out
      </span>
    }
    // Render the navigation
    return (
      <div className="navigation row">
        <div className="col">
          <h1>Flights of Fancy</h1>
        </div>
        <div className="col spacer"></div>
        <div className="col text-right">
          {registerLink}
          {loginLink}
        </div>
      </div>
    )
  }
}
