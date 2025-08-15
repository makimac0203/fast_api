APP_MODULE ?= main:app

.PHONY: run install freeze

run:
	uv run uvicorn $(APP_MODULE) --reload

install:
	uv pip install -r requirements.txt

# pipの強制書き出し
freeze:
	pip freeze >| requirements.txt