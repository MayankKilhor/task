from flask import Flask, render_template
import os
from routes import interview
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
if __name__ == '__main__':   
    app.debug = True
    app.register_blueprint(interview)
    app.run()

    
    