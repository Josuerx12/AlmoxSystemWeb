import excel from "exceljs";
import { RequestType } from "../components/cards/newRequests";

function useGenerateXlsx() {
  async function generate(data?: RequestType[]): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Relatorio - Processo de Saída", {
        headerFooter: {
          firstHeader: "Separa+ | Relatorio de Processos de Saída",
          oddHeader: "Separa+ | Relatorio de Processos de Saída",
        },
      });

      const headerRow = worksheet.addRow([]);
      headerRow.font = { bold: true, size: 14 };

      worksheet.columns = [
        {
          header: "ID de Saída",
          key: "exitId",
          width: 30,
        },
        {
          header: "Status da Solicitação",
          key: "status",
          width: 50,
        },

        {
          header: "Solicitação Gerada",
          key: "createdAt",
          width: 60,
        },
        {
          header: "Separado em",
          key: "separetedAt",
          width: 60,
        },
        {
          header: "Separado por",
          key: "separetedBy",
          width: 60,
        },
        {
          header: "coletado em",
          key: "collectedAt",
          width: 60,
        },
        {
          header: "coletado por",
          key: "collectedBy",
          width: 60,
          font: { bold: true, size: 14 },
        },
        {
          header: "Descrição",
          key: "desc",
          width: 50,
          font: { bold: true, size: 14 },
        },
      ];

      data?.map((req) => {
        const { separetedBy, collectedBy } = req;

        if (separetedBy && !separetedBy.name) {
          separetedBy.name = "Ninguem ainda";
        }

        if (collectedBy && !collectedBy.name) {
          collectedBy.name = "Ninguem ainda";
        }

        worksheet.addRow({
          exitId: req.exitID,
          status: req.status,
          createdAt: new Date(req.createdAt),
          separetedAt: new Date(req.separetedAt),
          separetedBy: separetedBy?.name,
          collectedAt: new Date(req.collectedAt),
          collectedBy: collectedBy?.name,
          desc: req.desc,
        });
      });
      workbook.xlsx
        .writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          resolve(blob);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function downloadXlsx(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    (a.href = url), (a.download = filename), document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);

    document.body.removeChild(a);
  }

  return { generate, downloadXlsx };
}

export { useGenerateXlsx };
