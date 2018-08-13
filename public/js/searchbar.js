class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
  }
  submitSearch(event) {
    event.preventDefault();
    let query = this.refs.search.value
    this.props.search(query)
  }

  render() {
    return (
        <form className="search-bar row" onSubmit={this.submitSearch}>
          <div className="p-2 text-right">
            <label for="search">Search:</label>
          </div>
          <div className="p-2 flex-grow-1">
            <input type="text" id="search" ref="search" />
          </div>
        </form>
    )
  }
}
