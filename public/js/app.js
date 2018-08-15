// Main app component
class App extends React.Component {
  // Initialize the main app
  constructor(props) {
    super(props)
    // Default state
    this.state = {
      curUser: null,
      showCredForm: false,
      credFormIsSignIn: true,
      searchResults: null,
      activeTab: "flights",
      lastQuery: null,
      paginateVal: 5,
      curPage: 1
    }
    // Bind the custom functions
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.rerunQuery = this.rerunQuery.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.flightSearch = this.flightSearch.bind(this)
    this.airportSearch = this.airportSearch.bind(this)
    this.toggleCredForm = this.toggleCredForm.bind(this)
    this.changePaginate = this.changePaginate.bind(this)
    this.navigateToPage = this.navigateToPage.bind(this)
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

  rerunQuery(stateChanges) {
    if (this.state.activeTab == "flights") {
      this.flightSearch(this.state.lastQuery, stateChanges)
    } else if (this.state.activeTab == "airports") {
      this.airportSearch(this.state.lastQuery, stateChanges)
    }
  }

  navigateToPage(value) {
    let newValue = Math.max(1, value)
    let stateChanges = { curPage: newValue }
    if (this.state.lastQuery !== null) {
      // Delegate the state change to the query
      this.rerunQuery(stateChanges)
    } else {
      // Change it immediately
      this.setState(stateChanges)
    }
  }

  changePaginate(value) {
    let stateChanges = { paginateVal: value }
    if (this.state.lastQuery !== null) {
      // Delegate the state change to the query
      this.rerunQuery(stateChanges)
    } else {
      // Change it immediately
      this.setState(stateChanges)
    }
  }

  // Function for handling airport search query
  airportSearch(query, stateChanges) {
    let stateUpdates = stateChanges || {}
    // Make sure to use the updated (pending) values when doing the search
    // But default to the existing state values if they aren't provided
    let page = stateUpdates.curPage || this.state.curPage
    let resultCount = stateUpdates.paginateVal || this.state.paginateVal
    // Run the search
    fetch(`/places/search?r=${resultCount}&p=${page}${query}`)
      .then(res => res.json()).then(searchResults => {
        stateUpdates.lastQuery = query
        stateUpdates.searchResults = searchResults
        this.setState(stateUpdates)
      })
  }

  // Function for handling flights search query
  flightSearch(query, stateChanges) {
    let stateUpdates = stateChanges || {}
    // Make sure to use the updated (pending) values when doing the search
    // But default to the existing state values if they aren't provided
    let page = stateUpdates.curPage || this.state.curPage
    let resultCount = stateUpdates.paginateVal || this.state.paginateVal
    // Run the search
    fetch(`/flights/search?r=${resultCount}&p=${page}${query}`)
      .then(res => res.json()).then(searchResults => {
        stateUpdates.lastQuery = query
        stateUpdates.searchResults = searchResults
        this.setState(stateUpdates)
      })
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

  // Function to show/hide the credentials form
  onTabChange(newTab) {
    this.setState({
      searchResults: null,
      activeTab: newTab
    })
  }

  // Render this component
  render() {
    // Default to show the flights search
    let searchbox = <FlightSearchBar search={this.flightSearch}/>
    // Swhich to a different search if appropriate
    if (this.state.activeTab == "airports") {
      searchbox = <AirportSearchBar search={this.airportSearch}/>
    }
    // Default the search results to null
    let searchResults = null
    if (this.state.searchResults) {
      if (this.state.activeTab == "flights") {
        searchResults = <FlightSearchResults
          searchResults={this.state.searchResults}
          paginateVal={this.state.paginateVal}
          changePaginate={this.changePaginate}
        />
      } else if (this.state.activeTab == "airports") {
        searchResults = <AirportSearchResults
          searchResults={this.state.searchResults}
          paginateVal={this.state.paginateVal}
          changePaginate={this.changePaginate}
        />
      }
    }
    return (
      <main>
        <div className="header container-fluid">
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
            <div className="row">
              <h1 className="welcome-title">Welcome{this.state.curUser ? ` ${this.state.curUser.username}` : ''}!</h1>
            </div>
            <div className="search-area">
              <SearchTabs switched={this.onTabChange} activeTab={this.state.activeTab}/>
              {searchbox}
            </div>
          </div>
        </div>
        <div className="results container-fluid">
          {searchResults}
        </div>
      </main>
    )
  }
}

// Render the main app into the index page
ReactDOM.render(
  <App/>,
  document.querySelector('body')
)
