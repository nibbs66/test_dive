import React from 'react';

const AccordionLayout = ({title, children, index, section, activeIndex, titleSize, bg, text, mx, setActiveIndex, width, body, bodyMargin}) => {
    const handleSetIndex = (index) => {
        if(activeIndex !== index){
            setActiveIndex(index)
        }else{
            setActiveIndex('')
        }
    }
    //bg-[rgba(25,128,181,0.5)]
    return (
        <div className={`flex flex-col ${mx} ${width}`}>
            <div  onClick={()=>handleSetIndex(index)}  className={`flex ${text} 
             items-center justify-between  h-10 gap-3 ${bg} px-5 rounded shadow-lg cursor-pointer `} >
                <span className={`uppercase ${titleSize}  font-bold text-center`}>{title}</span>
                <span className={` font-bold `}>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {(activeIndex === index) && (
                <div className={`flex items-center  py-5 ${body} rounded-b-md shadow-xl  bg-white `}>
                    {children}
                </div>
            )}

        </div>
    );
};

export default AccordionLayout;
