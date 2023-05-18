
import React from 'react';
import './Card.css';
import { BsThreeDotsVertical} from 'react-icons/bs';

function getOrdinalSuffix(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = (day % 100 > 10 && day % 100 < 20) ? 0 : day % 10;
  return suffixes[relevantDigits] || suffixes[0];
}
function formatTime(datetime) {
  const date = new Date(datetime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;


  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${amPm}`;
}
function InterviewCard({ data ,showDate}) {
  const interviewDate = new Date(data.datetime);
  const interviewTime = formatTime(data.datetime);
  const formattedDate = `${interviewDate.toLocaleString('default', { month: 'long' })} ${interviewDate.getDate()}${getOrdinalSuffix(interviewDate.getDate())} ${interviewDate.getFullYear()}`;


  return (
    <div className="interview-card">
      <div className="interview-card-grid">
        <p className="interview-card-name">{data.name}</p>
        <p className="interview-card-time"><span>{showDate && <p className="interview-card-date">{formattedDate},</p>}{interviewTime}</span></p>
        <p className="interview-card-role">Role {data.role}</p>
        <a className="interview-card-link" href="#link">View History</a>
        <div className="interview-card-actions">
        
          <button className="interview-card-button">Join Now</button>
           < BsThreeDotsVertical size={20} style={{ marginLeft: '10px' }}/>
        </div>

      </div>
      <hr />
    </div>
  );
}

export default InterviewCard;