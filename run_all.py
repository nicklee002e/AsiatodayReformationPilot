import subprocess
import sys
import time

# 에이전트 목록 및 포트, 모듈 경로 매핑
# 모듈 경로는 프로젝트 루트 기준 파이썬 패키지 경로입니다.
AGENTS = [
    {"name": "Manager (Hub)", "module": "agents.orchestrator.main:app", "port": 8000},
    {"name": "Backend", "module": "backend.main:app", "port": 8001},
    {"name": "Ontology", "module": "ontology.main:app", "port": 8002},
    {"name": "Article Writer", "module": "agents.article_writer.main:app", "port": 8003},
    {"name": "Fact Checker", "module": "agents.fact_checker.main:app", "port": 8004},
    {"name": "Distribution (GEO)", "module": "agents.distribution.main:app", "port": 8005},
    {"name": "Security", "module": "security.main:app", "port": 8006},
    {"name": "Viz Engine", "module": "frontend.viz_engine.main:app", "port": 8007},
]

processes = []

def start_servers():
    print("🚀 아시아투데이 멀티에이전트 시스템 로컬 서버 기동을 시작합니다...")
    for agent in AGENTS:
        print(f"▶ Starting {agent['name']} on port {agent['port']}...")
        # uvicorn 실행 명령어 (--reload 옵션으로 핫 리로딩 활성화)
        cmd = [
            sys.executable, "-m", "uvicorn",
            agent["module"],
            "--host", "127.0.0.1",
            "--port", str(agent["port"]),
            "--reload"
        ]
        
        # 백그라운드 프로세스 생성
        p = subprocess.Popen(cmd)
        processes.append(p)
        
        # 서버들이 동시에 뜨면서 터미널 로그가 엉키는 것을 방지하기 위해 0.5초 대기
        time.sleep(0.5)
        
    print("\n✅ 모든 에이전트 서버가 백그라운드에서 실행 중입니다.")
    print("💡 코드를 수정하고 저장하면 해당 서버만 자동으로 재시작됩니다.")
    print("🛑 종료하려면 터미널에서 [Ctrl + C] 를 누르세요.\n")

def stop_servers():
    print("\n🛑 시스템 종료 요청 감지. 모든 에이전트 서버를 안전하게 종료합니다...")
    for p in processes:
        p.terminate()
    for p in processes:
        p.wait() # 모든 프로세스가 완전히 죽을 때까지 대기하여 포트 확보
    print("✅ 모든 프로세스가 정상적으로 종료되었습니다. 포트가 성공적으로 회수되었습니다.")

if __name__ == "__main__":
    try:
        start_servers()
        # 메인 스레드는 종료되지 않고 계속 대기
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        # 사용자가 Ctrl+C를 누르면 안전 종료 로직 실행
        stop_servers()