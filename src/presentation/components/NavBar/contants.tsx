const availableDropDown = [
    {
        id: "movimentacao",
        title: "Movimentação",
        disabled: false,
        show: false,
        items: [
            {
                text: "Solicitação",
                href: "/solicitacao"
            },
            {
                text: "Saída",
                href: "/movimentacao"
            },
            {
                text: "Retorno",
                href: "/movimentacao/retorno"
            }
        ]
    },
    {
        id: "gerencia",
        title: "Gerência",
        disabled: false,
        show: false,
        items: [
            {
                text: "Setor",
                href: "/setor"
            },
            {
                text: "Veículo",
                href: "/veiculo"
            },
            {
                text: "Locadora",
                href: "/locadora"
            },
            {
                text: "Motorista",
                href: "/motorista"
            }
        ]
    },
    {
        id: "relatorios",
        title: "Relatórios",
        disabled: true,
        show: false,
        items: [
            {
                text: "Viagens por mês",
                href: "/relatorios/viagens_mes"
            },
            {
                text: "Quilometragem geral",
                href: "/relatorios/quilometragem_geral"
            },
            {
                text: "Quilometragem por veículo",
                href: "/relatorios/quilometragem_veiculo"
            }
        ]
    },
    {
        id: 'usuarios',
        title: "Usuários",
        disabled: false,
        show: false,
        items: [
            {
                text: "Cria novo usuário",
                href: "/usuarios/create-usuario"
            },
            {
                text: "Atualiza usuário",
                href: "/usuarios/atualiza"
            },
            {
                text: "Renicia senha",
                href: "/usuarios/renicia-senha"
            }
        ]
    }
]



export { availableDropDown }