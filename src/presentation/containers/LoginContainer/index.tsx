import axios, { AxiosError } from "axios";
import Router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { Usuario } from "../../../domain/types/Usuario";
import { userStore  } from "../../../domain/store/user";
import style from "./index.module.scss";

const LoginContainer = () => {

    const { setUser } = userStore ();


    const [loginForm, setLoginForm] = useState({
        login: "",
        password: ""
    });

    const { isLoading, isError, error, refetch } = useQuery<Usuario, AxiosError>(['loginForm', loginForm], () =>
        axios.post("/api/login", loginForm)
            .then(({ data }: { data: Usuario }) => data),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            retry: false,
            onSuccess: (data) => {
                setUser(data);
                Router.push("/home");
            }
        }
    );

    const errorMessage = axios.isAxiosError(error) && error.response?.data.error;

    const handleSubmit = () => {
        refetch()
    };

    if (isLoading) {
        return <div>Carregando...</div>
    }

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