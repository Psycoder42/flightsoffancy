// This component handles the main search tabs and their click actions
class SearchTabs extends React.Component {
  constructor(props) {
    super(props)
    this.switchTab = this.switchTab.bind(this)
  }

  // A tab was clicked so we want to switch to it
  switchTab(newTab) {
    this.props.switched(newTab)
  }

  render() {
    return (
      <div className="row tabs">
        <div
          className={"tab-item" + (this.props.activeTab=="flights"? " active" : "")}
          onClick={()=>{this.switchTab("flights")}}
        >
          <span>Flights</span>
        </div>
        <div
          className={"tab-item" + (this.props.activeTab=="airports"? " active" : "")}
          onClick={()=>{this.switchTab("airports")}}
        >
          <span>Airports</span>
        </div>
        <div className="flex-grow-1">
        </div>
      </div>
    )
  }
}

// This is a reusable advanced airport search component. By passing it a heading,
// labelPrexix, and idPrefix, it can be use for standalone airports as well as for
// the source and destination parts of the flights search
class AdvancedAirportOpts extends React.Component {
  render() {
    let heading = null
    if (this.props.heading) {
      heading = <legend className="adv-search">{this.props.heading}</legend>
    }
    return (
      <fieldset>
        {heading}
        <div className="row m-0">
          <label className="sr-only" for={this.props.idPrefix + "airport_region"}>
            {this.props.labelPrefix} Airport Region
          </label>
          <div className="p-2 flex-grow-1">
            <input type="text" className="search-input"
              id={this.props.idPrefix + "airport_region"}
              placeholder={this.props.labelPrefix + " Airport Region"}
            />
          </div>
        </div>
        <div className="row m-0">
          <label className="sr-only" for={this.props.idPrefix + "airport_country"}>
            {this.props.labelPrefix} Airport Country
          </label>
          <div className="p-2 flex-grow-1">
            <input type="text" className="search-input"
              id={this.props.idPrefix + "airport_country"}
              placeholder={this.props.labelPrefix + " Airport Country"}
            />
          </div>
        </div>
        <div className="row m-0">
          <label className="sr-only" for={this.props.idPrefix + "airport_id"}>
            {this.props.labelPrefix} Airport ID
          </label>
          <div className="p-2 flex-grow-1">
            <input type="text" className="search-input"
              id={this.props.idPrefix + "airport_id"}
              placeholder={this.props.labelPrefix + " Airport ID"}
            />
          </div>
          <label className="sr-only" for={this.props.idPrefix + "iata_code"}>
            {this.props.labelPrefix} Airport IATA Code
          </label>
          <div className="p-2 flex-grow-1">
            <input type="text" className="search-input"
              id={this.props.idPrefix + "iata_code"}
              placeholder={this.props.labelPrefix + " Airport IATA Code"}
            />
          </div>
        </div>
      </fieldset>
    )
  }
}
