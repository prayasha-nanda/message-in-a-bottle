#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3
import json
import sys
import os

# Full path to SQLite file
DB_FILE = os.path.join(os.path.dirname(__file__), 'messages.db')

def insert_message(content, tag):
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        cursor.execute("INSERT INTO messages (content, tag) VALUES (?, ?)", (content, tag))
        conn.commit()
        
        print(json.dumps({"success": True, "message": "Message inserted successfully!"}))
    except sqlite3.Error as e:
        print(json.dumps({"success": False, "error": str(e)}))
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    # This script expects a JSON string ({"content": "Your message here", "tag": "rambling"}) from Node.js via stdin
    try:
        input_data = json.loads(sys.stdin.read())
        content = input_data.get('content')
        tag = input_data.get('tag', 'rambling') # Default

        if content:
            insert_message(content, tag)
        else:
            print(json.dumps({"success": False, "error": "Content not provided."}))
    except json.JSONDecodeError:
        print(json.dumps({"success": False, "error": "Invalid JSON input."}))
    except Exception as e:
        print(json.dumps({"success": False, "error": f"An unexpected error occurred: {e}"}))