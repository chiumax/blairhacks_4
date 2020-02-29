import React, { Component } from "react";
import YouTube from "react-youtube";

import Description from "./Description";

class Content extends Component {
  state = {
    searchDisplay: false,
    fileDisplay: false,
    messageDisplay: false,
    link: "",
    message: "",
    image: "",
    vidId: false,
    imgSub: false
  };

  onToggleMessage = () => {
    if (this.state.messageDisplay) {
      //
    }

    this.setState(prevState => ({
      messageDisplay: !prevState.messageDisplay
    }));
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

  onToggleUpload = () => {
    if (this.state.fileDisplay) {
      this.setState(prevState => ({
        vidId: false,
        imgSub: true
      }));
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
    }));
  };

  handleChangeFile = event => {
    event.persist();
    console.log(event);
    console.log(event.target.files[0]);
    this.setState(prevState => ({
      image: event.target.files[0],
      vidId: false
    }));
  };

  youtube_parser = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    console.log(match && match[7].length == 11 ? match[7] : false);
    this.setState({
      vidId: match && match[7].length == 11 ? match[7] : false,
      imgSub: false
    });
  };

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  render() {
    return (
      <>
        <div className="mainApp">
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
                    this.handleChangeLink(e);
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
              <div
                className={this.state.fileDisplay ? "search open" : "search"}
              >
                <input
                  type="file"
                  accept=".png, .jpg"
                  onChange={e => {
                    this.onImageChange(e);
                  }}
                ></input>
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
            <>
              <div className="imageWrapper">
                <YouTube videoId={this.state.vidId}></YouTube>
              </div>
              <div className="linkSubmitWrapper">
                <div>Image Upload</div>
                <div
                  className={
                    this.state.messageDisplay ? "search open" : "search"
                  }
                >
                  <input
                    type="text"
                    className="search-box"
                    value={this.state.message}
                    onChange={e => {
                      this.handleChangeMessage(e);
                    }}
                    placeholder="Search Message..."
                  ></input>
                  <span
                    className="search-button"
                    onClick={() => this.onToggleMessage()}
                  >
                    <span className="search-icon"></span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
          {!!this.state.imgSub ? (
            <>
              <div className="imageWrapper">
                <img id="target" src={this.state.image}></img>
              </div>
              <div className="linkSubmitWrapper">
                <div>Image Upload</div>
                <div
                  className={
                    this.state.messageDisplay ? "search open" : "search"
                  }
                >
                  <input
                    type="text"
                    className="search-box"
                    value={this.state.message}
                    onChange={e => {
                      this.handleChangeMessage(e);
                    }}
                    placeholder="Search Message..."
                  ></input>
                  <span
                    className="search-button"
                    onClick={() => this.onToggleMessage()}
                  >
                    <span className="search-icon"></span>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <Description />
      </>
    );
  }
}

export default Content;
