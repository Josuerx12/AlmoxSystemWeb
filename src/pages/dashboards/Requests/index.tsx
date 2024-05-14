/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { PeriodOfDataRequests, useDataInfo } from "../../../hooks/useDataInfo";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";
import Slider from "react-slick";

import {
  Chart as ChartJS,
  CategoryScale,
  Colors,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  Colors,
  PointElement,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const labels = data?.requestsByMonth.map((req) => months[req._id - 1]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      colors: {
        enabled: true,
      },
      title: {
        display: true,
        text: "Total de Solicitações por mês",
      },
    },
  };

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

        <div className="flex-1">
          <Slider {...settings}>
            <div className="px-3">
              <div
                className="rounded p-2 text-lg d-flex flex-column gap-3 bg-dark bg-gradient text-white"
                style={{
                  minWidth: "300px",

                  maxHeight: "200px",
                }}
              >
                <h5 className="text-center fw-bold">Aguardando Separação</h5>
                <p className="text-center fw-bold h5">
                  Total: {data?.aguardandoSeparacao.length}
                </p>
              </div>
            </div>
            <div
              className="rounded p-2 text-lg d-flex flex-column gap-3 bg-dark bg-gradient text-white"
              style={{
                minWidth: "300px",
                maxHeight: "200px",
              }}
            >
              <h5 className="text-center fw-bold">Em Separação</h5>
              <p className="text-center fw-bold h5">
                Total: {data?.emSeparacao.length}
              </p>
            </div>
            <div className="px-3">
              <div
                className="rounded p-2 text-lg d-flex flex-column gap-3  bg-dark bg-gradient text-white"
                style={{
                  minWidth: "300px",

                  maxHeight: "200px",
                }}
              >
                <h5 className="text-center fw-bold">Aguardando Coleta</h5>
                <p className="text-center fw-bold h5">
                  Total: {data?.aguardandoColeta.length}
                </p>
              </div>
            </div>

            <div
              className="rounded p-2 text-lg d-flex flex-column gap-3  bg-dark bg-gradient text-white"
              style={{
                minWidth: "300px",

                maxHeight: "200px",
              }}
            >
              <h5 className="text-center fw-bold">Canceladas</h5>
              <p className="text-center fw-bold h5">
                Total: {data?.cancelada.length}
              </p>
            </div>

            <div className="px-3">
              <div
                className="rounded p-2 text-lg d-flex flex-column gap-3  bg-dark bg-gradient text-white"
                style={{
                  minWidth: "300px",

                  maxHeight: "200px",
                }}
              >
                <h5 className="text-center fw-bold">Coletadas</h5>
                <p className="text-center fw-bold h5">
                  Total: {data?.coletado.length}
                </p>
              </div>
            </div>

            <div
              className="rounded p-2 text-lg d-flex flex-column gap-3  bg-dark bg-gradient text-white"
              style={{
                minWidth: "300px",

                maxHeight: "200px",
              }}
            >
              <h5 className="text-center fw-bold">Total Baseado nos Filtros</h5>
              <p className="text-center fw-bold h5">
                Total: {data?.requestsByPeriod.length}
              </p>
            </div>
          </Slider>
        </div>

        <div className="d-flex gap-4 justify-content-between">
          <Bar
            className="w-100 h-100"
            style={{ maxWidth: "350px", maxHeight: "300px" }}
            options={options}
            data={{
              labels: labels,

              datasets: [
                {
                  label: "Total de solicitações",
                  data: data?.requestsByMonth
                    .sort((a, b) => a._id - b._id)
                    .map((req) => req.totalRequests),
                },
                {
                  label: "Total Atendidas",
                  data: data?.collectedRequestsByMonth
                    .sort((a, b) => a._id - b._id)
                    .map((req) => req.totalRequests),
                },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RequestsDashboard;
