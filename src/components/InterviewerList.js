import React from "react";
import InterviewerListItem from "./InterviewListItem";
import "components/InterviewList.scss"
import DayList from "./DayList";

export default function InterviewList (props) {
  const interviewers = props.interviewers.map((interviewer) => 
    <InterviewerListItem
    key = {interviewer.id}
    name= {interviewer.name}
    avatar = {interviewer.avatar}
    />
  )
  
  return (  //to review 
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewers}
  </ul>
</section>
  )
}

