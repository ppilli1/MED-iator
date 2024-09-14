import os
import wave
import pyaudio
from faster_whisper import WhisperModel
import threading
import time

NEON_GREEN = '\033[32m'
RESET_COLOR = '\033[0m'

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

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
        segments, _ = model.transcribe(file_path, beam_size=5)
        transcription = ''.join(segment.text for segment in segments)
    finally:
        ready_event.clear() 
    return transcription


def transcription_worker(model, file_paths, events):
    current_file_index = 0
    while True:
    
        transcription_file = file_paths[current_file_index]
        
        
        transcription = transcribe_chunk(model, transcription_file, events[current_file_index])
        print(NEON_GREEN + transcription + RESET_COLOR)
        
        
        os.remove(transcription_file)
        
        
        current_file_index = (current_file_index + 1) % 2

        time.sleep(0.1)  


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
        while True:
            
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
