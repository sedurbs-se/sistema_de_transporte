import style from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color: "green";
};

const Button = (props: ButtonProps) => {

    return (
        <button {...props} className={`${style.button} ${style[props.color]}`}>
            {props.children}
        </button>
    )
};

export default Button;