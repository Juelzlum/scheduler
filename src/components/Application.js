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

   console.log('state.days,', state.days)
   console.log('state,', state)
   
  // const [state,setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })

  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  
  //   return axios
  //   .put(`/api/appointments/${id}`,  { interview })
  //   .then(() => {
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //   })
  //   // console.log(id, interview);
  // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };  
  //   return axios
  //   .delete(`/api/appointments/${id}`)
  //   .then(()=> { setState({
  //     ...state,
  //     appointments
  //   })
      
  //   })
  
  // }

  // const setDay = day => setState({ ...state, day });


  // useEffect(()=>{
  //   Promise.all([
  //     axios.get( 'api/days'),
  //     axios.get( 'api/appointments'),
  //     axios.get( 'api/interviewers')
  //   ])
  //   .then((all) => {
  //     // console.log(all[2].data)
  //     setState(prev => ({
  //       ...prev, days: all[0].data, 
  //       appointments: all[1].data, 
  //       interviewers: all[2].data }));
  //   })
  // },[])   

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
