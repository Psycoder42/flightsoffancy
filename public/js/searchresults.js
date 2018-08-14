class SearchResults extends React.Component {
  render() {
    return (
      <div className="container result-list">
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
