from flask import Flask, render_template, redirect, session, url_for, current_app
from flask_socketio import SocketIO, emit, send
from flask_socketio import join_room, leave_room

# Make sure you have run `make` and activated environment
#import chess_engine

import sys, os
sys.path.append(os.path.abspath('env/lib/python3.9/site-packages'))

import chess_engine
from chess_engine import *


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super_secret'
socketio = SocketIO(app)

PLAYER_COUNTER = {}
BOARD_TRACKER = {}


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
        b = Board()
        BOARD_TRACKER[room] = b
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
    if data['type'] == 'move':
        val = None
        piece = BOARD_TRACKER[room].get_piece_at(data['fromRow'], data['fromCol'])
        if data['turn'] == str(piece.color)[6:].lower():
            moves = BOARD_TRACKER[room].get_legal_moves(data['fromRow'], data['fromCol'])
            if moves:
                for move in moves:
                    if move.to_pos == (data['toRow'], data['toCol']):
                        val = move
                        data['result'] = BOARD_TRACKER[room].apply_move(val)
                        break
            if val:
                emit('game', data, to=room)
            else:
                emit('check', 'invalid move', to=room)
        else:
            emit('check', 'invalid move', to=room)
    elif data['type'] == 'start':
        emit('game', data, to=room)
    '''
    socket.emit('game', {
                room,
                data: {
                    type: 'move',
                    fromRow,
                    fromCol,
                    toRow,
                    toCol
                }
            })
    '''

@socketio.on('endgame')
def on_end(data):
    room = data['room']
    BOARD_TRACKER[room] = None
    if PLAYER_COUNTER[room]:
        PLAYER_COUNTER[room] = 0
    emit('endgame', data['winner'] + ' wins!\nreturn to the home page to start a new game')

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
    socketio.run(app, host='0.0.0.0', port = 4000)
