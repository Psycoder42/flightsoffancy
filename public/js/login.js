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
      <form onSubmit={this.doSubmit} >
        <label for="user">Username:</label>
        <input type="text" id="user" ref="user"/>
        <label for="user">Password:</label>
        <input type="password" id="pass" ref="pass"/>
        <button type="button" onClick={this.doCancel}>Cancel</button>
        <input type="submit" value={this.props.signin ? "Log In" : "Sign Up"}/>
      </form>
    )
  }
}
