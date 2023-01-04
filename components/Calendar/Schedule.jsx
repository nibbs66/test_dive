import {useState} from 'react';
import ModalCard from "../Modal/ModalCard";
import DatePicker from "../TimePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import RentalTimePicker from "../TimePicker/RentalTimePicker";
import ItemSelector from "./ItemSelector";
import CalendarSelector from "./CalendarSelector";
import Day from "./Day";
import DayPicker from "../TimePicker/DayPicker";
import Exchange from "../icons/Exchange";
import CalendarModal from "./CalendarModal";
import {
    startOfToday,
    format,
    startOfTomorrow,
    eachHourOfInterval,
    addHours,
    isEqual,
    isToday,
    isSameMonth,
    endOfToday,
    subHours,
    addMinutes,
    parse, eachDayOfInterval, endOfWeek, endOfMonth, getDay, endOfDay
} from 'date-fns'


import {currentDate, time, startDay, endDay, days, today, colStartClasses} from '../../Time'


const Schedule = ({setShowModal, showModal, cursus, calendarOption, selected, setSelected, viewSelector}) => {
    const [inputs, setInputs] = useState({})
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [selectedTime, setSelectedTime] = useState('')
    const newPeriod = [{length: 'Half Day'}, {length: 'Full Day'}]
    const [selectedDay, setSelectedDay] = useState(today)
    const startDay = selectedDay
    const midnight = endOfDay(selectedDay)
    const endDay = subHours(midnight, 1)
    const hours = eachHourOfInterval({start: startDay, end: endDay})
    const handleSchedule = async(e) => {
        e.preventDefault()
        console.log(inputs)
        /*try{
            const res = await axios.post('/api/time',
                inputs
                )
            console.log(res.data)
        }catch(err){
            console.log(err)
        }*/

    }
    return (
        <CalendarModal showModal={showModal} setShowModal={setShowModal} customBG={true} bg={`bg-blue-200`}>
            <div className={`space-y-4`}>
             <div className={`flex w-full justify-center text-lg text-slate-400 font-semibold`}>
                 <span>Reserve</span>
             </div>
             <div className={`flex items-center justify-start space-x-4`}>
                <div>
                    <CalendarSelector  calendarOption={calendarOption} selected={selected} setSelected={setSelected} viewSelector={viewSelector}/>
                </div>
                 <div>
                     <ItemSelector cursus={cursus} label={viewSelector[1].charAt(0).toUpperCase() + viewSelector[1].slice(1)}/>
                 </div>
             </div>
                {/*<DatePicker timeOptions={viewSelector}/>*/}
               <div className={`flex items-center justify-start space-x-4`}>
                   <DayPicker/>
                   <TimePicker timeOptions={viewSelector}/>

               </div>

                <div>
                    <button className={` rounded py-1 px-2 text-white bg-blue-500 hover:bg-indigo-700 mt-1`} >
                        Submit
                    </button>
                </div>



          </div>
        </CalendarModal>
    );
};

export default Schedule;
