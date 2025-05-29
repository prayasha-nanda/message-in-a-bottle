#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3
import json
import sys
import os

# Full path to SQLite file
DB_FILE = os.path.join(os.path.dirname(__file__), 'messages.db')

def select_random_message(tag=None):
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        query = "SELECT content, tag FROM messages"
        params = []

        if tag:
            query += " WHERE tag = ?"
            params.append(tag)
        
        query += " ORDER BY RANDOM() LIMIT 1" # Order by random and limit to 1 result

        cursor.execute(query, params)
        message = cursor.fetchone()

        if message:
            print(json.dumps({
                "success": True,
                "content": message[0],
                "tag": message[1]
            }))
        else:
            print(json.dumps({
                "success": False,
                "content": "No messages found floating in the any of the seven seas! How about you start the legacy?",
                "tag": None
            }))
    except sqlite3.Error as e:
        print(json.dumps({"error": str(e)}))
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    input_data = {}
    if not sys.stdin.isatty():
        try:
            input_data = json.loads(sys.stdin.read())
        except json.JSONDecodeError:
            pass 
            
    tag_filter = input_data.get('tag')
    select_random_message(tag_filter)