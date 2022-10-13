import { useStore } from "../../../domain/store/store";
import { LoginContainer } from "../LoginContainer";
import style from "./index.module.scss";
import shallow from "zustand/shallow";
import { Veiculos } from "../../../domain/types/Veiculos";

const HomeContainer = () => {

    const { veiculos }: { veiculos: Veiculos[] } = useStore((state) => state, shallow);

    return (
        <div className={style["home-container"]}>
            {veiculos.map((veiculo) => (
                <div key={veiculo.id}>
                    <h1>{veiculo.placa}</h1>
                </div>
            ))}
        </div>
    );
}

export { HomeContainer };
