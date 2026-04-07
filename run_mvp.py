import subprocess
import sys
import time
import os

AGENTS = [
    {"name": "Manager (Hub)", "module": "agents.orchestrator.main:app", "port": 8000},
    {"name": "Backend", "module": "backend.main:app", "port": 8001},
    {"name": "Ontology", "module": "ontology.main:app", "port": 8002},
    {"name": "Article Writer", "module": "agents.article_writer.main:app", "port": 8003},
]

processes = []

def start_servers():
    print("🚀 MVP 서버를 시작합니다...")
    env = os.environ.copy()
    for agent in AGENTS:
        print(f"▶ Starting {agent['name']} on port {agent['port']}...")
        cmd = [sys.executable, "-m", "uvicorn", agent["module"], "--host", "127.0.0.1", "--port", str(agent["port"])]
        p = subprocess.Popen(cmd, env=env)
        processes.append(p)
        time.sleep(1)
    print("\n✅ 서버가 실행 중입니다. (Ctrl+C로 종료)")

def stop_servers():
    print("\n🛑 시스템 종료...")
    for p in processes:
        p.terminate()
    for p in processes:
        p.wait()

if __name__ == "__main__":
    try:
        start_servers()
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        stop_servers()
