import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, getAuth, reset } from "../../features/auth/authSlice";
import { FaUser } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import { BackButton } from "../../components";
import "./register.css";

function Register() {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(getAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User Created Successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }

    dispatch(reset());
  }, [isError, message, dispatch, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    dispatch(reset());
  };

  return (
    <>
      <BackButton url="/home" />
      <section>
        <h1 className="heading custom-text-primary">
          <FaUser /> Add User
        </h1>
        <p className="heading-sub custom-text-secondary">
          Please enter employee details to register
        </p>
      </section>

      <Form onSubmit={onSubmit}>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Employee Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Jhon Smith"
            id="name"
            value={name}
            name="name"
            onChange={onChange}
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Employee Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@youroganization.com"
            id="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Enter Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Choose a strong password"
            id="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Confirm Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Please type the password again"
            id="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
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
            {isLoading ? "Loading???" : "Register"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Register;
