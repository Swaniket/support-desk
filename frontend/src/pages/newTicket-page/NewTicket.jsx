import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Container } from "react-bootstrap";

import { getUser } from "../../features/auth/authSlice";

function NewTicket() {
  const user = useSelector(getUser);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  var isLoading = false;

  const clearForm = () => {
    setProject("")
    setTitle("")
    setDescription("")
    
  };

  const onSubmit = () => {};

  return (
    <Container>
      <section>
        <h1 className="heading custom-text-primary">Create Ticket</h1>
        <p className="heading-sub custom-text-secondary">
          Please enter the details to create a new ticket
        </p>
      </section>

      <Form onSubmit={onSubmit}>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Jhon Smith"
            id="name"
            value={name}
            name="name"
            disabled
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@youroganization.com"
            id="email"
            value={email}
            name="email"
            disabled
          />
        </Form.Group>

        {/* Projects */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Choose a Project *</strong>
          </Form.Label>
          <Form.Select
            type="checkbox"
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option>Select a Project</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Issue Title *</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Issue Description *</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter the issue description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <div className="button-group">
          <Button
            className="btn btn-light"
            style={{ marginRight: "10px" }}
            onClick={clearForm}
          >
            Clear
          </Button>
          <Button className="btn btn-dark" type="submit" disabled={isLoading}>
            {isLoading ? "Loading…" : "Register"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewTicket;
