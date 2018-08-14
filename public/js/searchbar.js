class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
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

  }

  render() {
    return (
      <div>
        <div className="row tabs">
          <div className="tab-item active">
            <span>Routes</span>
          </div>
          <div className="tab-item">
            <span>Airports</span>
          </div>
          <div className="flex-grow-1">
          </div>
        </div>
        <form className="search-bar row" onSubmit={this.submitSearch}>
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
          <div className="extended-input">
            
          </div>
          <div className="p-2">
            <input className="btn btn-primary btn-search" type="submit" value="Search"/>
          </div>
        </form>
        <div className="row text-left">
          <div className="flex-grow-1">
          </div>
          <div className="adv-search">
            <p onClick={this.expandForm}>Advanced Search</p>
          </div>
        </div>
      </div>
    )
  }
}
