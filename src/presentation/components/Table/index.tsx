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

    const generateTableHead =
        (tableHeaderData: string[][]) => tableHeaderData.map((column) => (<th>{column[0]}</th>));

    const generateTableBody =
        (tableHeaderData: string[][], tableBodyData: any[]) => tableBodyData.map((data) =>
        (
            <tr>
                {tableHeaderData.map((column) => (
                    column[1] && <td>{data[column[1]]}</td>
                ))}

                <td className={style["table-colunm-button-group"]}>

                    {onEdit &&
                        <Button variant="primary" onClick={() => onEdit(data.id)}>Edit</Button>}

                    {onDelete &&
                        <Button variant="danger" onClick={() => onDelete(data.id)}>Delete</Button>}

                </td>
            </tr>
        )
        );

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    {generateTableHead(tableHeaderData)}
                </tr>
            </thead>
            <tbody>
                {generateTableBody(tableHeaderData, tableBodyData)}
            </tbody>
        </Table>)
}

export default TableComponent;