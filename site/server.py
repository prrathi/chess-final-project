from flask import Flask, render_template, redirect, session, url_for, request
from flask_socketio import SocketIO, emit, send
from flask_socketio import join_room, leave_room

import os


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super_secret'
socketio = SocketIO(app)

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
    emit('info', username + ' has entered the room.', to=room)

    emit('data', {'type': 'init' })

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit('status', username + ' has left the room.', to=room)
    
@socketio.on('connect')
def test_connect():
    emit('status', ' you have connected')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game/<room_id>')
def game(room_id):
    data = { 'room_id': room_id }
    return render_template('game.html', data=data)
@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
