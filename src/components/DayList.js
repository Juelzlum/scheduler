import DayListItem from "./DayListItem";
import React from "react";

export default function DayList (props) {
  const days = props.days.map((day) => 
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    )  
  return (
    <ul>
      {days}
    </ul>
  )
};
