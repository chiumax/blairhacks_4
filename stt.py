import speech_recognition as sr
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json
import math
import speech_recognition as sr
import youtube_dl
import ffmpeg
import subprocess
import os

def tts(link,PHRASE):
    if(link!="notalink"):
        try:
            os.remove('audio.mp3')
            os.remove('audio.wav')
        except:
            pass
        ydl_opts = {
            'fixup': 'detect_or_warn',
            'extractaudio' : True,      # only keep the audio
            'audioformat' : "mp3",
            'outtmpl': 'C:/Users/frenc/Documents/Hackathons/BlairHacks2019/audio.mp3',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'prefer_ffmpeg': True,  
            'format': 'bestaudio/best',  
            'output' : "C:/Users/frenc/Documents/Hackathons/BlairHacks2019/",  
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link])

        subprocess.call(['ffmpeg', '-i', 'audio.mp3', 'audio.wav'])

    authenticator = IAMAuthenticator('zyfxQXtG2Ud8dgI5DFncedpyOisZw8srm5tDt1JWyTF1')
    speech_to_text = SpeechToTextV1(
       authenticator=authenticator
    )
    speech_to_text.set_service_url('https://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/6aa6ac8c-41b5-46fe-b6ab-30ebd53cc8cf')

    r = sr.Recognizer()

    with open('audio.wav', 'rb') as audio_file:
        speech_recognition_results = speech_to_text.recognize(
            audio=audio_file,
            content_type='audio/wav',
            timestamps=True,
        ).get_result()

    d = speech_recognition_results
    phrase=PHRASE.split()
    trans=''
    times=[]
    timeret=[]
    for part in d['results']:
        want=part['alternatives']
        times+=want[0]['timestamps']
        trans+=want[0]['transcript']
    print(times)
    for i in range(len(times)-len(phrase)+1):   
        j=0
        good=True
        for p in phrase:
            word=times[i+j][0]
            j+=1
            if(not p in word):
                break
            if(j==len(phrase)):
               timeret.append(math.floor(times[i][1]))
    return timeret



