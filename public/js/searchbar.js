class SearchBar extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
        <form className="search-bar row">
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
