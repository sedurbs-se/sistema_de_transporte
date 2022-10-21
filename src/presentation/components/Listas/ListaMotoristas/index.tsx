import axios from "axios"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import Swal from "sweetalert2"
import { api } from "@domain/config/api"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const { motoristas, removeMotorista, selectedMotorista ,setSelectedMotorista } = useStore((state) => state, shallow);

    const [motorista,setMotorista] = useState([{nome:"", celular: "", data_nascimento:"",vinculo:"", bairro:"", endereco:"",createdAt:"", updatedAt:""}]);
    const [show, setShow] = useState(false); 

    const tableColumns = [
        ["Nome", "nome"],
        ["Celular", "celular"],
        ["Vinculo", "vinculo"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {

        const onDeleteSuccess = (id: string) => {
            removeMotorista(id)
        }

        Swal.fire({
            icon:'warning',
            title: "Tem certeza?",
            text:"Isso excluirá o motorista do sistema",
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
                        const data = await axios.delete(`http://localhost:3000/api/motorista?id=${id}`);
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
        setSelectedMotorista(id)
        Router.push(`/motorista/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/motorista/formulario`)
    }



    const onDetail = async (id: string) => {
        const motorista = await api.get(`/motorista?id=${id}`)
        setMotorista([motorista.data.motorista])
        setShow(true)
    }

    useEffect(() => {
        if (selectedMotorista) {
            setSelectedMotorista()
        }
    }, [selectedMotorista])

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={motoristas}
                onDelete={onDelete}
                onEdit={onEdit}
                onDetail={onDetail}
            />

<Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{motorista[0].nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TableComponent
            tableHeaderData={[
                ["Nome", "nome"],
                ["Celular", "celular"],
                ["Data de nascimento", "data_nascimento"],
                ["Vínculo", "vinculo"],
                ["Bairro", "bairro"],
                ["Endereço", "endereco"],
                ["Criado em", "createdAt"],
                ["Editado em", "updatedAt"]
            ]}
            tableBodyData={motorista}
            />
        </Modal.Body>
      </Modal>

            <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaMotoristas;