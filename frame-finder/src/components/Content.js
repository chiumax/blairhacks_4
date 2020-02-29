import React, { Component } from "react";
//import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import axios from "axios";

import Description from "./Description";

class Content extends Component {
  state = {
    searchDisplay: false,
    fileDisplay: false,
    messageDisplay: false,
    link: "",
    message: "",
    image: false,
    vidId: false,
    imgSub: false,
    imageFile: false,
    outputImage: false,
    outputTime: false
  };

  componentDidMount = () => {
    console.log("mounted!");
  };
  onToggleMessage = () => {
    if (this.state.messageDisplay && this.state.message.length > 0) {
      if (this.state.imgSub) {
        this.requestImage();
      } else if (this.state.vidId) {
        this.requestYoutube();
      }
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
      searchDisplay: !prevState.searchDisplay,
      fileDisplay: false
    }));
  };

  onToggleUpload = () => {
    if (this.state.fileDisplay && this.state.image) {
      console.log(this.state.image);
      console.log(this.state.imageFile);
      this.setState(prevState => ({
        vidId: false,
        imgSub: true
      }));
    }
    this.setState(prevState => ({
      fileDisplay: !prevState.fileDisplay,
      searchDisplay: false
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
    this.setState(
      {
        vidId: match && match[7].length == 11 ? match[7] : false,
        imgSub: false
      },
      () => {
        //player.playVideo();
        console.log(this.state.link);
      }
    );
  };

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        console.log(reader.result.substring(0, reader.result.indexOf(",")));
        this.setState({
          imageFile: reader.result.substring(reader.result.indexOf(","))
        });
      };

      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  requestYoutube = () => {
    console.log("request sent");
    axios
      .post("http://127.0.0.1:5000/ptt", {
        link: this.state.link,
        phrase: this.state.message,
        headers: {
          "X-Content-Type-Options": "application/x-www-form-urlencoded"
        }
      })
      .then(response => {
        console.log("request over");
        const data = response.data;

        console.log(data.data);
        this.setState({ outputTime: data.data });
      });
  };

  requestImage = () => {
    console.log("request image");
    axios
      .post("http://127.0.0.1:5000/stt", {
        picture: this.state.imageFile,
        phrase: this.state.message,
        headers: {
          "X-Content-Type-Options": "application/x-www-form-urlencoded"
        }
      })
      .then(response => {
        console.log("request over");
        const data = response.data;
        console.log(data);
        //outputImage
        this.setState({
          image: `data:image/png;base64,${data}`
        });
      });
  };

  ref = player => {
    this.player = player;
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
                <ReactPlayer
                  url={this.state.link}
                  ref={this.ref}
                  controls
                  width="1280px"
                  height="720px"
                ></ReactPlayer>
                {/* <YouTube videoId={this.state.vidId}></YouTube> */}
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
                <img
                  id="target"
                  class="imagePreview"
                  src={this.state.image}
                ></img>
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
        {!!this.state.outputImage ? (
          <div className="imageWrapper">
            <img
              id="target"
              class="imagePreview"
              src={this.state.outputImage}
            ></img>
          </div>
        ) : (
          <div></div>
        )}
        <Description />
      </>
    );
  }
}

export default Content;
//opts={{ playerVars: { autoplay: 1 } }}
