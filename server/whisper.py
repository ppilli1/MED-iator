import os
import wave
import pyaudio
from faster_whisper import WhisperModel
import torch



NEON_GREEN = '\033[32m'
RESET_COLOR = '\033[0m'

os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"


def record_chunk(p, stream, file_path, chunk_length=5):
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


def transcribe_chunk(model, file_path):
    segments, info = model.transcribe(file_path, beam_size=5)
    transcription = ''.join(segment.text for segment in segments)
    return transcription

def main2():


    print(torch.backends.mps.is_available())
    

    model = WhisperModel("medium", device="cpu", compute_type="float32")

    p = pyaudio.PyAudio()


    stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=1024)


    accumulated_transcription = ""

    try:
        while True:
            
            chunk_file = "temp_chunk.wav"
            record_chunk(p, stream, chunk_file, chunk_length=5)

            
            transcription = transcribe_chunk(model, chunk_file)
            print(NEON_GREEN + transcription + RESET_COLOR)

            
            os.remove(chunk_file)

            
            accumulated_transcription += transcription + " "

    except KeyboardInterrupt:
        print("interrupted")

        
        with open("log.txt", "w") as log_file:
            log_file.write(accumulated_transcription)

    finally:
        print("LOG" + accumulated_transcription)
        
        stream.stop_stream()
        stream.close()

        
        p.terminate()


if __name__ == "__main__":
    main2()
