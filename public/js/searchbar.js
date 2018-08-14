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
    // console.log(query);
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
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="airline_name">Airline:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="airline_name"  ref="airline_name"
                placeholder="Airline Name"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="airline_country">Airline Country:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="airline_country"  ref="airline_country"
                placeholder="Airline Country"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="source_airport_region">From Region:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="source_airport_region"  ref="source_airport_region"
                placeholder="Origin Airport Region"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="dest_airport_region">To Region:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="dest_airport_region"  ref="dest_airport_region"
                placeholder="Destination Airport Region"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="source_airport_country">From Country:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="source_airport_country"  ref="source_airport_country"
                placeholder="Origin Airport Country"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="dest_airport_country">To Country:</label>
              </div>
              <div className="col-4 p-2">
                <input type="text" className="search-input" id="dest_airport_country"  ref="dest_airport_country"
                placeholder="Destination Airport Country"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="source_airport_id">From Airport ID:</label>
              </div>
              <div className="col-1 p-2">
                <input type="text" className="search-input" id="source_airport_id"  ref="source_airport_id"
                placeholder="ID"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="source_iata_code">From IATA:</label>
              </div>
              <div className="col-1 p-2">
                <input type="text" className="search-input" id="source_ata_code"  ref="source_iata_code"
                placeholder="IATA"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="dest_airport_id">To Airport ID:</label>
              </div>
              <div className="col-1 p-2">
                <input type="text" className="search-input" id="dest_airport_id"  ref="dest_airport_id"
                placeholder="ID"
                />
              </div>
              <div className="col-2 p-2 d-flex align-items-center">
                <label for="dest_iata_code">To IATA:</label>
              </div>
              <div className="col-1 p-2">
                <input type="text" className="search-input" id="dest_ata_code"  ref="dest_iata_code"
                placeholder="IATA"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
