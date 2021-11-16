from flask import Flask, render_template, redirect, session, url_for, request
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super_secret'
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template(os.path.join('static', 'index.html'))


@app.route('/about')
def about():
    return render_template(os.path.join('static', 'index.html'))


if __name__ == '__main__':
    socketio.run(app)
