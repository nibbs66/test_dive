import {useCallback, useState, useEffect} from 'react';

const useSet = (data) => {
    const [state, setState] = useState([]);
    const [secondState, setSecondState] = useState([])
    const [arrayValue, setArrayValue] = useState([])
    const [length, setLength] = useState()
    const [newSetName, setNewSetName] = useState(data[1])

//data[0].length !==undefined
    const getSetItems = async() => {
        setState([])
        const setList = []


        if(data.length === 1){
            data[0]?.map((item)=> {
                setList.push(item)
            })
            const newSet = [...new Set(setList)]
            newSet.map((item, idx)=>{
                setState((prev)=>[...prev,
                    item
                ])
            })
        }
        else if(data.length === 2){

            data[0]?.map((item)=>{
                setList.push(item[data[1]])


            })
            const newSet = [...new Set(setList)]
            newSet.map((item)=>{
                setState((prev)=>[...prev, {
                    [data[1]]: item
                }])
            })
        }
        else if(data.length === 3){

            data[0]?.map((item)=>{
                setList.push(item[data[1]])
            })
            const newSet = [...new Set(setList)]
            newSet.map((item)=>{
                setState((prev)=>[...prev, {
                    [data[2]]: item
                }])
            })



        }else if(data.length === 4){
            data[0]?.map((item)=>{
                setList.push(item[data[1]][data[2]])


            })

            const newSet = [...new Set(setList)]
            newSet.map((item)=>{
                setState((prev)=>[...prev, {
                    [data[3]]: item
                }])
            })
        }
    }
 useEffect(()=>{
     getSetItems()
         },[])

    return [state, getSetItems]

};

export default useSet;
