from flask import Flask, render_template, send_from_directory, request, jsonify
import image
import spech


app = Flask(__name__)


@app.route("/ptt", methods=['POST'])
def ptt():
    if(request.method == "POST"):
        result = request.json

        link = result['link']
        phrase = result['phrase']

        return spech.stt(link,phrase)        



@app.route("/stt", methods=['POST'])
def stt():
    if(request.method == "POST"):
        result = request.json

        b64 = result['picture']
        phrase = result['phrase']
        return image.findTextInImage(b64,phrase)


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
