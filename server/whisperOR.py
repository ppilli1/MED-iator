import os
import wave
import pyaudio
from faster_whisper import WhisperModel
import threading
import time
from langchain.schema import HumanMessage, AIMessage
from langchain.prompts.chat import ChatPromptTemplate
from openai import OpenAI
import re
import requests
from langchain_community.chat_models import ChatOpenAI
from dotenv import load_dotenv 
import time
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

NEON_GREEN = '\033[32m'
RESET_COLOR = '\033[0m'


os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"


messages_actions = [HumanMessage(content = "this is the start of the convo. You will get a bunch of data of what is happening in a surgery between surgeons and a patient. Using the context of the convo, please only respond with concise responses of any errors the surgeons may have made during the surgery such as using the wrong tool or if they decide to do something that conflicts with an action they took earlier in the surgery. Do not reply to this message. Every message after this will be an addition to the data and only respond if you think there has bees some sort of error the surgeons are making in the context of the surgery. your response should be very concise and only be a statement stating the error made if one was made.")]

messages_clarifications = [HumanMessage(content = "this is the start of the convo. You will get a bunch of blurbs of text that are part of a conversation happening between surgeons during a surgery. Using the context of the convo, please only respond with a concise response of a question that need to be clarified based on what the surgeons are doing during the procedure so you can collect data on what is exactly happening during the surgery. Do not reply to this message. Every message after this will be an addition to the conversation and only respond if you think there is something that the surgeons have said that sounds off or you want something clarified. your response should be very concise and only be a question that you need to fill in gaps of data of what is happening during the surgery or you see something off and want to clarify the surgeons actions are correct.")]

hundred_txt = ""
hundred_txt_syn = ""

# Event for synchronizations
file_ready_events = [threading.Event(), threading.Event()]

# Record chunk function
def record_chunk(p, stream, file_path, ready_event, chunk_length=5):
    frames = []
    try:
        for _ in range(0, int(16000 / 1024 * chunk_length)):
            data = stream.read(1024, exception_on_overflow=False)
            frames.append(data)
    except OSError as e:
        print(f"Error recording chunk: {e}")
        return

    wf = wave.open(file_path, 'wb')
    wf.setnchannels(1)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(16000)
    wf.writeframes(b''.join(frames))
    wf.close()

    ready_event.set() 


def transcribe_chunk(model, file_path, ready_event):
    ready_event.wait()
    try:
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return ""  # Handle the missing file scenario
        segments, _ = model.transcribe(file_path, beam_size=5)
        transcription = ''.join(segment.text for segment in segments)
    finally:
        ready_event.clear() 
    return transcription


def transcription_worker(model, file_paths, events):
    current_file_index = 0
    hundred_txt = ""
    while True:
        transcription_file = file_paths[current_file_index]
        
        transcription = transcribe_chunk(model, transcription_file, events[current_file_index])
        hundred_txt = hundred_txt + " " + transcription

        words = hundred_txt.split()  
        
        if len(words) > 20:
            md = metadata(hundred_txt)
            surgical_errors(md)
            clarify_questions(hundred_txt)
            with open ('./assets/OR_full.txt', 'a') as file:
                file.write(hundred_txt)
                file.write("\n")
            hundred_txt = ""
            # hundred_txt_syn = ""
            print("reset")
        print(NEON_GREEN + transcription + RESET_COLOR)

        if os.path.exists(transcription_file):
            os.remove(transcription_file)
        else:
            print(f"File not found for deletion: {transcription_file}")
        
        current_file_index = (current_file_index + 1) % 2

        time.sleep(0.5)
  
        
def metadata(text : str):
    #put the metadata into the txt file using chat gpt not langchain
    #return the meta data as a string
    
    url = 'https://api.openai.com/v1/chat/completions'
    headers = {
    "Content-Type" : "application/json",
    "Authorization": "Bearer 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"
    }

    diagnosis  = text

    data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "system", "content": "The following prompt is part of a conversation between surgeons during a surgery. Please parse any important actions taken and list these actions in detail. The actions should be important, such as if the surgeon administered something to the patient or said something is going wrong such as bp dropping. Include any further information as needed. Be as concise as possible and as specific as possible. Unless there is something super important said in the conversation, do not add meta data. return these as a string."},
                    {"role": "user", "content": diagnosis }

                    ],

        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, json=data)

    tt =  response.json()['choices'][0]['message']['content']
    with open('./assets/OR_metadata.txt', 'a') as file:

        file.write(tt)
        file.write("\n")
    return tt
    
def surgical_errors(metadata : str):
    #use langchain with adding metadata to get the medication errors
    chat_model = ChatOpenAI(openai_api_key = api_key)
    
    messages_actions.append(HumanMessage(content = metadata)) 

    result = chat_model.predict_messages(messages_actions)

    write_content = result.content
    print("surgery_errors: " + write_content)
    with open('./assets/OR_error_return.txt', 'a') as file:
        file.write(write_content)
        file.write("\n")
    
    
def clarify_questions(text : str):
    #use langchain to get the questions that need to be clarified
    chat_model = ChatOpenAI(openai_api_key = api_key)
    
    messages_clarifications.append(HumanMessage(content = text)) 

    result = chat_model.predict_messages(messages_clarifications)

    write_content = result.content
    print("clarifying questions: " + write_content)
    with open('./assets/OR_question_return.txt', 'a') as file:
        file.write(write_content)
        file.write("\n")

    
def memory_use_diagnosis(text : str):
    #messages.append(HumanMessage(content = text + "This is how far the conversation has reached. Is there a very concise question you want the doctor to see that would help him or her understand the situation better?"))
    pass
    


def main2():
    model = WhisperModel("medium", device="cpu", compute_type="float32")
    p = pyaudio.PyAudio()


    stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=1024)

    file_paths = ["temp_chunk_1.wav", "temp_chunk_2.wav"]
    current_file_index = 0


    transcription_thread = threading.Thread(target=transcription_worker, args=(model, file_paths, file_ready_events))
    transcription_thread.daemon = True
    transcription_thread.start()

    try:
        start_time = time.time()
        while True:
            current_time = time.time()
            
            if current_time - start_time > 120:
                print("1 minute has passed, exiting loop.")
                break
            current_file_index = (current_file_index + 1) % 2 
            record_chunk(p, stream, file_paths[current_file_index], file_ready_events[current_file_index], chunk_length=5)

    except KeyboardInterrupt:
        print("Interrupted")

    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()
        


if __name__ == "__main__":
    main2()
