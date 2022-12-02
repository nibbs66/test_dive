import * as PropTypes from "prop-types";

const SubTypes =(props)=> {
    return <div className={`mx-10 flex flex-col items-center space-y-4 w-full `}>
        { props.headerOptions && <div className={`w-full flex justify-between`}>
            <div className={`flex flex-col w-full justify-start `}>
                <span className={`text-slate-500`}>Does product have:</span>
                <div className={`flex pl-2 space-x-5`}>
                    <div className={`flex items-center space-x-2 text-sm`}>
                        <label className={`pt-1  text-slate-400 font-thin`}>Color Options:</label>
                        <input className={`rounded p-2 border border-slate-400 checked:bg-blue-500 focus:ring-0`}
                               type="checkbox"
                               onChange={props.onChange}
                        />
                    </div>
                    <div className={`flex items-center space-x-2 text-sm`}>
                        <label className={`pt-1  text-slate-400 font-thin`}>Size Options:</label>
                        <input className={`rounded p-2 border border-slate-400 checked:bg-blue-500 focus:ring-0`}
                               type="checkbox"
                               onChange={props.onChange1}
                        />
                    </div>
                </div>
            </div>
            <div>
                {props.showButton && <button
                    className={`text-sm whitespace-nowrap leading-none py-3 px-4 text-white rounded bg-blue-500 hover:bg-indigo-700 `}
                    onClick={() => props.setInputNumber(props.inputNumber + 1)}
                >Add Type</button>}
            </div>
        </div>}
        {[...Array(props.inputNumber)].map(props.callbackfn
        )}

    </div>;
}
export default SubTypes;
SubTypes.propTypes = {
    onChange: PropTypes.func,
    onChange1: PropTypes.func,
    onClick: PropTypes.func,
    inputNumber: PropTypes.number,
    callbackfn: PropTypes.func
};
