import axios from "axios"
import Router from "next/router"
import { Button, Modal, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import {useEffect, useState} from "react"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import Swal from "sweetalert2"
import { api } from "@domain/config/api"


export interface ListaLocadorasProps {
}

const ListaLocadoras = (props: ListaLocadorasProps) => {

    const [locadora, setLocadora] = useState([{nome: "", sigla: "", bairro:"", endereco:"",telefone:""}])
    const [show, setShow] = useState(false);

    const { locadoras, removeLocadora, selectedLocadora ,setSelectedLocadora } = useStore((state) => state, shallow);


    const tableColumns = [
        ["Nome", "nome"],
        ["Bairro", "bairro"],
    ]

    const onDelete = async (id: string) => {


        const onDeleteSuccess = (id: string) => {
            removeLocadora(id)
        }

        Swal.fire({
            icon:'warning',
            title: "Tem certeza?",
            text:"Isso excluirá a locadora do sistema",
            confirmButtonText:"Sim",
            cancelButtonText:"Não",
            cancelButtonColor:"red",
            confirmButtonColor:"green",
            focusCancel:true,
            showCancelButton:true,
            showCloseButton:true,
        }).then( async (result) => {
            if(result.isConfirmed) {
                    var showLoading = function() {
                        Swal.fire({
                          title:'Aguarde..',
                          allowOutsideClick:false,
                          showConfirmButton:false,
                          willOpen:() => {
                            Swal.showLoading()
                          },
                        })
                      }
                      
                    try {
                        showLoading();
                        const data = await axios.delete(`http://localhost:3000/api/locadora?id=${id}`);
                        Swal.close()
    
                        if (data.status === 200) {
                            onDeleteSuccess(id)
                        }
                    }
    
                    catch {
                        Swal.fire({
                            icon:'error',
                            title:"Algo deu errado!",
                            text:"Não foi possível realizar a exclusão.\nVerifique sua conexão e tente novamente!",
                            confirmButtonColor:'gray',
                            showCloseButton:true
                        })
                    }
                   
    
                    
                }
            }
        )



    }

    const onEdit = (id: string) => {
        setSelectedLocadora(id)
        Router.push(`/locadora/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/locadora/formulario`)
    }

    const onDetail = async (id: string) => {
        const locadora = await api.get(`/locadora?id=${id}`)
        setLocadora([locadora.data.locadora])
        setShow(true)
    }


    useEffect(() => {
        if (selectedLocadora) {
            setSelectedLocadora()
        }
    }, [selectedLocadora])

    return (
        <>
        <TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={locadoras}
        onEdit={onEdit}
        onDelete={onDelete}
        onDetail={onDetail}></TableComponent>

        <Button variant="primary" onClick={onAdd}>Adicionar</Button>

        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{locadora[0].nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TableComponent
            tableHeaderData={[
                ["Nome", "nome"],
                ["Sigla", "sigla"],
                ["Telefone", "telefone"],
                ["Bairro", "bairro"],
                ["Endereço", "endereco"],
                ["Criado em", "createdAt"],
                ["Editado em", "updatedAt"]
            ]}
            tableBodyData={locadora}
            />
            </Modal.Body>
        </Modal>
        </>
    )
}

export default ListaLocadoras;