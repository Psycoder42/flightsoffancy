class FlightSearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.submitPaginate = this.submitPaginate.bind(this)
  }

  submitPaginate(event) {
    this.props.changePaginate(event.target.value)
  }

  render() {
    return (
      <div className="container result-list">
        <div className="row paginate-results d-flex align-items-center">
          <div className="col-2 offset-9 text-right">
            <p className="views-label">Results Per Page:</p>
          </div>
          <div className="col-1">
            <select name="views" onChange={this.submitPaginate}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="row result-title d-flex align-items-center">
          <div className="col-2">
            <p>Airline</p>
          </div>
          <div className="col-3">
            <p>Origin Airport</p>
          </div>
          <div className="col-1">
            <p>ID</p>
          </div>
          <div className="col-1">
            <p>IATA</p>
          </div>
          <div className="col-3">
            <p>Destination Airport</p>
          </div>
          <div className="col-1">
            <p>ID</p>
          </div>
          <div className="col-1">
            <p>IATA</p>
          </div>
        </div>
        {this.props.searchResults.length > 0 ?
          this.props.searchResults.map((result, index) => {
            return (
              <div className="row single-result">
                <div className="col-2">
                  {result.airline_name}<br />
                  ({result.airline_country})
                </div>
                <div className="col-3">
                  {result.source_airport_name} <br /> ({result.source_airport_country})
                </div>
                <div className="col-1">
                  {result.source_airport_id}
                </div>
                <div className="col-1">
                  {result.source_iata_code}
                </div>
                <div className="col-3">
                  {result.dest_airport_name} <br /> ({result.dest_airport_country})
                </div>
                <div className="col-1">
                  {result.dest_airport_id}
                </div>
                <div className="col-1">
                  {result.dest_iata_code}
                </div>
              </div>
            )
          })
          :
          <p>No Results found</p>
        }
      </div>
    )
  }
}

class AirportSearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.submitPaginate = this.submitPaginate.bind(this)
  }

  submitPaginate(event) {
    this.props.changePaginate(event.target.value)
  }

  render() {
    let resultList = <p>No Results found</p>
    if (this.props.searchResults.length > 0) {
      resultList = this.props.searchResults.map((result, index) => {
        return (
          <div className="row single-result">
            <div className="col-7">
              {result.airport_name}
            </div>
            <div className="col-3">
              {result.airport_country}
            </div>
            <div className="col-1">
              {result.airport_id}
            </div>
            <div className="col-1">
              {result.iata_code}
            </div>
          </div>
        )
      })
    }
    // Render the results
    return (
      <div className="container result-list">
        <div className="row paginate-results d-flex align-items-center">
          <div className="col-2 offset-9 text-right">
            <p className="views-label">Results Per Page:</p>
          </div>
          <div className="col-1">
            <select name="views" onChange={this.submitPaginate}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="row result-title d-flex align-items-center">
          <div className="col-7">
            <p>Airport</p>
          </div>
            <div className="col-3">
              <p>Country</p>
            </div>
          <div className="col-1">
            <p>ID</p>
          </div>
          <div className="col-1">
            <p>IATA</p>
          </div>
        </div>
        {resultList}
      </div>
    )
  }
}
