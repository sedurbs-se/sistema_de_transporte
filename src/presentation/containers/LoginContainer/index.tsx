import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { useStore } from "@domain/store/store";
import style from "./index.module.scss";
import { useAuthenticateUser, IAuthenticateUser, IAuthenticateUserResponse } from "@domain/query/authenticateUser";
import shallow from "zustand/shallow";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";
import { useForm } from "react-hook-form";
import Input from "@components/Basic/Input";
import Button from "@components/Basic/Button";
import CadastroContainer from "../CadastroContainer";
import { onErrorResponse } from "@domain/query/createUsuario";
import { setModalError } from "@shared/utils/modalUtils";

const LoginContainer = () => {

    const { createSession } = useStore((state) => state, shallow);

    const validationSchema = yup.object().shape({
        login: yup.string().required('Login é obrigatório'),
        password: yup.string().required('Senha é obrigatório'),
    });


    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({ resolver: yupResolver(validationSchema) });

    const loginForm = watch() as IAuthenticateUser;

    const onSuccess = ({ token }: IAuthenticateUserResponse) => {
        createSession(token);
        Router.push("/solicitacao");
    };

    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };
    
    const { isLoading, isError, error, refetch } = useAuthenticateUser({
        params: loginForm,
        onSuccess,
        onError
    });

    const errorMessage = axios.isAxiosError(error) && error.response?.data.message;

    const onSubmit = () => {
        refetch()
    };

    return (
        <CadastroContainer size="sm">

            {isLoading ? <div>Carregando...</div> : null}
            <h4>Sistema de Transporte</h4>


            <form onSubmit={handleSubmit(onSubmit)} className={style["login-form"]}>

                <Input
                    label="Login"
                    type='text'
                    name="login"
                    value={loginForm.login}
                    onChange={(e) => setValue("login", e.target.value)}
                    // {...register("login")}
                    error={errors?.login?.message as string}
                />

                <Input
                    label="Senha"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={(e) => setValue("password", e.target.value)}
                    // {...register("password")}
                    error={errors?.password?.message as string}
                />


                {isError && <div className={style["error-message"]}
                    style={{ visibility: isError ? "visible" : "hidden" }}
                >
                    {errorMessage}
                </div>}


                <Button color="green" type="submit">
                    Entrar
                </Button>

            </form>

        </CadastroContainer>
    )
};

export { LoginContainer }