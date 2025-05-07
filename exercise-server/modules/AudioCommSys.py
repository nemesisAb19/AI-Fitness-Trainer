import speech_recognition as sr
from gtts import gTTS
import os
from io import BytesIO
from playsound import playsound
import pyttsx3
language = 'en'

def speech_to_text():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        print("Please say something....")
        audio = recognizer.listen(source, timeout=2)
        try:
            # print("You said: \n" + recognizer.recognize_google(audio))
            # return (recognizer.recognize_google(audio))
            text = recognizer.recognize_google(audio)
            print("You said: \n" + text)
            return text
        except Exception as e:
            print("Error: " + str(e))
            return None

def text_to_speech(text):
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.say(text)
    engine.runAndWait()
def main():  
    text_to_speech("Testing, Testing, Testing")

if __name__ == "__main__":
    main()
