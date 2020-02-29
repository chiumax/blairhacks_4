from flask import Flask, render_template, send_from_directory, request, jsonify
import image
import spech 
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/ptt", methods=['POST'])
def ptt():
    if(request.method == "POST"):
        result = request.json
        #same video different word use notalink
        link = result['link']
        phrase = result['phrase']
        print(link)
        print(phrase)
        return {"data":spech.tts(link,phrase)}



@app.route("/stt", methods=['POST'])
def stt():
    if(request.method == "POST"):
        result = request.json

        b64 = result['picture']
        phrase = result['phrase']

        returnval = image.findTextInImage(b64, phrase)
        print (returnval)
        return returnval


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
