import React from "react";
import '../Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";  
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error"

import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE= "ERROR_DELETE"

const Appointment = (props) => {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // creating saving an appt with a promise
  const save = (name, interviewer) => {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props
    .bookInterview(props.id, interview)
    .then(()=> 
    transition(SHOW))
    .catch((error)=> {
      transition(ERROR_SAVE,true)
    })
    
  }

  //deleting an appointment with a promise 
  const deleteAppointment = (event) => {

    transition(DELETING, true)

    props
    .cancelInterview(props.id)
    .then(()=> {
      transition(EMPTY)
    })
    .catch(error=> 
      transition(ERROR_DELETE, true))
    
  }

  
  return (
    <article className="appointment" data-testid="appointment">
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
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel= {back}
        onSave={save}
        />
      )}
      {mode === ERROR_SAVE && 
      <Error
      message= "Could Not Save Appointment"
      onClose={back}
      />
      }
      {mode === ERROR_DELETE && 
      <Error
      message="Could Not Delete Appointment"
      onClose={back}
      />
      }


    </article>

  );
};


export default Appointment




