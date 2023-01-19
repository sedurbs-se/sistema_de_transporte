
import { Container } from 'react-bootstrap';
import style from './index.module.scss';

interface CadastroContainerProps {
    children: any;
    size?: 'sm' | 'md';
}

const CadastroContainer = ({ children, size }: CadastroContainerProps) => {
    const sizeClass = size === 'sm' ? style['sm'] : style['md'];
    return ( 
        <Container className={style['container']}>
            <div
                className={`${style['cadastro-container']} ${style[sizeClass]}`}
            >
                {children}
            </div>
        </Container>

    )
}

export default CadastroContainer;