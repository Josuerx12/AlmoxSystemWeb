import Button from "react-bootstrap/Button";
import { FaFilter } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import {
  Container,
  ContainerOfExternalButtonCommands,
  SkeletonRow,
} from "./styles";
import { useState } from "react";
import UsersFilter from "../../../components/filters/usersFilter";
import UsersTable from "../../../components/tables/usersTable";
import { useQuery } from "react-query";
import { useAdminCommands } from "../../../hooks/useAdminCommands";
import NewUserModal from "../../../components/modals/user/new";
import { Table } from "react-bootstrap";
import { User } from "../../../interfaces/user";
const UsersAdminPanel = () => {
  const { fetchUser } = useAdminCommands();
  const [showFilters, setShowFilters] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const { data, isLoading } = useQuery<User[]>(["users"], fetchUser);

  return (
    <Container>
      <UsersFilter
        isOpen={showFilters}
        handleClose={() => setShowFilters((prev) => !prev)}
      />
      <NewUserModal
        show={showNewUserModal}
        handleClose={() => setShowNewUserModal((prev) => !prev)}
      />
      <h3>Painel Administrativo - Usuários</h3>
      <ContainerOfExternalButtonCommands>
        <Button
          onClick={() => setShowFilters((prev) => !prev)}
          variant="primary"
        >
          Filtrar <FaFilter />
        </Button>
        <Button
          variant="success"
          onClick={() => setShowNewUserModal((prev) => !prev)}
        >
          Novo Usuário <FaUserPlus />
        </Button>
      </ContainerOfExternalButtonCommands>
      {isLoading ? (
        <SkeletonRow />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Nome</th>
              <th>Login</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Gerenciar</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <UsersTable user={user} key={user._id} />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UsersAdminPanel;
