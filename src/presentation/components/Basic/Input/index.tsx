import { InputHTMLAttributes } from "react";
import style from "./index.module.scss";


interface InputProps extends  InputHTMLAttributes<HTMLInputElement> {
   
    name: string;
    label: string;
    error?: string;

}



const Input = ({ name, label, error, ...rest }: InputProps) => {


    return (
        <div className={style["input-container"]}>
            <label className={style["input-label"]} htmlFor={name}>{label}</label>
            <input
                className={`${style["input"]} ${error && style["error"]}`}
                id={name}
                value={rest.value}
                {...rest}/>
            {error && <span className={style["input-error"]}>{error}</span>}
        </div>
    )
};


export default Input;

