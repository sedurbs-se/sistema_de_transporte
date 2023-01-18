import { ReactNode } from "react";
import { Container } from "react-bootstrap"


const PageContainer = ({children}: any) => {
    return (
        <Container 
        style={{
            height:'100vh',
            marginTop:'15px', 
            display:'flex',  
            
            flexDirection:'column',
            }}>
            {children}
        </Container>
    )
}

export default PageContainer;