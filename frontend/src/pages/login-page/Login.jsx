import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, getAuth, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { Button, Form, Container } from "react-bootstrap";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(getAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when loggedin
    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    dispatch(reset());
  };

  return (
    <Container>
      <section>
        <h1 className="heading">
          <FaSignInAlt style={{ margin: "5px" }} /> Login
        </h1>
        <p className="heading-sub custom-text-secondary">
          Enter your credentials to login
        </p>
      </section>

      <Form onSubmit={onSubmit}>
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

        <div className="button-group">
          <Button
            className="btn btn-light"
            style={{ marginRight: "10px" }}
            onClick={clearForm}
          >
            Clear
          </Button>
          <Button className="btn btn-dark" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading…' : 'Login'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
