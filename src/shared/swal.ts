import Swal from "sweetalert2";

interface IWarningPopUp {
    message: string;
    errorMessage?: string;
    action: () => Promise<any>;
    onActionSuccess: () => void;
}

const WarningPopUp = async ({ message, errorMessage, action, onActionSuccess }: IWarningPopUp) => {

    const result = await Swal.fire({
        icon: 'warning',
        title: "Tem certeza?",
        text: message,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        cancelButtonColor: "red",
        confirmButtonColor: "green",
        focusCancel: true,
        showCancelButton: true,
        showCloseButton: true,
    });

    if (result.isConfirmed) {
        var showLoading = function () {
            Swal.fire({
                title: 'Aguarde..',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading()
                },
            })
        }

        try {
            showLoading();
            await action();
            onActionSuccess();
            Swal.close();
            
        }

        catch {
            Swal.fire({
                icon: 'error',
                title: "Algo deu errado!",
                text: errorMessage,
                confirmButtonColor: 'gray',
                showCloseButton: true
            })
        }
    }



}

export { WarningPopUp }