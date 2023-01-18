import { InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";
import style from "./index.module.scss";


interface InputProps extends RegisterOptions, InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    error?: string;
};



const Input = ({ name, label, error, ...rest }: InputProps) => {


    return (
        <div className={style["input-container"]}>
            <label className={style["input-label"]} htmlFor={name}>{label}</label>
            <input
                className={`${style["input"]} ${error && style["error"]}`}
                id={name}
                {...rest}/>
            {error && <span className={style["input-error"]}>{error}</span>}
        </div>
    )
};


export default Input;

