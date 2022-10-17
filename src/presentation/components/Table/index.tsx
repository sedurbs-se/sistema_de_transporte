import { Button, Table } from "react-bootstrap"
import style from "./index.module.scss"

export interface TableComponentProps {
    tableHeaderData: string[][],
    tableBodyData: any[],
    onDelete?: (id: string) => void,
    onEdit?: (id: string) => void
}

const TableComponent = ({
    tableHeaderData,
    tableBodyData,
    onDelete,
    onEdit

}: TableComponentProps) => {

    const generatedTableHead =
        (tableHeaderData: string[][]) => tableHeaderData.map((column) => (<th key = {column[0]}>{column[0]}</th>));

    const generatedTableBody =
        (tableHeaderData: string[][], tableBodyData: any[]) => tableBodyData.map((data) =>
        (
            <tr key = {data}>
                {tableHeaderData.map((column) => (
                    column[1] && <td  >{data[column[1]]}</td>
                ))}

               {
                (onDelete || onEdit) && 
               
                <td className={style["table-colunm-button-group"]}>

                    {onEdit &&
                        <Button variant="primary" onClick={() => onEdit(data.id)}>Editar</Button>}

                    {onDelete &&
                        <Button variant="danger" onClick={() => onDelete(data.id)}>Deletar</Button>}

                </td>
}
            </tr>
        )
        );

    return (
        <Table striped bordered>
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