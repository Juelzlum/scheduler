import React from "react";
import InterviewerListItem from "./InterviewListItem";
import "components/InterviewList.scss"
import PropTypes from 'prop-types'; 



export default function InterviewerList (props) {
  // console.log('props', props)
  // console.log( 'props.interviewers', props.interviewers) 
  const interviewers = props.interviewers.map((interviewer) => 
    <InterviewerListItem
    key = {interviewer.id}
    name = {interviewer.name}
    avatar = {interviewer.avatar}
    selected = {interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}

    />
  )
  
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewers}
  </ul>
</section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

