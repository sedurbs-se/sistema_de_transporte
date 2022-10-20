import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { useStore } from "@domain/store/store";
import style from "./index.module.scss";
import { authenticateUser, IAuthenticateUser, IAuthenticateUserResponse } from "@domain/query/authenticateUser";
import shallow from "zustand/shallow";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";
import { useForm } from "react-hook-form";

const LoginContainer = () => {

    const { createSession } = useStore((state) => state, shallow);

    const validationSchema = yup.object().shape({
        login: yup.string().required('Login é obrigatório'),
        password: yup.string().required('Senha é obrigatório'),
      });


    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({resolver: yupResolver(validationSchema)});

    const loginForm = watch() as IAuthenticateUser;

    const onSuccess = ({ token }: IAuthenticateUserResponse) => {
        createSession(token);
        Router.push("/solicitacao");
    };

    const { isLoading, isError, error, refetch } = authenticateUser(loginForm, onSuccess);

    const errorMessage = axios.isAxiosError(error) && error.response?.data.error;

    const onSubmit = () => {
 
        refetch()
    };


    if (isLoading) {
        return <div>Carregando...</div>
    }

    return (
        <div className={style["login-container"]}>
            <span>sistema de transporte</span>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input className={ errors?.login ? style['error-input']: ''} placeholder="Login" type="text" {...register('login')}/>
            {errors?.login?.type && <InputError type={errors.login.type} field='login' />}

            <input className={ errors?.password ? style['error-input']: ''} placeholder="Senha" type="password" {...register('password')} />
            {errors?.password?.type && <InputError type={errors.password.type} field='password' />}

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