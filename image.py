import pytesseract
from pytesseract import Output
import cv2
import base64


#   refer to an executable file
#   downloaded from https://stackoverflow.com/questions/46567157/pytesseract-image-to-string-returns-windows-error-access-denied-error-in-python
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files (x86)/Tesseract-OCR/tesseract.exe'
try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract

def findTextInImage(s, keyPhrase):
    #   The following decides

    with open("image.png", "wb") as fh:
        fh.write(base64.decodebytes(s))

    

    imgPath = 'image.png'

    img = cv2.imread(imgPath)
    
    #   findWord1 is the string that is searched for
    findWord1 = keyPhrase
    findWord = findWord1.replace(' ','')

    strLen = len(findWord)
    num = 0

    #   d is a dictionary with each character, the the left, right, top and bottom coordinates
    #   for each char (those are the dictionary keywords; top, bottom, left, right, char)
    d = pytesseract.image_to_boxes(img, output_type=Output.DICT)

    n_boxes = len(d['char'])


    dimensions = img.shape
    imgH = dimensions[0]

    oldMin = 0
    useMin = 0
    lineStart = 0
    i = 0
    lineH = 0

    while i < n_boxes-strLen:

        #   needed to ensure all boxes are drawn after string presence is confirmed
        addT = []
        addB = []
        addL = []
        addR = []

        oldMin = i
        
        testEli = True
        lastLet = i
        maxRight = i
        lineH = i
        (x, y) = (d['left'][i],d['top'][i])

        j=0
        while testEli == True and j < strLen:
            
            compA1 = d['char'][i+j]

            compB1 = findWord[j]
            compA = compA1.lower()
            compB = compB1.lower()

            if compA != compB:
                testEli = False
                #   string is not found in search
                
            if testEli == True:
                lastLet = i+j
                hcomp = d['bottom'][lineH]-dimensions[0]
                hcomp2 = d['bottom'][i+j]-dimensions[0]
                diffThresh = d['top'][lineH] - d['bottom'][lineH]
                if d['right'][maxRight] <= d['right'][lastLet] and hcomp+diffThresh>hcomp2:
                    maxRight = lastLet
                else:
                    #   line ends
                    lineH = i + j
                    lineStart = i + j
                    
                    (x2, y2, h2) = (d['left'][oldMin],d['top'][i+j-1],d['bottom'][i+j-1])
                    w2 = d['right'][maxRight]
                    y2 = y2 - 2*(y2-(int(imgH/2)))
                    h2 = h2 + 2*((int(imgH/2))-h2)
                    addL.append(x2-5)
                    addT.append(y2-5)
                    addB.append(h2+5)
                    addR.append(w2+5)
                    
                    maxRight = lastLet
                    oldMin = i + j
            j+=1

        if testEli == True:

            #   draws boxes for phrases that extend beyong 1 line
            for m in range(len(addT)):
                cv2.rectangle(img, (addL[m], addT[m]),(addR[m], addB[m]), (0, 255, 0), 3)

            num = num + 1

            (x, y) = (d['left'][oldMin],d['top'][i+j])
            w = d['right'][lastLet]
            h = d['bottom'][lastLet]

            #   the direction of the rising count must be reversed to position boxes
            y = y - 2*(y-(int(imgH/2)))
            h = h + 2*((int(imgH/2))-h)

            cv2.rectangle(img, (x-5, y-5), (w+5,h+5), (0, 255, 0), 3)

        #   i += j ensures that it will not re-check the same character twice
        #   a search for 'ee' in 'eee' should return a count of 1
        i+=j

    #cv2.imshow('img', img)
    #cv2.waitKey(0)
    #retval, image = img.read()
    retval, buffer = cv2.imencode('.jpg', img)
    jpg_as_text = base64.b64encode(buffer)
    #print(jpg_as_text)
    #cap.release()
    return jpg_as_text
#print(findTextInImage('C:/Users/micha/Documents/testJournal.png','they should then iDentiFy'))
