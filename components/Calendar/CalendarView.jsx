import {useState, useEffect} from 'react';
import Schedule from "./Schedule";
import {calendarOption} from "../../calData";
import CalendarHeader from "./CalendarHeader";

const CalendarView = ({children, cursus, viewSelector, currentMonth, setCurrentMonth, setCurrentWeek, currentWeek, selectedDay, setSelectedDay}) => {
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState({})


    return (
        <div className="lg:flex lg:h-screen lg:flex-col">
            <Schedule showModal={showModal} setShowModal={setShowModal} viewSelector={viewSelector} cursus={cursus} calendarOption={calendarOption} selected={selected} setSelected={setSelected}/>
            <CalendarHeader
                currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}  currentWeek={currentWeek} setCurrentWeek={setCurrentWeek}
                viewSelector={viewSelector} showModal={showModal} setShowModal={setShowModal} selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}

            />
            {children}
        </div>
    );
};

export default CalendarView;
