// Component for accepting user information
class CredentialsForm extends React.Component {
  // Initialize the credentials form
  constructor(props) {
    super(props)
    // Bind the custom functions
    this.doSubmit = this.doSubmit.bind(this)
    this.doCancel = this.doCancel.bind(this)
  }

  // Function for handling the form cancel
  doCancel(event) {
    event.target.form.reset()
  }

  // Function for handling the form submit
  doSubmit(event) {
    event.preventDefault();
    let creds = {
      username: this.refs.user.value,
      password: this.refs.pass.value
    }
    event.target.reset()
    this.props.onSubmit(creds)
  }

  // Render this component
  render() {
    return (
      <form onSubmit={this.doSubmit}>
        <div className="row login-title">
          <div className="col-12 text-center">
            <h2>Log In</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label for="user">Username:</label>
          </div>
          <div className="col-8">
            <input type="text" id="user" ref="user"/>
          </div>
        </div>
        <div className="row login-buttons">
          <div className="col-4">
            <label for="user">Password:</label>
          </div>
          <div className="col-8">
            <input type="password" id="pass" ref="pass"/>
          </div>
        </div>
        <div className="row login-buttons">
          <div className="col-6">
            <input className="btn btn-primary" type="submit" value={this.props.signin ? "Log In" : "Sign Up"}/>
          </div>
          <div className="col-6">
            <button className="btn btn-secondary" type="button" onClick={this.doCancel}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }
}
