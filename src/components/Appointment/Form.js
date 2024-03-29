import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = () =>{
    setName("")
    setInterviewer(null)
  }
  const cancel =() => {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(name, interviewer);
  }
  // console.log('form_props', props)
  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()}>
      <input
        data-testid="student-name-input"
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
       interviewers={props.interviewers} 
       value={interviewer} 
       onChange={(event) => setInterviewer(event)} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick= {cancel}>Cancel</Button>
      <Button confirm onClick= {validate}>Save</Button>
    </section>
  </section>
</main>
  )
}

export default Form