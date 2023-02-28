// import Status from "components/Appointment/Status";

export const getAppointmentsForDay =(state, day) => { 
  const filteredDay = state.days.filter(word => word.name === day)
  
  let output = []
  if(!filteredDay[0]) return output;
  for(const appt of filteredDay[0].appointments){
    output.push(state.appointments[appt])
  }
return output

}


export const getInterview = (state, interview) => {
  if(interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return {...interview, interviewer}
  }
  return null; 

}


export const getInterviewersForDay =(state, day) => { 
  const filteredDay = state.days.filter(word => word.name === day)

  let output = []
  if(!filteredDay[0]) return output;
  for(const interviewer of filteredDay[0].interviewers){
    output.push(state.interviewers[interviewer])
  }
return output

}