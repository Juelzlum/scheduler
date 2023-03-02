import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  
  const [
    state,
    setDay,
    bookInterview,
    cancelInterview
   ] = useApplicationData();

 
  const dailyAppointment = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const appt = dailyAppointment.map((appointment)=> {
    const interview = getInterview(state, appointment.interview)
    // console.log('state.days',state.days)
    return(
    <Appointment 
      key={appointment.id} 
      {...appointment}
      interview= {interview}
      interviewers= {interviewers}
      bookInterview= {bookInterview}
      cancelInterview={cancelInterview}
    />
  )
    })


 
  return(
    <main className="layout">
      <section className="sidebar">
     <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange= {setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appt}
      </section>

    </main>
    
  );

  
  }
