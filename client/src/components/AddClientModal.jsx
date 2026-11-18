import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
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

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, data.addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name == "" || email == "" || phone == "") {
      return alert("Form must be filled out");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button
        type="button"
        className="btn-solid theme-primary btn-secondary"
        data-bs-toggle="dialog"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <dialog className="dialog" id="addClientModal">
        <div className="dialog-header">
          <h1 className="dialog-title">Add Client</h1>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="dialog"
            aria-label="Close"
          ></button>
        </div>

        <div className="dialog-body">
          <form onSubmit={onSubmit}>
            <div className="mb-7">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-7">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-7">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              className="btn btn-secondary"
              type="submit"
              data-bs-dismiss="dialog"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddClientModal;
