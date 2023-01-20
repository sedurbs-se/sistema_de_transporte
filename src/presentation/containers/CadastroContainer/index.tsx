
import { Container } from 'react-bootstrap';
import style from './index.module.scss';

interface CadastroContainerProps {
    children: any;
    size?: 'sm' | 'md' | 'lg';
}

const CadastroContainer = ({ children, size }: CadastroContainerProps) => {

    return (
        <Container className={style['container']}>
            <div
                className={`${style['cadastro-container']} ${style[size ? size : 'sm']}`}
            >
                {children}
            </div>
        </Container>

    )
}

export default CadastroContainer;