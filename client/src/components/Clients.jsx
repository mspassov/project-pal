import React from "react";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((c) => (
              <ClientRow key={c.id} client={c} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
