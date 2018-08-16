class PageControls extends React.Component {
  constructor(props) {
    super(props)
    this.jumpToPage = this.jumpToPage.bind(this)
    this.changeResultCount = this.changeResultCount.bind(this)
  }

  jumpToPage(event) {
    event.preventDefault()
    if (this.refs.pageNum.value != this.props.curPage) {
      this.props.navigateToPage(this.refs.pageNum.value)
    }
  }

  changeResultCount(event) {
    event.preventDefault()
    if (event.target.value != this.props.resultsPerPage) {
      this.props.changeResultsPerPage(event.target.value)
    }
  }

  render() {
    return (
      <div className="row paginate-results d-flex align-items-center">
        <div className="col-1 p-0 text-right">
          <label for="pageNum">Page: </label>
        </div>
        <div className="col-1">
          <input type="number" name="pageNum" ref="pageNum" min="1" defaultValue={this.props.curPage}/>
        </div>
        <div className="col-1 p-0">
          <button type="button" className="btn btn-primary page-btn" onClick={this.jumpToPage}>Go</button>
        </div>
        <div className="col-2 offset-6 text-right">
          <p className="views-label">Results Per Page:</p>
        </div>
        <div className="col-1">
          <select name="views" value={this.props.resultsPerPage} onChange={this.changeResultCount}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    )
  }
}


class FlightSearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.saveToUser = this.saveToUser.bind(this)
    this.removeSavedFlight = this.removeSavedFlight.bind(this)
  }

  saveToUser(value) {
    let data = {
      user_id: this.props.curUser.user_id,
      ref_type: 'flight',
      ref_key: value
    }
    this.props.submitToUser(data)
  }

  removeSavedFlight(value) {
    value = encodeURI(value)
    this.props.removeFromSavedFlights(value)
  }

  render() {
    return (
      <div className="container result-list">
        {
          this.props.curUserSaved ?
          ''
          :
          <PageControls
            curPage={this.props.curPage}
            resultCount={this.props.resultsCount}
            navigateToPage={this.props.navigateToPage}
            changeResultsPerPage={this.props.changeResultsPerPage}
          />
        }

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
        {
          this.props.searchResults.length > 0 ?
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
                {
                  this.props.curUser?
                  <div className="col-12 text-right p-0 user-tab">
                    {
                      this.props.curUserSaved ?
                      <button onClick={()=>{this.removeSavedFlight(result.route_id)}} class="btn btn-remove">Remove Flight</button>
                      :
                      <button onClick={()=>{this.saveToUser(result.route_id)}} class="btn btn-save">Save Flight</button>
                    }
                  </div>
                  :
                  ''
                }
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
    this.saveToUser = this.saveToUser.bind(this)
    this.removeSavedAirport = this.removeSavedAirport.bind(this)
  }

  saveToUser(value) {
    let data = {
      user_id: this.props.curUser.user_id,
      ref_type: 'airport',
      ref_key: value
    }
    this.props.submitToUser(data)
  }

  removeSavedAirport(value) {
    value = encodeURI(value)
    this.props.removeFromSavedAirports(value)
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
            {
              this.props.curUser?
              <div className="col-12 text-right p-0 user-tab">
                {
                  this.props.curUserSaved ?
                  <button onClick={()=>{this.removeSavedAirport(result.airport_id)}} class="btn btn-remove">Remove Airport</button>
                  :
                  <button onClick={()=>{this.saveToUser(result.airport_id)}} class="btn btn-save">Save Airport</button>
                }
              </div>
              :
              ''
            }
          </div>
        )
      })
    }
    // Render the results
    return (
      <div className="container result-list">
        {
          this.props.curUserSaved ?
          ''
          :
          <PageControls
            curPage={this.props.curPage}
            resultCount={this.props.resultsCount}
            navigateToPage={this.props.navigateToPage}
            changeResultsPerPage={this.props.changeResultsPerPage}
          />
        }
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
