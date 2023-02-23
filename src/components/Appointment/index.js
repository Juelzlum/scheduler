import React from "react";
import '/Users/juelz/lighthouse/scheduler/src/components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



const Appointment = (props) => {
 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer.name}
      /> : <Empty />}
    </article>

  );
};


export default Appointment




