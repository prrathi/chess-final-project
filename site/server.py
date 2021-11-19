from flask import Flask, render_template, redirect, session, url_for, current_app
from flask_socketio import SocketIO, emit, send
from flask_socketio import join_room, leave_room

import os


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super_secret'
socketio = SocketIO(app)

PLAYER_COUNTER = {}


@socketio.on('move-receiver')
def on_move(data):
    # Make sure the move works
    # If it works,
    emit('move-made')


@socketio.on('join')
def on_join(data):
    print(data)
    username = data['username']
    room = data['room']

    join_room(room)
    if room in PLAYER_COUNTER:
        PLAYER_COUNTER[room] += 1
    else:
        PLAYER_COUNTER[room] = 1

    emit('status', username + ' has entered the room.', to=room)

    emit('data', {'type': 'init', 'count': PLAYER_COUNTER[room]})


@socketio.on('status')
def on_status(data):
    print('on_status:', data)
    room = data['room']
    emit('status', data['message'], to=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    if PLAYER_COUNTER[room]:
        PLAYER_COUNTER[room] -= 1
    leave_room(room)
    emit('status', username + ' has left the room.', to=room)


@socketio.on('game')
def on_game(data):
    room = data['room']
    data = data['data']
    emit('game', data, to=room)


@socketio.on('connect')
def test_connect():
    emit('status', ' you have connected')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game/<room_id>')
def game(room_id):
    data = {'room_id': room_id}
    return render_template('game.html', data=data)


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
