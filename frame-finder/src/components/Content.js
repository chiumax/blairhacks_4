import React, { Component } from "react";

class Content extends Component {
  state = {
    searchDisplay: false
  };

  onToggleSearch = () => {
    this.setState(prevState => ({
      searchDisplay: !prevState.searchDisplay
    }));
  };

  render() {
    return (
      <>
        <div className="linkSubmitWrapper">
          <div>label</div>
          <div class={this.state.searchDisplay ? "search open" : "search"}>
            <input type="search" class="search-box" />
            <span class="search-button" onClick={() => this.onToggleSearch()}>
              <span class="search-icon"></span>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Content;
