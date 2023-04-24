import Swal from "sweetalert2"

export const setModalSuccess = (isEdit = false, message = '') => {
    Swal.fire({
        text: message ? message : `${isEdit ? 'Edição efetuada com sucesso' : 'Cadastro efetuado com sucesso'} `,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        toast: true
    })
};

export const setLoading = async (message = '') => {
    Swal.fire({
        text: message ? message : 'Carregando...',
        icon: 'info',
        showConfirmButton: false,
        toast: true,
        didOpen: () => {
            Swal.showLoading()
        },
    });
};

export const removeModal = () => {
    Swal.close();
}

export const setModalError = (message = '') => {
    Swal.fire({
        text: message ? message : 'Erro ao efetuar a operação',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        toast: true
    })
}