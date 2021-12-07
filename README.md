# Architecture
![](Multiplayer%20Chess.png)

# Requirements
+ [Rust](https://www.rust-lang.org/learn/get-started) v1.41.0+
+ [Python](https://www.python.org/downloads/) v3.6+

# Setup
Clone this repository to your local machine, `cd` into the directory.  

**IF YOU HAVE CONDA, run `conda deactivate`** ***BEFORE*** **PROCEEDING**  
*If you have already run `make setup`, and it fails because conda is activated, deactivate conda and run again: `make uninstall && make setup`*
```
make setup
source env/bin/activate
```
# Running
Once setup, simply:  
```
make run
```

# Libraries
+ [SocketIO](https://github.com/miguelgrinberg/python-socketio)
+ Flask
+ [maturin](https://github.com/PyO3/maturin)
+ [wasm-pack](https://github.com/rustwasm/wasm-pack)
