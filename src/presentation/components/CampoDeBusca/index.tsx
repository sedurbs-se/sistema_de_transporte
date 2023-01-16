import React, {
    forwardRef,
    HtmlHTMLAttributes,
    PropsWithChildren,
} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import style from "./index.module.scss"

interface IPropsCampoDeBusca extends PropsWithChildren<HtmlHTMLAttributes<{}>> {
    list: {
        id: string;
        nome: string;
    }[]
    selected_id?: string;
    setValue: any;
}

const CampoDeBusca = 
    ({ list, setValue, selected_id }: IPropsCampoDeBusca) => {
        const [search, setSearch] = React.useState("");


        const filteredList = list.filter((data: any) => {
            if (search === "" || search === undefined) {
                return data.nome
            } else if (data.nome.toLowerCase().includes(search)) {
                return data.nome;
            }
        });

        const CustomToggle = React.forwardRef(
            ({ children, onClick }: any, ref): any => (
                <a

                    className={style["custom-toggle"]}
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
                    }}
                >
                    {children}
                    &#x25bc;
                </a>
            )
        );

        CustomToggle.displayName = "CustomToggle";
        
        const CustomMenu = React.forwardRef(
            ({ style, className, "aria-labelledby": labeledBy }: any, ref) => {
                return (
                    <div style={style} className={className} aria-labelledby={labeledBy}>
                        <Form.Control
                            autoFocus
                            className="mx-3 my-2 w-auto"
                            placeholder="Nome"
                            onChange={(e: any) => setSearch(e.target.value)}
                            value={search}
                        />
                        <ul className="list-unstyled">
                            {filteredList.map((data) => (
                                <Dropdown.Item
                                    key = {data.id}
                                    onClick={() => {
                                        setValue(data.id)
                                    }}
                                    // eventKey={data} 
                                    active={selected_id === data.id} >
                                    {data.nome}
                                </Dropdown.Item>
                            ))}
                        </ul>
                    </div>
                );
            }
        );

        CustomMenu.displayName = "CustomMenu";

        return (
            <Dropdown className={style.dropdown}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {!selected_id
                        ? "Selecione uma opção"
                        : list.find((item) => item.id === selected_id)?.nome
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}></Dropdown.Menu>
            </Dropdown>
        );
    }

export default CampoDeBusca;
