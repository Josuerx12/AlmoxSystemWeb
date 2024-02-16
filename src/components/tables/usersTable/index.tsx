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
        <td style={{ lineHeight: "2" }}>{user.name}</td>
        <td style={{ lineHeight: "2" }}>{user.login}</td>
        <td style={{ lineHeight: "2" }}>{user.email}</td>
        <td style={{ lineHeight: "2" }}>{user.phone}</td>
        <td className="d-flex align-items-center justify-content-center">
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
