import React, { useEffect, useState } from 'react';

import InterviewCard from "./InterviewCard";
import './App.css';
import emptyImage from "./empty.png";
import { AiOutlineArrowRight } from 'react-icons/ai';
function App() {
  const [interviewData, setInterviewData] = useState({
    show: true,
    heading: "Interviews",
    data: []
  });


  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      try {
        const response = await fetch('http://127.0.0.1:5000/getallinterviews');
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const updatedInterviewData = {
          show: true,
          heading: "Interviews",
          data: []
        };

        for (let i = 0; i < data.NoOfInterviews; i++) {
          const interview = data[`_${i}`];
          const datetime = new Date(interview.datetime).toUTCString();

          updatedInterviewData.data.push({
            role: interview.role,
            name: interview.name,
            datetime: datetime
          });
        }

        setInterviewData(updatedInterviewData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  console.log(interviewData); 

    const interviewData2 = {
      show: true,
      heading: "Interviews",
      data: [
        {
          role: 'Senior Developer',
          name:'Abhimanyu Sharma',
          datetime:'Wed, 18 May 2023 03:32 GMT',
        },
        {
          role: 'Senior Developer',
          name:'Raj Ram',
          datetime:'Wed, 17 May 2023 05:00 GMT',
        },
        {
          role: 'Senior Developer',
          name:'Sachin Vinay',
          datetime:'Wed, 30 May 2023 05:00 GMT',
        },
      ]
    }

    const currentDate = new Date();
    const todayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  
    const interviewsToday = [];
    const interviewsTomorrow = [];
    const interviewsOther = [];
  
    interviewData.data.forEach((interview) => {
      const interviewDate = new Date(interview.datetime);
      if (interviewDate >= todayStart && interviewDate < currentDate) {
        interviewsToday.push(interview);
      } else if (interviewDate == tomorrowStart) {
        interviewsTomorrow.push(interview);
      } else if(interviewDate > tomorrowStart){
        interviewsOther.push(interview);
      }
    });

  return (
    <div>
      <div className='header'><h2 className='heading'> Upcoming Interview </h2><a className="interview-link" href="#link">See all  <AiOutlineArrowRight/></a>
      <br></br>
      </div>
      
      {interviewsToday.length > 0 ? (
        <>
          <h2 className="head">Today</h2>
          {interviewsToday.map((data, index) => (
            <InterviewCard key={index} data={data} showDate={false} />
          ))}
        </>
      ) : (
        <>
        <h2 className="head">Today</h2>
        <div className="empty-interviews">
          <img src={emptyImage} alt="No interviews today" />
          <p>No interviews scheduled for today</p>
        </div>
        </>
      )}
    {interviewsTomorrow.length > 0 ? (
        <>
          <h2 className="head">Tomorrow</h2>
          {interviewsTomorrow.map((data, index) => (
            <InterviewCard key={index} data={data} showDate={false}/>
          ))}
        </>
      ) : (
        <>
        <h2 className="head">Tomorrow</h2>
        <div className="empty-interviews">
          <img src={emptyImage} alt="No interviews Tomorrow" />
          <p>No interviews scheduled for Tomorrow</p>
        </div>
        </>
      )}
    {interviewsOther.length > 0 ? (
        <>
          <h2 className="head">Other Dates</h2>
          {interviewsOther.map((data, index) => (
            <InterviewCard key={index} data={data} showDate={true} />
          ))}
        </>
      ) : (
        <>
        <h2 className="head">Other Dates</h2>
        <div className="empty-interviews">
          <img src={emptyImage} alt="No interviews Tomorrow" />
          <p>No interviews scheduled for Other Dates</p>
        </div>
        </>
      )}
  </div>
  );
}

export default App;
