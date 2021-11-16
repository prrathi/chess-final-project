VENV_NAME = env
BIN_DIR = $(VENV_NAME)/bin

PYTHON = $(BIN_DIR)/python3
PIP = $(BIN_DIR)/pip3

CHESS_DIR=chess_engine
MATURIN_CARGO=Cargo.toml
WASM_PACK_CARGO=Cargo_WASM.toml

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
	
	cd $(CHESS_DIR) && maturin develop -m $(MATURIN_CARGO)

clean:
	rm -rf __pycache__ $(VENV_NAME)

.PHONY: clean setup