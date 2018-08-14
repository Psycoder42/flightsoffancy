class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
    this.expandForm = this.expandForm.bind(this)
    this.state = {
      visible: false
    }
  }
  submitSearch(event) {
    event.preventDefault();
    let query = ''
    for (let ref in this.refs) {
      if (query == '') {
        query = `${ref}=%${this.refs[ref].value}%`
      } else {
        if (this.refs[ref].value !== '') {
        query += `&${ref}=%${this.refs[ref].value}%`
        }
      }
    }
    query = encodeURI(query)
    this.props.search(query)
    console.log(query);
    event.target.reset()
  }

  expandForm() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    let visibility = (this.state.visible ? "" : "hidden")
    return (
      <div>
        <div className="row tabs">
          <div className="tab-item active">
            <span>Flights</span>
          </div>
          <div className="tab-item">
            <span>Airports</span>
          </div>
          <div className="flex-grow-1">
          </div>
        </div>
        <form className="search-bar" onSubmit={this.submitSearch}>
          <div className="row">
            <div className="p-2 text-right d-flex align-items-center">
              <label for="source_airport_name"> From:</label>
            </div>
            <div className="p-2 flex-grow-1">
              <input type="text" className="search-input" id="source_airport_name" ref="source_airport_name"
              placeholder="Origin Airport"
               />
            </div>
            <div className="p-2 text-right d-flex align-items-center">
              <label for="dest_airport_name">To:</label>
            </div>
            <div className="p-2 flex-grow-1">
              <input type="text" className="search-input" id="dest_airport_name"  ref="dest_airport_name"
              placeholder="Destination Airport"
              />
            </div>
            <div className="p-2">
              <input className="btn btn-primary btn-search" type="submit" value="Search"/>
            </div>
          </div>
          <div className="row">
            <div className="flex-grow-1">
            </div>
            <div className="p-2 adv-search">
              <p onClick={this.expandForm}>Expand Search Options</p>
            </div>
          </div>
          <div className={"extended-fields "+visibility}>
            <div className="row m-0">
              <div className="p-2 text-right d-flex align-items-center">
                <label for="airline_name">Airline:</label>
              </div>
              <div className="p-2 flex-grow-1">
                <input type="text" className="search-input" id="airline_name"  ref="airline_name"
                placeholder="Airline Name"
                />
              </div>
              <div className="p-2 text-right d-flex align-items-center">
                <label for="airline_name">Airline:</label>
              </div>
              <div className="p-2 flex-grow-1">
                <input type="text" className="search-input" id="airline_name"  ref="airline_name"
                placeholder="Airline Name"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
