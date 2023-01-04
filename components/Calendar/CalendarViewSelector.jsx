import React from 'react';
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";

const CalendarViewSelector = ({cursus, viewSelector, schedules}) => {
    console.log('selectedView',viewSelector)
    return (
        <>
            {viewSelector[0]=== 'monthly' && <Month cursus={cursus} schedules={schedules} viewSelector={viewSelector}/>}
            {viewSelector[0]=== 'weekly' && <Week cursus={cursus} schedules={schedules} viewSelector={viewSelector}/>}
            {viewSelector[0]=== 'daily' && <Day cursus={cursus} schedules={schedules} viewSelector={viewSelector}/>}

        </>
    );
};

export default CalendarViewSelector;
