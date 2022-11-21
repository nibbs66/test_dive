
import  {useState, useEffect} from "react";
import axios from "axios";
import SingleSelect from "./Pos/PosSelect";


const ServiceItems = ({serviceListing}) => {


    const [service, setService] = useState('')
    const [selectService, setSelectService] = useState([])
    const [inputs, setInputs] = useState({});
    const [selected, setSelected] = useState('')

    const [services, setServices] = useState([])
    useEffect(()=>{
        setSelectService([])
        const getServiceList = async() => {
            serviceListing.map((item)=>{

                item.serviceType && setSelectService((prev)=>[...prev, {type: item.serviceType}])
            })
        }
        getServiceList()
    },[serviceListing])

    const handleServices = (e) => {
        e.preventDefault()
        setServices(prev=>[...prev, service])
        setService('')
    };




    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const handleClick = async (e) => {
        e.preventDefault()
        if(services.length > 0){
            try{
                const res = await axios.post(`/api/service`,
                    {...inputs, services}
                )
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                const res = await axios.post(`/api/service`,
                    {...inputs}
                )

            }catch(err){
                console.log(err)
            }
        }



    }

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center`}>

               <span> Add Service Item</span>

                  <button  onClick={handleClick}>CREATE
                        NEW SERVICE ITEM</button>





                        <ul >
                            {inputs.serviceType?.length > 0 && <li ><b>Service Category:</b> {inputs.serviceType}</li>}

                            {services?.length > 0 && (<li ><b>Services:</b> {services.map((cat, ind)=>(
                                    <span key={ind}> {cat},</span>
                                ))}</li>
                            )}



                        </ul>

                <div >
                    <form >
                        <div className={`flex flex-col`}>
                            <label >
                                Description of Services
                            </label>
                            <textarea
                                   type='text'
                                   name='desc'
                                      placeholder='**Only required for initial description of services on website**'
                                   onChange={handleChange}
                            />
                        </div>
                        <div >
                            <div className={`flex flex-col`}>
                               <SingleSelect data={selectService} dataValue={'type'} category={`type`}
                                               selected={selected} setInputs={setInputs} setSelected={setSelected}/>
                                <label>
                                    Service Category
                                </label>
                                <input
                                       type='text'
                                       name='serviceType'
                                       placeholder='Tanks'
                                       onChange={handleChange}
                                />
                            </div>
                            <div className={`flex flex-col`}>
                                <label >
                                    Services
                                </label>
                                <input
                                       type='text'
                                       name='services'
                                       value={service}
                                       placeholder='Tank Fill'
                                       onChange={(e) =>setService(e.target.value)}
                                />
                                <button  onClick={handleServices}>Add Service</button>
                            </div>


                        </div>
                    </form>
                </div>

        </div>
    );
};

export default ServiceItems;
