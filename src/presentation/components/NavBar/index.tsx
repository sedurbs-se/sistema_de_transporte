import { useEffect, useState } from "react";
import { Container, Navbar, NavDropdown, Nav, Button } from "react-bootstrap"
import DropdownLink from "../DropdownLink";
import style from "./index.module.scss";
import Swal from "sweetalert2";
import { useStore } from "@domain/store/store";
import shallow from "zustand/shallow";
import Router from "next/router";
import { availableDropDown } from "./contants";
import { v4 as uuidv4 } from 'uuid';





const NavBarT = () => {

    const { deleteSession, user } = useStore(state => state, shallow);

    const [ItemsDropDown, setItemsDropDown] = useState(availableDropDown);

    const showDropDown = (e: any) => {
        const { id } = e.target

        const newsAvailableDropDown = ItemsDropDown.map(drop => {
            if (drop.id == id) {
                drop.show = true;
            } else {
                drop.show = false;
            };
            return drop;
        });

        setItemsDropDown(newsAvailableDropDown)
    }

    const hideDropDown = (e: any) => {
        const { id } = e.target

        const newsAvailableDropDown = ItemsDropDown.map(drop => {
            if (drop.id == id) {
                drop.show = false;
            };
            return drop;
        });

        setTimeout(() => {
            setItemsDropDown(newsAvailableDropDown)
        }, 500)
    }

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

    useEffect(() => {
        if (user && user?.tipo?.nome != "admin") {
            const newsAvailableDropDown = ItemsDropDown.map(drop => {
                if (drop.id == "gerencia" || drop.id == "relatorios" || drop.id == "usuarios") {
                    drop.disabled = true;
                };
                return drop;
            });
            setItemsDropDown(newsAvailableDropDown)
        } else {
            setItemsDropDown(availableDropDown)
        }

    }, [user])

    return (
        <Navbar variant="dark" bg="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">Sistema de transporte</Navbar.Brand>
                <Nav className="me-auto">
                    {ItemsDropDown.map((drop, index) => (
                        !drop.disabled
                            ?
                            <NavDropdown
                                className={style['dropdown-box']}
                                show={drop.show}
                                onMouseEnter={showDropDown}
                                onMouseLeave={hideDropDown}
                                title={drop.title}
                                id={drop.id}>
                                {
                                    drop.items.map(item => (
                                        <NavDropdown.Item key={uuidv4()} text={item.text} href={item.href} as={DropdownLink}>
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                            : null
                    ))}
                </Nav>
            </Container>
            <Navbar.Toggle />
            <Navbar.Collapse >
                <Navbar.Text>
                    {
                        user ?
                            (
                                <a
                                    style={{ color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                    onClick={handleOnClick}>Olá,<span className={style["name-label"]}>{user?.nome}</span>
                                </a>
                            ) :
                            <></>
                    }

                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarT