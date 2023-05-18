from flask import Flask,render_template, request, Blueprint
from service import *


interview = Blueprint('interview', __name__, template_folder='templates')

@interview.route('/getallinterviews', methods = ['GET'])
def getAllInterviews():
    return getAllInterviewsService()