import { ReactNode } from "react";
import { Container } from "react-bootstrap"


const PageContainer = ({children}: any) => {
    return (
        <Container style={{marginTop:'15px', display:'flex',  justifyContent:'center', flexDirection:'column'}}>
            {children}
        </Container>
    )
}

export default PageContainer;