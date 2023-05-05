

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './styles.module.css';
import { availableDropDown } from '@components/NavBar/contants';
import { Container, Navbar } from 'react-bootstrap';
import shallow from 'zustand/shallow';
import { useStore } from '@domain/store/store';
import Swal from 'sweetalert2';
import Router from 'next/router';

const RadixNavBar = () => {

    const { deleteSession, user } = useStore(state => state, shallow);

    const [ItemsDropDown, setItemsDropDown] = React.useState(availableDropDown);

    React.useEffect(() => {
        if (user && user?.tipo?.nome != "admin" && user?.tipo?.nome != "gerencia") {
            const newsAvailableDropDown = ItemsDropDown.map(drop => {
                if (drop.id == "gerencia" || drop.id == "relatorios") {
                    drop.disabled = true;
                };

                // Se o usuario não for admin e não for motorista,
                // não pode acessar a tela de movimentacao
                if (drop.id === "movimentacao") {
                    drop.items = drop.items.filter(item => item.href == "/solicitacao");
                };

                if (drop.id === "usuarios") {
                    drop.items = drop.items.filter(item => item.href == "/usuarios/atualiza");
                };

                return drop;
            });
            setItemsDropDown(newsAvailableDropDown)
        } else {
            setItemsDropDown(availableDropDown)
        }

    }, [user]);

    const showModaLogout = (e: any) => {
        e.preventDefault();
        {
            Swal.fire({
                title: 'Deseja sair da sua conta?',
                cancelButtonText: 'Não',
                showCancelButton: true,
                confirmButtonColor: '#2da44e',
                cancelButtonColor: '#7c7c8a',
                confirmButtonText: 'Sim'
            }).then((res) => {
                if (res.isConfirmed) {
                    deleteSession();
                    Router.push('/');
                }
            })
        }
    }

    const handleOnClick = (e: any) => {
        e.preventDefault();
        if (user) {
            showModaLogout(e);
        }
        else {
            Router.push('/')
        }
    }

    const handleItemClick = (item: { text: string, href: string }) => {
        Router.push(item.href)
    }

    return (
        <Navbar variant="dark" bg="dark" sticky="top" style={{ zIndex: 'auto', color: 'white' }}>
            <Container>
                <Navbar.Brand href="/transporte">Sistema de transporte</Navbar.Brand>
                <div className={styles.DropdownMenuRoot}>
                    {
                        ItemsDropDown.map((drop, index) => (
                            !drop.disabled ?
                                (
                                    <DropdownMenu.Root key={drop.title + index}>
                                        <DropdownMenu.Trigger asChild>
                                            <span className={styles.IconButton} >
                                                {drop.title}
                                            </span>
                                        </DropdownMenu.Trigger>

                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>

                                                {drop.items.map(item => (
                                                    <DropdownMenu.Item className={styles.DropdownMenuItem} onClick={() => {
                                                        handleItemClick(item);
                                                    }}
                                                        key={item.text}
                                                    >
                                                        {item.text}
                                                        {/* <div className={styles.RightSlot}> </div> */}
                                                    </DropdownMenu.Item>
                                                ))}

                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                )
                                : null

                        ))}
                        
                </div>

                {user ?
                    <p className={styles["usuario-nome"]}>Olá, {"  "}
                        <span className={styles.user}
                            onClick={handleOnClick}>{user?.nome}</span></p>
                    : null}
                   
                    

            </Container>
        </Navbar>

    );
};

export default RadixNavBar;