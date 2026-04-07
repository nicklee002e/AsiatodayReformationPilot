import subprocess
import time
import urllib.request
import sys
import os

print("Using python executable:", sys.executable)
env = os.environ.copy()

print("Starting Manager on 8000...")
p1 = subprocess.Popen([sys.executable, "-m", "uvicorn", "agents.orchestrator.main:app", "--port", "8000"], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Starting Backend on 8001...")
p2 = subprocess.Popen([sys.executable, "-m", "uvicorn", "backend.main:app", "--port", "8001"], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Starting Article Writer on 8003...")
p3 = subprocess.Popen([sys.executable, "-m", "uvicorn", "agents.article_writer.main:app", "--port", "8003"], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

time.sleep(8) # Wait for servers to boot correctly

print("Triggering DART fetch...")
try:
    req = urllib.request.Request("http://127.0.0.1:8001/events/dart-trigger", method="POST")
    with urllib.request.urlopen(req) as response:
        print("Response Code:", response.getcode())
        print("Response Body:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error during request HTTP Error:", e.code, e.read().decode('utf-8'))
except Exception as e:
    print("Error during request:", e)

print("Terminating servers...")
p1.terminate()
p2.terminate()
p3.terminate()
p1.wait()
p2.wait()
p3.wait()
print("Done.")
