import { useState } from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap"
import style from "./index.module.scss";

const NavBarT = () => {
    const [show, setShow] = useState({
        "movimentacao": false,
        "gerencia": false,
        "relatorios": false
    });
    const showDropDown = (e: any) => {
        console.log(e.target.id)
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
    return (
        <Navbar variant="dark" bg="dark" style={{marginBottom:'20px'}} sticky="top">
            <Container>
          <Navbar.Brand href="#home">Sistema de transporte</Navbar.Brand>
          <Nav>
          <NavDropdown 
          className={style['dropdown-box']}
             show={show.movimentacao}
             onMouseEnter={showDropDown} 
             onMouseLeave={hideDropDown}
          title="Movimentação" 
          id="movimentacao">
              <NavDropdown.Item href="#action3">Solicitação</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Saída</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Retorno</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
            className={style['dropdown-box']}
            onMouseEnter={showDropDown} 
            onMouseLeave={hideDropDown}
            show={show.gerencia}
            title="Gerência" 
            id="gerencia">
              <NavDropdown.Item href="/setores">Setor</NavDropdown.Item>
              <NavDropdown.Item href="/veiculos">Veículo</NavDropdown.Item>
              <NavDropdown.Item href="/locadoras">Locadora</NavDropdown.Item>
              <NavDropdown.Item href="/motoristas">Motorista</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown 
            className={style['dropdown-box']}
            onMouseEnter={showDropDown} 
            onMouseLeave={hideDropDown}
            show={show.relatorios}
            title="Relatórios" 
            id="relatorios">
              <NavDropdown.Item href="#action3">Viagens por mês</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Quilometragem geral</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Retorno de viagem</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Bem vindo, <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
          </Container>
      </Navbar>
    )
}

export default NavBarT