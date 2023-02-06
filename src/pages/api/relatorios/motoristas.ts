import prisma from "@shared/prisma.index";
import { getData, getTime } from "@shared/utils/dateUtils";
import nc from "next-connect";
import PdfPrinter from "pdfmake";
import AppError from "src/http/errors/AppError";
import catchAsyncErrors from "src/http/middlewares/catchAsyncErrors";
import { Request, Response } from "src/http/type";
import onError from "../../../http/middlewares/onErrors";
import { logoRelatorio } from "../../../assets/logo";
const handler = nc({ onError });

handler.get(
  catchAsyncErrors(async (req: Request, res: Response) => {
    const { id, start_date, final_date } = req.query as {
      id: string;
      start_date: string;
      final_date: string;
    };

    if (!id) {
      throw new AppError("Id não informado", 400);
    }

    const motorista = await prisma.motorista.findUnique({
      where: {
        id: id as string,
      },
      include: {
        vinculo: {
          select: {
            nome: true,
          },
        },
        Movimentacao: {
          where: {
            createdAt: {
              gte: new Date(start_date),
              lte: new Date(final_date),
            },
            status: {
              nome: { in: ["RETORNO", "CANCELADO"] },
            },
          },
          include: {
            Solicitacao: {
              include: {
                municipiosolicitacao: {
                  select: {
                    municipio: {
                      select: {
                        nome: true,
                      },
                    },
                  },
                },
                setor: true,
              },
            },
            veiculo: true,
            status: true,
          },
        },
      },
    });

    if (!motorista) {
      throw new AppError("Motorista não encontrado", 404);
    }

    var fonts = {
      Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique",
      },
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
      Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic",
      },
    };

    let styles = {
      header: {
        fontSize: 18,
      },
      bigger: {
        fontSize: 14,
        italics: true,
      },
      medium: {
        fontSize: 12,
        italics: true,
      },
      small: {
        fontSize: 10,
        italics: true,
      },
      table: {
        fontSize: 8,
        alignSelf: "center",
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    };

    let header = [
      {
        image: logoRelatorio,
        width: 150,
        height: 150,
        alignment: "center",
      },

      {
        text: "SECRETARIA DE ESTADO DO DESENVOLVIMENTO URBANO E INFRAESTRUTURA - SEDURB\n\n",
        style: "bigger",
        alignment: "center",
        marginTop: 15,
      },
    ];
    let footer = [
      {
        text: "Rua Vila Cristina, nº 1051 |  Bairro 13 de Julho - Aracaju/SE  | CEP: 49020-150",
        style: "small",
        alignment: "center",
        marginTop: 10,
        textAlign: "center",
        fontWeight: 400,
      },
    ];

    const motoristaTable = motorista.Movimentacao.map((movimentacao) => {
      const data_saida = getData(movimentacao.dtsaida);
      const hora_saida = getTime(movimentacao.dtsaida);
      const data_retorno = getData(movimentacao?.dtretorno as Date);
      const hora_retorno = getTime(movimentacao?.dtretorno as Date);

      return [
        data_saida,
        hora_saida,
        data_retorno,
        hora_retorno,
        movimentacao.Solicitacao.municipiosolicitacao
          .map((municipio) => municipio.municipio.nome)
          .join(", "),
        movimentacao.veiculo.placa,
        movimentacao.Solicitacao.setor.nome,
        movimentacao.Solicitacao.usuario,
      ];
    });

    motoristaTable.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });

    const whiteSpaceTable = new Array(8).fill("\n");
    whiteSpaceTable.forEach((item) => {
      motoristaTable.push([item, item, item, item, item, item, item, item]);
    });



    let table = {
      widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
      body: [
        [
          "Data Saída",
          "Hora Saída",
          "Data Retorno",
          "Hora Retorno",
          "Destino",
          "Placa",
          "Setor",
          "Solictante",
        ],
        ...motoristaTable,
      ],
      style: {
        fontSize: 15,
      },
    };

    let body = [
      {
        text: "\n\n",
        style: "medium",
      },

      {
        text: {
          text: `Motorista: ${motorista.nome}\n\n    Vinculo: ${motorista.vinculo.nome}\n\n   Celular: ${motorista.celular} \n\n`,
        },
        style: "medium",
        bold: true,
      },
      {
        text: "Relatório de Motorista\n\n",
        style: "medium",
        alignment: "center",
      },
      {
        text: "Movimentações\n\n",
        alignment: "center",
      },
      {
        style: "table",
        table,
      },
    ];

    let content = {
      content: [...header, ...body, ...footer],
      styles,
      defaultStyle: {
        font: Object.keys(fonts)[1], // Any already loaded font
      },
    };

    const printer = new PdfPrinter(fonts);

    const docs = printer.createPdfKitDocument(content as any);

    docs.on("data", (chunk) => {
      res.write(chunk);
    });

    docs.end();

    docs.on("end", () => {
      res.end();
    });
  })
);

export default handler;
