import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { SiGoogletagmanager } from "react-icons/si";
import { FaUserPen, FaUserXmark } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { User } from "../../../interfaces/user";

const UsersTable = ({ users }: { users?: User[] }) => {
  return (
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
        {users?.map((user) => (
          <tr className="text-center" key={user._id}>
            <td>{user.name}</td>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  Ações <SiGoogletagmanager />
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  <Dropdown.Item>
                    Editar <FaUserPen />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Deletar <FaUserXmark />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Detalhes <FaUserCog />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
