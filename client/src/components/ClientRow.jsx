import React from "react";
import { FaTrash } from "react-icons/fa";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const GET_CLIENTS = gql`
  query {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data }) {
      const deletedClient = data?.deleteClient;

      if (!deletedClient) return;

      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((c) => c.id !== deletedClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
