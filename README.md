# blairhacks_4

Blairhacks_4 was a 24 hour hackathon hostetd at Montgomery Blair High School. During that time, we (4 guys in total) built **SP**eech **IM**age Text (SPIM TEXT). It basically takes a youtube video link, processes the video, and creates a searchable video for speech. Control + F for videos. It also is able to take an image of text and uses OCR to process the text on the video

## Screenshots/Gif

![gif](https://github.com/dumblole/blairhacks_4/blob/master/images/output2.gif)
![screenshot](https://github.com/dumblole/blairhacks_4/blob/master/images/gallery%20(1).jpg)
![screenshot](https://github.com/dumblole/blairhacks_4/blob/master/images/gallery%20(2).jpg)
![screenshot](https://github.com/dumblole/blairhacks_4/blob/master/images/gallery%20(3).jpg)
![screenshot](https://github.com/dumblole/blairhacks_4/blob/master/images/gallery.jpg)


> The below text is taken from our devpost submission: https://devpost.com/software/spimtext

## Inspiration

Our world history teacher requires us to watch hour long videos and expects us to find specific words in the videos and give the time stamp of the word in the video to prove we watched it. Sometimes we forget where a word was located in the video after watching it and have to spend a long time finding it. So to solve this problem, we decided to make a web app that would automatically locate where words were located in youtube videos. We also decided that it would be a useful feature to be able to look for words in pictures as well.

## What it does

It is a JavaScript and ReactJS web app that uses Machine Learning to let users to find location of word/phrases in images and videos. When given a youtube link and a phrase/word it will find all the locations of that phrase/word and return the timestamp for it as well as allow you to click a hyperlink to it. When given an image file and a phrase/word it will return the image with a box created around all locations of the phrase/word making it easily identifiable.

## How we built it

Both the image and video processing are based on Artificial Intelligence. Through using python machine learning models we look for words in the images and words in the audio of the video and then look through them to find what is getting looked for. Both machine learning models have been well developed and are highly accurate. For images, boxes highlight the words or phrases that are getting looked for, and for a video, a timestamp is returned for the location of the first word in a phrase. The algorithm used to find the words in the images and videos were made specifically to increase efficiency while still being accurate in finding the right words.

## Challenges we ran into

One of the challenges we ran into was implementing the python APIs. There were many problems with our computers not properly downloading the libraries. After a lot of troubleshooting we were able to properly download them. We also had an issue where videos a long time to process due to the slow internet, but this should not be a problem if it is accessed on a faster connection.

## Accomplishments that we are proud of

We are proud of achieving the intended functionality with a practical efficiency with a well fitting interface as a website. The plan and vision we had of the program at the start of the hackathon was successfully realized, and its usability even exceeded our expectations.

## What we learned

We learned how to use and implement machine learning apis with python and then integrate them with a website.

## What's next for SPIMTEXT

The functionality to allow for videos from nearly any site instead of just a youtube is there, just not enabled because of time constraints, so we would like to properly enable it. Another function we would like to add is to allow for the frames of a video to be searched and analyzed for text instead of being limited to just the audio.
