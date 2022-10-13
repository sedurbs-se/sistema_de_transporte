import axios, { AxiosError } from "axios";
import Router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { Usuario } from "../../../domain/types/Usuario";
import { useStore } from "../../../domain/store/store";
import style from "./index.module.scss";

const LoginContainer = () => {

    const { setUser } = useStore();

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

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        refetch()
    };

    if (isLoading) {
        return <div>Carregando...</div>
    }

    return (
        <div className={style["login-container"]}>
            <span>sistema de transporte</span>
            <form onSubmit={handleSubmit}>
            <input placeholder="Login" type="text"
                onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })} />

            <input placeholder="Senha" type="password"
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />

            <div className={style["error-message"]}
                style={{ visibility: isError ? "visible" : "hidden" }}
            >
                {isError && errorMessage}
            </div>

            <button type="submit">
                Entrar
            </button>

            </form>

        </div>
    )
};

export { LoginContainer }