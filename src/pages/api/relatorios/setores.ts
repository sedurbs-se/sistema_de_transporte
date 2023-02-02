

import prisma from "@shared/prisma.index";
import { getData, getTime } from "@shared/utils/dateUtils";
import nc from "next-connect";
import PdfPrinter from "pdfmake";
import AppError from "src/http/errors/AppError";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";
import { Request, Response } from "src/http/type";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })


handler.get(
    catchAsyncErrors(
        async (req: Request, res: Response) => {

            const { id, start_date, final_date } = req.query as { id: string, start_date: string, final_date: string };

            if (!id) {
                throw new AppError("Id não informado", 400);
            }

            const movimentacoes = await prisma.movimentacao.findMany({
                where: {
                    Solicitacao: {
                        setor_id: id as string,
                    },
                    createdAt: {
                        gte: new Date(start_date),
                        lte: new Date(final_date)
                    },
                    status: {
                        nome:
                            { in: ['RETORNO', 'CANCELADO'] }
                    },
                },
                include: {
                    Solicitacao: {
                        include: {
                            municipiosolicitacao: {
                                select: {
                                    municipio: {
                                        select: {
                                            nome: true
                                        }
                                    },

                                }
                            },
                            setor: true,


                        }
                    },
                    veiculo: true,
                    status: true,
                    motorista: true,
                }
            })


            if (!movimentacoes) {
                throw new AppError("Setor não encontrado", 404);
            }

            var fonts = {
                Courier: {
                    normal: 'Courier',
                    bold: 'Courier-Bold',
                    italics: 'Courier-Oblique',
                    bolditalics: 'Courier-BoldOblique'
                },
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
                Times: {
                    normal: 'Times-Roman',
                    bold: 'Times-Bold',
                    italics: 'Times-Italic',
                    bolditalics: 'Times-BoldItalic'
                },

            };

            let styles = {
                header: {
                    fontSize: 18,
                },
                bigger: {
                    fontSize: 14,
                    italics: true
                },
                medium: {
                    fontSize: 12,
                    italics: true
                },
                small: {
                    fontSize: 10,
                    italics: true
                },
                table: {
                    fontSize: 8,
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }

            let header = [
                {
                    text: 'Governo de Sergipe\n\n',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: 'SECRETARIA DE ESTADO DO DESENVOLVIMENTO URBANO E INFRAESTRUTURA - SEDURB\n\n',
                    style: 'bigger',
                    alignment: 'center'
                },
                {
                    text: 'Rua Vila Cristina, nº 1051 Bairro 13 de Julho - Aracaju/SE CEP: 49020-150',
                    style: 'small',
                    alignment: 'center'
                }
            ];



            const setorTable =movimentacoes.map(movimentacao => {
                const data_saida = getData(movimentacao.dtsaida);
                const hora_saida = getTime(movimentacao.dtsaida);
                const data_retorno = getData(movimentacao?.dtretorno as Date);
                const hora_retorno = getTime(movimentacao?.dtretorno as Date);

                return [
                    data_saida,
                    hora_saida,
                    data_retorno,
                    hora_retorno,
                    movimentacao.Solicitacao.municipiosolicitacao.map(municipio => municipio.municipio.nome).join(', '),
                    movimentacao.veiculo.placa,
                    movimentacao.Solicitacao.setor.nome,
                    movimentacao.Solicitacao.usuario
                ]
            })

            setorTable.sort((a, b) => {
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0;
            });

            let table = {
                body: [
                    ['Data Saída', 'Hora Saída', 'Data Retorno', 'Hora Retorno', 'Destino', 'Placa', 'Setor', 'Solictante'],
                    ...setorTable
                ]
            }

            let body = [
                {
                    text: '\n\n',
                    style: 'medium',
                },
                {
                    text: 'Relatório de Setor\n\n',
                    style: 'medium',
                    alignment: 'center'
                },
                {
                    text: `Setor: ${movimentacoes[0].Solicitacao.setor.sigla}\n\n`,
                    style: 'medium',
                    bold: true,
                },
                {
                    text: 'Movimentações\n\n',
                    alignment: 'center'
                },
                {
                    style: 'table',
                    table
                },
            ]

            let content = {
                content: [
                    ...header,
                    ...body
                ],
                styles,
                defaultStyle: {
                    font: Object.keys(fonts)[1], // Any already loaded font
                },
            }

            const printer = new PdfPrinter(fonts);

            const docs = printer.createPdfKitDocument(content as any);

            docs.on('data', (chunk) => {
                res.write(chunk)
            });

            docs.end();

            docs.on('end', () => {
                res.end()
            });

        }));

export default handler
