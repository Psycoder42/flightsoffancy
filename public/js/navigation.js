class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation row">
        <div className="col-3">
          <h1>Flights of Fancy</h1>
        </div>
        <div className="col-3 offset-6 text-right">
          <a className="login" href="/">Log In</a>
        </div>
      </div>
    )
  }
}
