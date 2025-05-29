#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3
import os

# Full path to SQLite file
DB_FILE = os.path.join(os.path.dirname(__file__), 'messages.db')

def setup_database():
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL CHECK (length(content) <= 140),
                tag TEXT NOT NULL CHECK(tag IN ('quote', 'song', 'rambling')) DEFAULT 'rambling',
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        print("Database and 'messages' table set up successfully at:", DB_FILE)
    except sqlite3.Error as e:
        print(f"Error setting up database: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    setup_database()