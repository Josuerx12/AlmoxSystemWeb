import { SiGoogletagmanager } from "react-icons/si";
import { User } from "../../../interfaces/user";
import { Button } from "react-bootstrap";
import { UserDetails } from "../../modals/user/details";
import { useState } from "react";

const UsersTable = ({ user }: { user: User }) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <UserDetails
        show={showModal}
        handleClose={handleCloseModal}
        user={user}
      />
      <tr className="text-center" key={user._id}>
        <td>{user.name}</td>
        <td>{user.login}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <Button
            onClick={handleCloseModal}
            variant="dark"
            className="d-flex gap-2 align-items-center justify-content-center"
          >
            Detalhes <SiGoogletagmanager />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default UsersTable;
