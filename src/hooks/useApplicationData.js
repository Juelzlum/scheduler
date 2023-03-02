import axios from "axios"
import { useEffect, useState} from "react"

export default function useApplicationData() {


  const [state,setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  //function that update the spot after making an appointment
  const numOfSpots = (state, appointments, id) => {
    const dayObj = state.days.find(d => d.name === state.day)
   
  
  let spots = 0
  
  for(const id of dayObj.appointments) {
    const appointment = appointments[id]
    if(!appointment.interview) {
      spots++
    }
  }
  
  const day = {...dayObj, spots}
  const days = state.days.map(d => d.name === state.day ? day : d)
  
    return days
  }
  

   const setDay = day => setState({ ...state, day });

   //function that books appointments
   function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios
    .put(`/api/appointments/${id}`,  { interview })
    .then(() => {
      setState({
        ...state,
        appointments,
        days: numOfSpots(state, appointments, id)
      });
    })
  }
  // function that cancels appointments
   function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    return axios
    .delete(`/api/appointments/${id}`)
    .then(()=> { setState({
      ...state,
      appointments,
      days: numOfSpots(state, appointments, id)
    })
    })
  }

  //extracting data from api to transfer to frontend 
  useEffect(()=>{
    Promise.all([
      axios.get( '/api/days'),
      axios.get( '/api/appointments'),
      axios.get( '/api/interviewers')
    ])
    .then((all) => {
      
      setState(prev => ({
        ...prev, days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data }));
    })
  },[]) 
  
  return [state, setDay, bookInterview, cancelInterview]

}
