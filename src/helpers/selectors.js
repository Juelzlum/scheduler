// import Status from "components/Appointment/Status";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};
const getAppointmentsForDay =(state, day) => {
  //state.day === day
  //state.appointments - for appointments 
  const filteredDay = state.days.filter(word => word.name === day)
  // console.log(filteredDay)
  let output = []
  if(!filteredDay[0]) return output;
  for(const appt of filteredDay[0].appointments){
    output.push(state.appointments[appt])
  }
return output

}

// console.log(getAppointmentsForDay(state, 'Monday'))

// export default getAppointmentsForDay