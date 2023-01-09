import Link from "next/link";
import { useState } from "react";
import { Container, Navbar, NavDropdown, Nav, Button } from "react-bootstrap"
import DropdownLink from "../DropdownLink";
import style from "./index.module.scss";
import Swal from "sweetalert2";
import { initializeStore, useStore } from "@domain/store/store";
import shallow from "zustand/shallow";
import { GetServerSideProps } from "next";
import Router from "next/router";





const NavBarT = () => {

    const [show, setShow] = useState({
        "movimentacao": false,
        "gerencia": false,
        "relatorios": false
    });

    const { deleteSession, user } = useStore(state => state, shallow);


    const showDropDown = (e: any) => {
        const {id} = e.target
        switch(id) {
            case "movimentacao":
                setShow({...show, movimentacao: !show.movimentacao, gerencia:false, relatorios:false})
                return
            case "gerencia":
                setShow({...show, gerencia: !show.gerencia, movimentacao:false, relatorios:false})
                return
            case "relatorios":
                setShow({...show, relatorios: !show.relatorios, movimentacao:false, gerencia:false})
                return
            }
    }

    const hideDropDown = (e: any) => {
        const {id} = e.target
        switch(id) {
            case "movimentacao":
                setShow({...show, movimentacao: false})
                return
            case "gerencia":
                setShow({...show, gerencia: false})
            case "relatorios":
                setShow({...show, relatorios: false})
            }
    }

    const showModaLogout = (e: any) => {
        e.preventDefault();
        {Swal.fire({
            title:'Deseja sair da sua conta?',
            cancelButtonText:'Não',
            showCancelButton:true,
            confirmButtonColor:'#2da44e',
            cancelButtonColor:'#7c7c8a',
            confirmButtonText:'Sim'}).then((res) => {
                if(res.isConfirmed) {
                    deleteSession();
                    Router.push('/');
                }
            })}
    }

    const handleOnClick = (e: any) => {
        e.preventDefault();
        if(user) {
            showModaLogout(e);
        }
        else {
            Router.push('/')
        }
    }


    return (
        <Navbar variant="dark" bg="dark" sticky="top">
            <Container>
          <Navbar.Brand href="/">Sistema de transporte</Navbar.Brand>
          <Nav className="me-auto">
          <NavDropdown 
          className={style['dropdown-box']}
             show={show.movimentacao}
             onMouseEnter={showDropDown} 
             onMouseLeave={hideDropDown}
          title="Movimentação" 
          id="movimentacao">
              <NavDropdown.Item text="Solicitação" href="/solicitacao" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Saída" href="/movimentacao" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Retorno" href="/movimentacao/retorno" as={DropdownLink}></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
            className={style['dropdown-box']}
            onMouseEnter={showDropDown} 
            onMouseLeave={hideDropDown}
            show={show.gerencia}
            title="Gerência" 
            id="gerencia">
              <NavDropdown.Item text="Setor" href="/setor" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Veículo" href="/veiculo" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Locadora" href="/locadora" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Motorista" href="/motorista" as={DropdownLink}></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
            className={style['dropdown-box']}
            onMouseEnter={showDropDown} 
            onMouseLeave={hideDropDown}
            show={show.relatorios}
            title="Relatórios" 
            id="relatorios">
              <NavDropdown.Item text="Viagens por mês" href="#action3" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Quilometragem geral" href="#action4" as={DropdownLink}></NavDropdown.Item>
              <NavDropdown.Item text="Retorno de viagem" href="#action5"as={DropdownLink}></NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </Container>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Navbar.Text>
                {
                    user ? 
                    (
                        <a 
                        style={{color: 'white', cursor: 'pointer', fontSize:'1.2rem'}}  
                        onClick={handleOnClick}>Olá,<span className={style["name-label"]}>{user?.nome}</span> 
                        </a>
                    ):
                    <></>
                }
                 
            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBarT