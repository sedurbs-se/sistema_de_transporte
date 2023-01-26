const availableDropDown = [
    {
        id: "movimentacao",
        title: "Movimentação",
        disabled: false,
        show: false,
        items: [
            {
                text: "Solicitação",
                href: "/solicitacao",
                disabled: false
            },
            {
                text: "Saída",
                href: "/movimentacao",
                disabled: false
            },
            {
                text: "Retorno",
                href: "/movimentacao/retorno",
                disabled: false
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
                href: "/setor",
                disabled: false
            },
            {
                text: "Veículo",
                href: "/veiculo",
                disabled: false
            },
            {
                text: "Locadora",
                href: "/locadora",
                disabled: false
            },
            {
                text: "Motorista",
                href: "/motorista",
                disabled: false
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
                href: "/relatorios/viagens_mes",
                disabled: false
            },
            {
                text: "Quilometragem geral",
                href: "/relatorios/quilometragem_geral",
                disabled: false
            },
            {
                text: "Quilometragem por veículo",
                href: "/relatorios/quilometragem_veiculo",
                disabled: false
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
                href: "/usuarios/create-usuario",
                disabled: false
            },
            {
                text: "Atualiza usuário",
                href: "/usuarios/atualiza",
                disabled: false
            },
            {
                text: "Renicia senha",
                href: "/usuarios/renicia-senha",
                disabled: false
            }
        ]
    },
    {
        id: 'relatorios',
        title: "Relatórios",
        disabled: false,
        show: false,
        items: [
            {
                text: "Viagens por mês",
                href: "/relatorios/viagens_mes",
                disabled: false
            },
            {
                text: "Relatório por Motorista",
                href: "/relatorios/relatorio_motorista",
                disabled: false
            }
        ]
    }
]



export { availableDropDown }