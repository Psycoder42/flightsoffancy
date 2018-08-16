class Navigation extends React.Component {
  // Initialize the navigation component
  constructor(props) {
    super(props)
    // Bind the custom functions
    this.doLogin = this.doLogin.bind(this)
    this.doRegister = this.doRegister.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      scrolled: false
    }
  }
  // change navigation background color on scroll
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 400) {
      this.setState({
        scrolled: true
      })
    } else {
      this.setState({
        scrolled: false
      })
    }
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

    let backgroundColor = (this.state.scrolled ? "nav-color" : "")

    let myFlights = ''

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
      myFlights = <span className="login text-link" onClick={this.props.showSavedFlight}>
        My Flights
      </span>
      registerLink = <span className="login text-link" onClick={this.props.showSavedAirport}>
        My Airports
      </span>
      // Sign in becomes sign out
      loginLink = <span className="login text-link" onClick={this.props.logout}>
        Sign Out
      </span>
    }
    // Render the navigation
    return (
      <div className={"navigation row "+backgroundColor}>
        <div className="col">
          <h1>Flights of Fancy</h1>
        </div>
        <div className="col spacer"></div>
        <div className="col text-right">
          {myFlights}
          {registerLink}
          {loginLink}
        </div>
      </div>
    )
  }
}
