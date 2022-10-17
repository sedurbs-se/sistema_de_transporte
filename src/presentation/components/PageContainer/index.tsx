import { ReactNode } from "react";
import { Container } from "react-bootstrap"


const PageContainer = ({children}: any) => {
    return (
        <Container style={{marginTop:'15px'}}>
            {children}
        </Container>
    )
}

export default PageContainer;