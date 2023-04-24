import { Container } from "react-bootstrap"

const PageContainer = ({children}: any) => {
    return (
        <Container 
        style={{
            height:'100vh',
            marginTop:'15px', 
            display:'flex',  
        
            flexDirection:'column',

            padding:'0rem 2rem',
            }}>
            {children}
        </Container>
    )
}

export default PageContainer;