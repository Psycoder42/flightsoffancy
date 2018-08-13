class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
  }
  submitSearch(event) {
    event.preventDefault();
    let query = '%25' + this.refs.search.value + '%25'
    this.props.search(query)
    event.target.reset()
  }

  render() {
    return (
        <form className="search-bar row" onSubmit={this.submitSearch}>
          <div className="p-2 text-right">
            <label for="search">Find an Airport:</label>
          </div>
          <div className="p-2 flex-grow-1">
            <input type="text" id="search" ref="search" />
          </div>
          <div className="p-2">
            <input type="submit" value="Search"/>
          </div>
        </form>
    )
  }
}
