import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useBearStore } from "../../../store";
import style from "./index.module.scss";

const LoginContainer = () => {

    const [loginForm, setLoginForm] = useState({
        login: "",
        password: ""
    });

    const { isLoading, isError, error, data, refetch } = useQuery<{ name: string }, AxiosError>(['loginForm', loginForm], () =>
        axios.post("/api/login", loginForm)
            .then(({ data }: { data: { name: string } }) => data),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    const handleSubmit = () => {
        refetch()
    };

    const errorMessage = axios.isAxiosError(error) && error.response?.data.error;

    if (isLoading) {
        return <div>Carregando...</div>
    }

    const { bears, increasePopulation } = useBearStore();

    console.log(bears)
    return (
        <div className={style["login-container"]}>
            <input placeholder="Login" type="text"
                onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })} />

            <input placeholder="Senha" type="password"
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />

            <div className={style["error-message"]}
                style={{ visibility: isError ? "visible" : "hidden" }}
            >
                {isError && errorMessage}

            </div>

            <button onClick={() => handleSubmit()}>
                Entrar
            </button>

        </div>
    )
};

export { LoginContainer }