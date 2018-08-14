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
    // Clear the form
    event.target.form.reset()
    // Perform the cancel
    this.props.onCancel()
  }

  // Function for handling the form submit
  doSubmit(event) {
    event.preventDefault();
    // Login only needs the user and password
    let creds = {
      username: this.refs.user.value,
      password: this.refs.pass.value
    }
    // Register also needs the confirm
    if (!this.props.signin) {
      creds.password_confirm = this.refs.pass_confirm.value
    }
    // Clear the form
    event.target.reset()
    // Process the submit
    this.props.onSubmit(creds)
  }

  // Render this component
  render() {
    // Whether or not the form is visible
    let visibility = (this.props.visible ? "visible" : "hidden")
    // There is no passwrod confirm on the login
    let passwordConfirm = null
    // But it is needed on the register
    if (!this.props.signin) {
      passwordConfirm = <div className="row login-gap">
        <div className="col-4">
          <label for="pass_confirm">Confirm:</label>
        </div>
        <div className="col-8">
          <input type="password" id="pass_confirm" ref="pass_confirm"
          placeholder="Repeat Password"
          />
        </div>
      </div>
    }
    // Render the form
    return (
      <div className={"login-box "+visibility}>
        <form onSubmit={this.doSubmit}>
          <div className="row">
            <div className="col-4">
              <label for="user">Username:</label>
            </div>
            <div className="col-8">
              <input type="text" id="user" ref="user"
              placeholder="Username"
              />
            </div>
          </div>
          <div className="row login-gap">
            <div className="col-4">
              <label for="pass">Password:</label>
            </div>
            <div className="col-8">
              <input type="password" id="pass" ref="pass"
              placeholder="Password"
              />
            </div>
          </div>
          {passwordConfirm}
          <div className="row login-buttons">
            <div className="col-6">
              <input className="btn btn-primary" type="submit" value={this.props.signin ? "Log In" : "Sign Up"}/>
            </div>
            <div className="col-6">
              <button className="btn btn-secondary" type="button" onClick={this.doCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
