import { useRef } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

export type RequestFiltersProps = {
  exitID?: number;
  startPeriod: string;
  endPeriod: string;
};

type Props = {
  setFilters: (data: RequestFiltersProps) => void;
  show: boolean;
  handleClose: () => void;
  filters: RequestFiltersProps;
};

const RequestFilters = ({ setFilters, filters, show, handleClose }: Props) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      exitID: filters.exitID,
      startPeriod: filters.startPeriod,
      endPeriod: filters.endPeriod,
    },
  });

  function CleanFilters() {
    setFilters({
      exitID: undefined,
      startPeriod: "",
      endPeriod: "",
    });
    setValue("exitID", undefined);
    setValue("startPeriod", "");
    setValue("endPeriod", "");
    handleClose();
  }

  const ref = useRef<HTMLFormElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFilter(data: any) {
    setFilters(data);
    handleClose();
  }

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filtrar Requisições</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex justify-content-between gap-3 align-items-center mb-3">
          <Button
            className="d-flex justify-content-center align-items-center gap-1"
            variant="primary"
            onClick={() => ref.current?.requestSubmit()}
          >
            Filtrar <FaMagnifyingGlass />
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center gap-1"
            variant="link-secondary"
            onClick={CleanFilters}
          >
            Limpar Filtros <FaXmark />
          </Button>
        </div>

        <Form ref={ref} onSubmit={handleSubmit(handleFilter)}>
          <Form.Group>
            <Form.Label>Período</Form.Label>
            <Form.Group className="d-flex justify-content-between gap-3 align-items-center mb-3">
              <Form.Control {...register("startPeriod")} type="date" />
              <span>Até</span>
              <Form.Control {...register("endPeriod")} type="date" />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Label>ID de Saída</Form.Label>
            <Form.Control {...register("exitID")} type="number" />
          </Form.Group>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RequestFilters;
