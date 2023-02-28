import axios from "axios"
import { useEffect, useState} from "react"

export default function useApplicationData() {
  
  const [state,setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

   const setDay = day => setState({ ...state, day });

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
        appointments
      });
    })
    // console.log(id, interview);
  }
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
      appointments
    })
    })
  }
  useEffect(()=>{
    Promise.all([
      axios.get( 'api/days'),
      axios.get( 'api/appointments'),
      axios.get( 'api/interviewers')
    ])
    .then((all) => {
      // console.log(all[2].data)
      setState(prev => ({
        ...prev, days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data }));
    })
  },[]) 
  
  return [state, setDay, bookInterview, cancelInterview]

}