import mysql.connector
from interview import *

def connect_to_database():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='root',
        database='interviews'
    )

    return conn

class InterviewDao:
    def __init__(self):
        self.conn = connect_to_database()
        self.cursor = self.conn.cursor()
    
    def getAllInterviews(self):
        query = 'SELECT * FROM interviews'
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        interviews = []
        if rows:
            for row in rows:
                interviews.append(Interview(*row))
            return interviews
        else:
            return None