import { Request, Response } from "src/http/type";
import catchAsyncErrors from "../../../middlewares/catchAsyncErrors";
import prisma from "../../../../shared/prisma.index";

// get one note from with a note id request dynamically
const listSolicitacaoController = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const solicitacoes = await prisma.solicitacao.findMany({
      where: {
        statussolicitacao: {
          nome: {
            notIn: ["CANCELADO"],
          },
        },
        // Pegar somenete aquele sem movimentacao

        Movimentacao: {
            is: null
        }
      },
      
      include: {
        municipiosolicitacao: {
          select: {
            municipio: {
              select: {
                nome: true,
                id: true,
              },
            },
          },
        },
        statussolicitacao: {
          select: {
            nome: true,
            id: true,
          },
        },
        tiposolicitacao: {
          select: {
            nome: true,
            id: true,
          },
        },

      },
      orderBy: {
        data_hora_saida: "asc",
      },
    });


    const mappedSolicitacoes = solicitacoes.map((solicitacao) => {
      return {
        ...solicitacao,
        municipiosolicitacao: solicitacao.municipiosolicitacao.map(
          (municipio) => municipio.municipio
        ),
      };
    });

    res.status(200).json({
      solicitacoes: mappedSolicitacoes,
    });
  }
);

export { listSolicitacaoController };
