import { Button, Table } from "react-bootstrap"
import style from "./index.module.scss"
import { BsPencilSquare, BsTrash, BsList } from "react-icons/bs"

export interface TableComponentProps {
    tableHeaderData: string[][],
    tableBodyData: any[],
    onDelete?: (id: string) => void,
    onEdit?: (id: string) => void,
    onDetail?: (id: string) => void,
}

const TableComponent = ({
    tableHeaderData,
    tableBodyData,
    onDelete,
    onEdit,
    onDetail

}: TableComponentProps) => {

    const generatedTableHead =
        (tableHeaderData: string[][]) => tableHeaderData.map((column) => (<th key = {column[0]}>{column[0]}</th>));

    const generatedTableBody =
        (tableHeaderData: string[][], tableBodyData: any[]) => tableBodyData.map((data) =>
        (
            <tr key={data}>
                {tableHeaderData.map((column) => (
                    column[1] && <td  >{data[column[1]]}</td>
                ))}

               {
                (onDelete || onEdit || onDetail) && 
               
                <td className={style["table-colunm-button-group"]}>

                    {onEdit &&
                        <Button  
                        style={{borderRadius:'24px'}}
                        variant="primary"
                         onClick={() => onEdit(data.id)}>
                        <div className="d-inline-flex align-items-center">
                        <BsPencilSquare style={{marginRight:'2px'}}/>
                        <span>Editar</span>
                        </div>
                        </Button>}

                    {onDelete &&
                        <Button 
                        style={{borderRadius:'24px'}}
                        variant="danger" 
                        onClick={() => onDelete(data.id)}>
                             <div className="d-inline-flex align-items-center" style={
                                {gap:'4px'} 
                             }>
                        <BsTrash />
                        <span>Excluir</span>
                        </div>
                            </Button>}

                    {onDetail &&
                        <Button 
                        style={{borderRadius:'24px'}}
                        variant="secondary" 
                        onClick={() => onDetail(data.id)}>
                             <div className="d-inline-flex align-items-center">
                            <BsList style={{marginRight:'2px'}}></BsList>
                            <span>Detalhes</span>
                            </div>
                           </Button>}

                </td>
}
            </tr>
        )
        );

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    {generatedTableHead(tableHeaderData)}
                </tr>
            </thead>
            <tbody>
                {generatedTableBody(tableHeaderData, tableBodyData)}
            </tbody>
        </Table>)
}

export default TableComponent;