import React from "react";
import '/Users/juelz/lighthouse/scheduler/src/components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";  
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const EDIT = "EDIT"


const Appointment = (props) => {
  // console.log('interview1', props.interview)


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=> 
    {transition(SHOW)})
    
  }
  
  const deleteAppointment = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=> {
      transition(EMPTY)
    })

  }

  // console.log('appointment_props', props)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          bookInterview= { props.bookInterview}
          onDelete={(()=> transition(CONFIRM))}
          onEdit={(()=> transition(EDIT))}

        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
         message="Saving" 
         />
      )}
      {mode === CONFIRM && (
        <Confirm
        message='Are you sure you want to delete?'
        onConfirm={deleteAppointment}
        onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting"/>
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        onCancel= {back}
        onSave={save}

        />
        
      )}

    </article>

  );
};


export default Appointment




