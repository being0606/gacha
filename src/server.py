from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

def log_gacha_time():
    conn = sqlite3.connect('gacha_logs.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO logs (time) VALUES (?)', (datetime.now(),))
    conn.commit()
    conn.close()

def get_recent_logs():
    conn = sqlite3.connect('gacha_logs.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, time FROM logs ORDER BY time DESC LIMIT 5')
    logs = cursor.fetchall()
    conn.close()
    return logs

@app.route('/gacha', methods=['POST'])
def gacha():
    log_gacha_time()
    return jsonify({"message": "Gacha pulled!"}), 200

@app.route('/logs', methods=['GET'])
def logs():
    logs = get_recent_logs()
    return jsonify(logs), 200

if __name__ == '__main__':
    app.run(debug=True)
