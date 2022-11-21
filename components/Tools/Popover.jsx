import * as PropTypes from "prop-types";

const Popover = ({disabled,  message}) => {
    return (
        <div className={`flex w-full z-20`}>
            <div
                className={`absolute bottom-12  drop-shadow-lg flex flex-col justify-center w-full items-center hidden  ${disabled && "group-hover:flex"} `}>
                            <span
                                className={` py-3 px-4 bg-[ghostwhite] text-slate-400 uppercase font-semibold text-sm text-center whitespace-nowrap`}>
                                {message}

                            </span>
                <div className={`h-4 w-4 rotate-45 bg-[ghostwhite] -mt-2.5`}></div>

            </div>
        </div>
    )
}

export default Popover;
