import { useQuery } from "react-query";
import { PeriodOfDataRequests, useDataInfo } from "../../../hooks/useDataInfo";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const RequestsDashboard = () => {
  const { fetchRequestsData } = useDataInfo();

  const dataAtual = new Date(Date.now());
  const { setValue, getValues, watch } = useForm<PeriodOfDataRequests>({
    defaultValues: {
      startAt: `${dataAtual.getFullYear()}-${
        dataAtual.getMonth() + 1 < 10
          ? `0${dataAtual.getMonth() + 1}`
          : dataAtual.getMonth() + 1
      }-01`,
      endAt: dataAtual.toISOString().split("T")[0],
    },
  });

  const { data, isLoading, refetch } = useQuery("requestsDataInfo", () =>
    fetchRequestsData(getValues())
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await refetch();
  }

  return (
    <section className="m-3" style={{ flex: "1" }}>
      <h3 className="text-center fw-bold fs-2">
        Dashboard de Processos de Saída
      </h3>

      <div className="d-flex flex-column gap-4">
        <Form
          onSubmit={handleSubmit}
          className="d-flex justify-content-end gap-2"
        >
          <Form.Group>
            <Form.Label>Data de inicio</Form.Label>
            <Form.Control
              disabled={isLoading}
              defaultValue={watch("startAt")}
              onChange={(e) =>
                setValue(
                  "startAt",
                  new Date(e.target.value).toISOString().split("T")[0]
                )
              }
              type="date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de fim</Form.Label>
            <Form.Control
              disabled={isLoading}
              defaultValue={watch("endAt")}
              onChange={(e) =>
                setValue(
                  "endAt",
                  new Date(e.target.value).toISOString().split("T")[0]
                )
              }
              type="date"
            />
          </Form.Group>
          <div className="d-flex align-items-end">
            <Button
              type="submit"
              className="d-flex gap-2 align-items-center"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  Carregando Dados <Spinner size="sm" />
                </>
              ) : (
                <>
                  Buscar <FaMagnifyingGlass />
                </>
              )}
            </Button>
          </div>
        </Form>

        <div className="d-flex gap-4 py-4 overflow-auto text-dark">
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3 bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid #ff000094",
            }}
          >
            <h5 className="text-center fw-bold">Aguardando Separação</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.aguardandoSeparacao.length}
            </p>
          </div>
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3  bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid hsl(313, 100%, 64%)",
            }}
          >
            <h5 className="text-center fw-bold">Em Separação</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.emSeparacao.length}
            </p>
          </div>
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3  bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid green",
            }}
          >
            <h5 className="text-center fw-bold">Aguardando Coleta</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.aguardandoColeta.length}
            </p>
          </div>
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3  bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid #000",
            }}
          >
            <h5 className="text-center fw-bold">Canceladas</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.coletado.length}
            </p>
          </div>
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3  bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid #ccc",
            }}
          >
            <h5 className="text-center fw-bold">Coletadas</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.coletado.length}
            </p>
          </div>
          <div
            className="rounded p-2 text-lg d-flex flex-column gap-3  bg-light"
            style={{
              minWidth: "300px",

              maxHeight: "200px",
              border: "2px solid blue",
            }}
          >
            <h5 className="text-center fw-bold">Total Baseado nos Filtros</h5>
            <p className="text-center fw-bold h5">
              Total: {data?.requestsByPeriod.length}
            </p>
          </div>
        </div>

        <div className="d-flex gap-4 justify-content-between"></div>
      </div>
    </section>
  );
};

export default RequestsDashboard;
