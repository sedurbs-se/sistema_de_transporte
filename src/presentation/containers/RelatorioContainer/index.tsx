
import { Container } from 'react-bootstrap';
import style from './index.module.scss';

interface RelatorioContainerProps {
    children: any;
    size?: 'sm' | 'md' | 'lg';
}

const RelatorioContainer = ({ children, size }: RelatorioContainerProps) => {

    return (
        <Container className={style['container']}>
            <div
                className={`${style['relatorio-container']} ${style[size ? size : 'sm']}`}
            >
                {children}
            </div>
        </Container>

    )
}

export default RelatorioContainer;