import React, { Component } from "react";
import YouTube from "react-youtube";

class Content extends Component {
  state = {
    searchDisplay: false,
    fileDisplay: false,
    messageDisplay:false,
    link: "",
    vidId: false,
    message:""
  };

  onToggleMessage = () => {
    if (this.state.messageDisplay) {
      //
    }

    this.setState(prevState=> ({
      messageDisplay: !prevState.messageDisplay

    }))
  }

  onToggleSearch = () => {
    console.log(this.state.link);
    if (this.state.searchDisplay) {
      this.youtube_parser(this.state.link);
    }
    this.setState(prevState => ({
      searchDisplay: !prevState.searchDisplay
    }));
  };

  onToggleUpload = () => {
    if (this.state.fileDisplay) {
      //
    }
    this.setState(prevState => ({
      fileDisplay: !prevState.fileDisplay
    }));
  };

  handleChangeLink = event => {
    event.persist();
    console.log(event);
    this.setState(prevState => ({
      link: event.target.value
    }));
  };

  handleChangeMessage = event => {
    event.persist();
    console.log(event);
    this.setState(prevState => ({
      message: event.target.value
    }))
  }

  handleChangeFile = event => {
    //
  }

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
        <div className=" mainInput">
          <div className="linkSubmitWrapper">
            <div>Youtube Link</div>

            <div
              className={this.state.searchDisplay ? "search open" : "search"}
            >
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
          <div className="linkSubmitWrapper">
            <div>Image Upload</div>
            <div className={this.state.fileDisplay ? "search open" : "search"}>
              <input type="file" accept=".png, .jpg"></input>
              <span
                className="search-button"
                onClick={() => this.onToggleUpload()}
              >
                <span className="search-icon"></span>
              </span>
            </div>
          </div>
        </div>
        {!!this.state.vidId ? (
          <div>
            <YouTube videoId={this.state.vidId}></YouTube>
          </div>
          <div className="linkSubmitWrapper">
          <div>Image Upload</div>
          <div className={this.state.messageDisplay ? "search open" : "search"}>
            <input                 type="text"
                className="search-box"
                value={this.state.link}
                onChange={e => {
                  this.handleChange(e);
                }}
                placeholder="youtube link..."></input>
            <span
              className="search-button"
              onClick={() => this.onToggleMessage()}
            >
              <span className="search-icon"></span>
            </span>
          </div>
        </div>
        ) : (
          <div>novid</div>
        )}

      </>
    );
  }
}

export default Content;
