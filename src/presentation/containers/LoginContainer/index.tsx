import axios, { AxiosError } from "axios";
import Router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { Usuario } from "../../../shared/types/Usuario";
import { useStore } from "../../../domain/store/store";
import style from "./index.module.scss";

const LoginContainer = () => {

    const { createSession } = useStore();

    const [loginForm, setLoginForm] = useState({
        login: "",
        password: ""
    });

    const { isLoading, isError, error, refetch } = useQuery<{ token: string }, AxiosError>(['loginForm', loginForm], () =>
        axios.post("/api/login", loginForm)
            .then(({ data }: { data: { token: string } }) => data),
        {
            enabled: false,
            refetchOnWindowFocus: false,
            retry: false,
            onSuccess: ({ token }) => {
                createSession(token);
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