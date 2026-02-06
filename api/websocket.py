import socketio
from typing import Dict, Set
import asyncio

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['http://localhost:3000']
)

# Store active connections
active_connections: Dict[str, Set[str]] = {
    "customers": set(),
    "providers": set()
}

# Chat rooms (provider_id -> set of customer_ids)
chat_rooms: Dict[int, Set[int]] = {}

@sio.event
async def connect(sid, environ):
    """Handle client connection"""
    print(f"Client connected: {sid}")
    await sio.emit('connection_established', {'sid': sid}, room=sid)

@sio.event
async def disconnect(sid):
    """Handle client disconnection"""
    print(f"Client disconnected: {sid}")
    # Clean up from active connections
    for user_type in active_connections:
        active_connections[user_type].discard(sid)

@sio.event
async def join_room(sid, data):
    """Join a specific room (e.g., chat room)"""
    room = data.get('room')
    user_type = data.get('user_type', 'customer')
    
    if room:
        sio.enter_room(sid, room)
        active_connections[user_type].add(sid)
        await sio.emit('joined_room', {'room': room}, room=sid)
        print(f"Client {sid} joined room: {room}")

@sio.event
async def leave_room(sid, data):
    """Leave a specific room"""
    room = data.get('room')
    if room:
        sio.leave_room(sid, room)
        await sio.emit('left_room', {'room': room}, room=sid)

@sio.event
async def send_message(sid, data):
    """Send a chat message"""
    room = data.get('room')
    message = data.get('message')
    sender = data.get('sender')
    
    if room and message:
        # Broadcast to all in room
        await sio.emit('new_message', {
            'sender': sender,
            'message': message,
            'timestamp': data.get('timestamp')
        }, room=room)

@sio.event
async def booking_update(sid, data):
    """Broadcast booking status update"""
    booking_id = data.get('booking_id')
    status = data.get('status')
    
    # Notify all relevant parties
    await sio.emit('booking_status_changed', {
        'booking_id': booking_id,
        'status': status
    }, skip_sid=sid)

@sio.event
async def typing(sid, data):
    """Handle typing indicator"""
    room = data.get('room')
    user_name = data.get('user_name')
    
    if room:
        await sio.emit('user_typing', {
            'user_name': user_name
        }, room=room, skip_sid=sid)

async def notify_new_booking(provider_id: int, booking_data: dict):
    """Notify provider of new booking"""
    room = f"provider_{provider_id}"
    await sio.emit('new_booking', booking_data, room=room)

async def notify_payment_received(customer_id: int, payment_data: dict):
    """Notify customer of payment confirmation"""
    room = f"customer_{customer_id}"
    await sio.emit('payment_confirmed', payment_data, room=room)

def get_socket_app():
    """Get the Socket.IO ASGI app"""
    return socketio.ASGIApp(sio)
