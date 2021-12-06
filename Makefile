VENV_NAME = env
BIN_DIR = $(VENV_NAME)/bin

PYTHON = $(BIN_DIR)/python3
PIP = $(BIN_DIR)/pip3
MATURIN = $(BIN_DIR)/maturin
WASM_PACK = $(BIN_DIR)/wasm-pack

CHESS_DIR=chess_engine
CHESS_PY_DIR=chess_engine_python_bindings
CHESS_WASM_DIR=chess_engine_wasm_bindings

UNAME_S = $(shell uname -s)

# Rust doesn't correctly link on MacOS Monterey, see https://github.com/rust-lang/rust/issues/90342
CARGO_ENV=
ifeq ($(UNAME_S),Darwin)
CARGO_ENV=MACOSX_DEPLOYMENT_TARGET=10.7
endif

CARGO_OPTS = --target-dir $(VENV_NAME)/tmp --root $(VENV_NAME)

setup $(VENV_NAME)/bin/activate: requirements.txt
	python3 -m venv $(VENV_NAME)
	mkdir $(VENV_NAME)/tmp
	$(PIP) install -r requirements.txt
	
	$(CARGO_ENV) cargo install $(CARGO_OPTS) wasm-pack
	
	source $(BIN_DIR)/activate && $(MATURIN) develop -m $(CHESS_PY_DIR)/Cargo.toml
	source $(BIN_DIR)/activate && $(WASM_PACK) build --target web $(CHESS_WASM_DIR) && cp -r $(CHESS_WASM_DIR)/pkg site/static/

build:
	source $(BIN_DIR)/activate && $(MATURIN) develop -m $(CHESS_PY_DIR)/Cargo.toml
	source $(BIN_DIR)/activate && $(WASM_PACK) build --target web $(CHESS_WASM_DIR) && cp -r $(CHESS_WASM_DIR)/pkg site/static/

run:
	source $(BIN_DIR)/activate && $(PYTHON) site/server.py

uninstall:
	rm -rf __pycache__ $(VENV_NAME)

.PHONY: uninstall setup run rebuild