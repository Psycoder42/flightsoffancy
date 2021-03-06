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
      curUserSaved: false,
      resultsPerPage: 5,
      curPage: 1
    }
    // Bind the custom functions
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.rerunQuery = this.rerunQuery.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.flightSearch = this.flightSearch.bind(this)
    this.submitToUser = this.submitToUser.bind(this)
    this.airportSearch = this.airportSearch.bind(this)
    this.navigateToPage = this.navigateToPage.bind(this)
    this.toggleCredForm = this.toggleCredForm.bind(this)
    this.showSavedFlight = this.showSavedFlight.bind(this)
    this.showSavedAirport = this.showSavedAirport.bind(this)
    this.getCorrectPageState = this.getCorrectPageState.bind(this)
    this.changeResultsPerPage = this.changeResultsPerPage.bind(this)
    this.removeFromSavedFlights = this.removeFromSavedFlights.bind(this)
    this.removeFromSavedAirports = this.removeFromSavedAirports.bind(this)
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
      if (this.state.curUserSaved) {
        this.showSavedFlight(stateChanges)
      } else {
        this.flightSearch(this.state.lastQuery, stateChanges)
      }
    } else if (this.state.activeTab == "airports") {
      if (this.state.curUserSaved) {
        this.showSavedAirport(stateChanges)
      } else {
        this.airportSearch(this.state.lastQuery, stateChanges)
      }
    }
  }

  navigateToPage(value) {
    let newValue = Math.max(1, value)
    let stateChanges = { curPage: newValue }
    this.rerunQuery(stateChanges)
  }

  changeResultsPerPage(value) {
    let stateChanges = { resultsPerPage: value }
    this.rerunQuery(stateChanges)
  }

  submitToUser(data) {
    fetch(`/users/${this.state.curUser.username}/saved`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(savedSearch => {
    }).catch(error => console.log(error))
  }

  getCorrectPageState(stateChanges) {
    let rerunSearch = !!stateChanges
    let stateUpdates = stateChanges || {}
    let curPage = 1
    let resultsPerPage = this.state.resultsPerPage
    if (rerunSearch) {
      // This is a rerun search because some controls were changed
      // Make sure to use the updated (pending) values when doing the search
      // But default to the existing state values if they aren't provided
      curPage = stateUpdates.curPage || this.state.curPage
      resultsPerPage = stateUpdates.resultsPerPage || resultsPerPage
    }
    // At this point the local variables are the ones we want to store them
    stateUpdates.curPage = curPage
    stateUpdates.resultsPerPage = resultsPerPage
    // Return the object with the correct state
    return stateUpdates
  }

  // Function for handling airport search query
  airportSearch(query, stateUpdates) {
    // Make sure we have the correct page state
    stateUpdates = this.getCorrectPageState(stateUpdates)
    // Run the search
    fetch(`/places/search?r=${stateUpdates.resultsPerPage}&p=${stateUpdates.curPage}${query}`)
      .then(res => res.json()).then(searchResults => {
        stateUpdates.lastQuery = query
        stateUpdates.searchResults = searchResults
        stateUpdates.curUserSaved = false
        this.setState(stateUpdates)
        window.scrollTo({top: (window.innerHeight - 75), behavior: 'smooth'});
      })
  }

  // Function for handling flights search query
  flightSearch(query, stateUpdates) {
    // Make sure we have the correct page state
    stateUpdates = this.getCorrectPageState(stateUpdates)
    // Run the search
    fetch(`/flights/search?r=${stateUpdates.resultsPerPage}&p=${stateUpdates.curPage}${query}`)
      .then(res => res.json()).then(searchResults => {
        stateUpdates.lastQuery = query
        stateUpdates.searchResults = searchResults
        stateUpdates.curUserSaved = false
        this.setState(stateUpdates)
        window.scrollTo({top: (window.innerHeight - 75), behavior: 'smooth'});
      })
  }

  // Function for handling saved flights search query
  showSavedFlight(stateUpdates) {
    // Make sure we have the correct page state
    stateUpdates = this.getCorrectPageState(stateUpdates)
    // Run the search
    fetch(`/flights/search/saved/${this.state.curUser.username}?r=${stateUpdates.resultsPerPage}&p=${stateUpdates.curPage}`)
      .then(res => res.json()).then(savedResults => {
        stateUpdates.searchResults = savedResults
        stateUpdates.activeTab = 'flights'
        stateUpdates.curUserSaved = true
        this.setState(stateUpdates)
        window.scrollTo({top: (window.innerHeight - 75), behavior: 'smooth'});
      })
  }

  // Function for handling saved airport search query
  showSavedAirport(stateUpdates) {
    // Make sure we have the correct page state
    stateUpdates = this.getCorrectPageState(stateUpdates)
    // Run the search
    fetch(`/places/search/saved/${this.state.curUser.username}?r=${stateUpdates.resultsPerPage}&p=${stateUpdates.curPage}`)
      .then(res => res.json()).then(savedResults => {
        stateUpdates.searchResults = savedResults
        stateUpdates.activeTab = 'airports'
        stateUpdates.curUserSaved = true
        this.setState(stateUpdates)
        window.scrollTo({top: (window.innerHeight - 75), behavior: 'smooth'});
      })
  }

  removeFromSavedFlights(data) {
    fetch(`/users/${this.state.curUser.username}/saved`, {
      body: JSON.stringify(data),
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.showSavedFlight()
      }).catch(error => console.log(error))
  }

  removeFromSavedAirports(data) {
    fetch(`/users/${this.state.curUser.username}/saved`, {
      body: JSON.stringify(data),
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.showSavedAirport()
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

  // Function to switch which search tab is open
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
          curPage={this.state.curPage}
          curUser={this.state.curUser}
          curUserSaved={this.state.curUserSaved}
          searchResults={this.state.searchResults}
          resultsPerPage={this.state.resultsPerPage}
          submitToUser={this.submitToUser}
          navigateToPage={this.navigateToPage}
          changeResultsPerPage={this.changeResultsPerPage}
          removeFromSaved={this.removeFromSavedFlights}
        />
      } else if (this.state.activeTab == "airports") {
        searchResults = <AirportSearchResults
          curPage={this.state.curPage}
          curUser={this.state.curUser}
          curUserSaved={this.state.curUserSaved}
          searchResults={this.state.searchResults}
          resultsPerPage={this.state.resultsPerPage}
          submitToUser={this.submitToUser}
          navigateToPage={this.navigateToPage}
          changeResultsPerPage={this.changeResultsPerPage}
          removeFromSaved={this.removeFromSavedAirports}
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
            showSavedFlight={this.showSavedFlight}
            showSavedAirport={this.showSavedAirport}
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
