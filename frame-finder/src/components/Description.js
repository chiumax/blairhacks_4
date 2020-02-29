import React from "react";
import Logo from "../img/logo.png";

function Description() {
  return (
    <>
      <div className="descWrapper">
        <img src={Logo} class="descLogo" />

        <div class="descSeparator"></div>
        <div class="descSection">
          <div class="descHeading">Rationale</div>
          <div class="descText">
            Our website allows you to search for words and phrases in images in
            videos the same way you can in a web page or document. This has many
            different use cases such as allowing you to look for key terms in
            pictures or videos while researching, or analyzing word frequency in
            pictures. Since it allows you to upload any png you could take
            pictures of your surroundings and analyze those as well.
          </div>
        </div>
        <div class="descSeparator"></div>
        <div class="descSection">
          <div class="descHeading">How it Works</div>
          <div class="descText">
            Both the image and video processing is based on machine learning.
            Through using machine learning models we look for words in the
            images and words in the audio of the video and then look through
            them to find what is getting looked for. Both machine learning
            models have been well developed and are highly accurate. For images,
            boxes are made for the words or phrases that are getting looked for,
            and for a video, a timestamp is returned for the location of the
            first word in a phrase. The algorithm used to find the words in the
            images and videos were made specifically to increase efficiency
            while still being accurate in finding the right words.
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
