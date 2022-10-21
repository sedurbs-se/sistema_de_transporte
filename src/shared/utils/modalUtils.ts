import Swal from "sweetalert2"

export const setModalSuccess = () => {
    Swal.fire({
        text:'Cadastro efetuado com sucesso', 
        icon:'success',
        showConfirmButton:false,
        timer:1500,
        toast:true})
}