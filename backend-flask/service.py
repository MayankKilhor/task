from dao import *
def getAllInterviewsService():
    interviewDao = InterviewDao()
    interviews = interviewDao.getAllInterviews()
    response = dict()
    if(interviews != None):
        response["NoOfInterviews"] = len(interviews)
        for i in range(len(interviews)):
            interview = interviews[i].__dict__
            response["_" + str(i)] = interview
        response["success"] = True
        return response
    else:
        response["success"] = False
        return response
            