const PosRadio = ({onChange, index, id, label}) => {
    return <div className={`items-center  flex gap-1`}>

        <input id={id}
               type="radio"
               checked={index === id}
               value={id}
               onChange={onChange}
        />
        <label htmlFor="">{label}</label>
    </div>;
}

export default PosRadio
