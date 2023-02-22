import React from "react";
import classNames from "classnames";
import "components/InterviewListItem.scss"


export default function InterviewerListItem  (props) {

  const interviewClass = classNames("interviewers__item",{
    "interviewers__item--selected": props.selected
  })

return (
  <li className={interviewClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
)
}



// export default function DayListItem(props) {

//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": props.spots === 0
//   });
//   //function returns a text to show the number of spots left 
//   const formatSpots = () => {
//     const numOfSpots = props.spots;
//     if (numOfSpots === 0) return "no spot remaining";
//     else if (numOfSpots === 1) return "1 spot remaining";
//     else {
//       return `${numOfSpots} spots remaining`;
//     }
//   };

//   return (
//     <li className={dayClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular" >{props.name}</h2>
//       <h3 className="text--light">{formatSpots()}</h3>
//     </li>
//   );
// }
