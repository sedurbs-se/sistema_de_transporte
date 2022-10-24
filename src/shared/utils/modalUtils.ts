import Swal from "sweetalert2"

export const setModalSuccess = (isEdit = false) => {
    Swal.fire({
        text:`${isEdit ? 'Edição efetuada com sucesso': 'Cadastro efetuado com sucesso'} `, 
        icon:'success',
        showConfirmButton:false,
        timer:1500,
        toast:true})
}