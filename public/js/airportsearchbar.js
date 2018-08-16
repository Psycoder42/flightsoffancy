class AirportSearchBar extends React.Component {
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
    let inputs = event.target.querySelectorAll('input[type="text"]')
    for (let i=0; i < inputs.length; ++i) {
      if (inputs[i].value.trim() !== '') {
        query += `&${inputs[i].id}=%${inputs[i].value}%`
      }
    }
    query = encodeURI(query)
    event.target.reset()
    this.props.search(query)
  }

  expandForm() {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <div>
        <form className="form-horizontal search-bar" onSubmit={this.submitSearch}>
          <div className="row">
            <label className="sr-only" for="airport_name"> Airport:</label>
            <div className="p-2 flex-grow-1">
              <input type="text" className="search-input" id="airport_name"
                placeholder="Airport Name"
              />
            </div>
            <div className="p-2">
              <input className="btn btn-primary btn-search" type="submit" value="Search"/>
            </div>
          </div>
          <div className="row">
            <div className="flex-grow-1"></div>
            <div className="p-2 adv-search">
              <p onClick={this.expandForm}>
                {this.state.visible ? "Hide Advanced Options" : "Show Advanced Options"}
              </p>
            </div>
          </div>
          <div className={"extended-fields "+(this.state.visible ? "" : "hidden")}>
            <AdvancedAirportOpts heading={null} labelPrefix='' idPrefix=''/>
          </div>
        </form>
      </div>
    )
  }
}
