import React, { Component } from "react";
//import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import axios from "axios";

import Description from "./Description";
import Loading from "./Loading";

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
    outputTime: [],
    genTimeTable: "",
    loading: false
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
    this.setState({
      loading: true
    });
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
        this.setState({ outputTime: data.data, loading: false }, () => {
          this.genTimeStamps();
        });
      });
  };

  requestImage = () => {
    console.log("request image");
    this.setState({
      loading: true
    });
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
          image: `data:image/png;base64,${data}`,
          loading: false
        });
      });
  };

  genTimeStamps = () => {
    let i = 0;
    let temp = [
      <div className="noWrap smallMargin">
        Timestamps where "{this.state.message}" was heard.
      </div>
    ];
    for (i = 0; i < this.state.outputTime.length; i++) {
      let curr = this.state.outputTime[i];
      temp.push(
        <div className="button">
          <a
            href="javascript:;"
            onClick={() => {
              this.jumpTo(curr);
            }}
          >
            {curr} Seconds
          </a>
        </div>
      );
      console.log(temp);
    }
    console.log(temp);
    // this.setState({
    //   genTimeTable: temp
    // });
    return temp;
  };

  jumpTo = time => {
    console.log(time);
    this.player.seekTo(time, "seconds");
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
              <div className="noWrap">Youtube Link</div>

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
              <div className="noWrap">Image Upload</div>
              <div
                className={
                  this.state.fileDisplay
                    ? "search open center"
                    : "center search"
                }
              >
                <label
                  for="file-upload"
                  className={
                    this.state.fileDisplay
                      ? "custom-file-upload"
                      : "custom-file-upload opacity"
                  }
                >
                  <i class="fa fa-cloud-upload"></i> Upload File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  type="file"
                  accept=".png, .jpg"
                  onChange={e => {
                    this.onImageChange(e);
                  }}
                />
                {/* <input
                  type="file"
                  accept=".png, .jpg"
                  onChange={e => {
                    this.onImageChange(e);
                  }}
                ></input> */}
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
              {!!this.state.loading ? <Loading /> : <div></div>}
              <div className="linkSubmitWrapper">
                <div className="noWrap">Text to look for</div>
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
              {!!this.state.loading ? <Loading /> : <div></div>}
              <div className="linkSubmitWrapper">
                <div class="noWrap">Text to look for</div>
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
        <div className="timeStampWrapper">
          {this.state.outputTime.length > 0 && !!this.state.vidId
            ? this.genTimeStamps()
            : ""}
        </div>

        <Description />
      </>
    );
  }
}

export default Content;
//opts={{ playerVars: { autoplay: 1 } }}
