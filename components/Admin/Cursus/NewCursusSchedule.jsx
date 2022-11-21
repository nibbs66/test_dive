import {useState, useEffect} from 'react';
import SingleSelect from "../Pos/PosSelect";

const NewCursusSchedule = ({cursus}) => {
    const [cursusListing, setCursusListing] = useState([])
    const [selected, setSelected] = useState('')
    const [inputs, setInputs] = useState('')
    useEffect(()=>{
        const newListing = async() => {
            setCursusListing([])
            cursus.map((course, idx)=>{

                setCursusListing((prev)=>[...prev, {course: course.cursus}])
            })
        }
        newListing()
    },[cursus])

    return (
        <div>
            <label className={`text-slate-500`} htmlFor="">Cursus</label>
           <SingleSelect data={cursusListing} dataValue={'course'} category={`course`}
                                              selected={selected} setInputs={setInputs} setSelected={setSelected}/>
            schedule
        </div>
    );
};

export default NewCursusSchedule;
