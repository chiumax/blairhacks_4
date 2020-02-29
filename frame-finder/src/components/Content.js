import React, { Component } from "react";
import YouTube from "react-youtube";

class Content extends Component {
  state = {
    searchDisplay: false,
    link: "",
    vidId: false
  };

  onToggleSearch = () => {
    console.log(this.state.link);
    if (this.state.searchDisplay) {
      this.youtube_parser(this.state.link);
    }
    this.setState(prevState => ({
      searchDisplay: !prevState.searchDisplay
    }));
  };

  handleChange = event => {
    console.log(event);
    this.setState(prevState => ({
      link: event.value
    }));
  };

  youtube_parser = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    console.log(match && match[7].length == 11 ? match[7] : false);
    this.setState({
      vidId: match && match[7].length == 11 ? match[7] : false
    });
  };

  render() {
    return (
      <>
        <div className="linkSubmitWrapper">
          <div>label</div>
          <div className={this.state.searchDisplay ? "search open" : "search"}>
            <input
              type="text"
              className="search-box"
              value={this.state.link}
              onChange={e => {
                this.handleChange(e);
              }}
              placeholder="youtube link..."
            />
            <span
              className="search-button"
              onClick={() => this.onToggleSearch()}
            >
              <span className="search-icon"></span>
            </span>
          </div>
        </div>
        {!!this.state.vidId ? (
          <YouTube videoId={this.vidId} />
        ) : (
          <div>novid</div>
        )}
      </>
    );
  }
}

export default Content;
{
  /* <>
<div className="linkSubmitWrapper">
  <div>label</div>
  <div className={this.state.searchDisplay ? "search open" : "search"}>
    <input
      type="search"
      className="search-box"
      value={this.state.link}
      placeholder="youtube link..."
    />
    <span
      className="search-button"
      onClick={() => this.onToggleSearch()}
    >
      <span className="search-icon"></span>
    </span>
  </div>
</div>
<YouTube videoId="1dJT-99KpiI" />
</> */
}
