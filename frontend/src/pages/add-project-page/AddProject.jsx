import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  getProjects,
  deleteProject,
  getAdminState,
} from "../../features/admin/adminSlice";
import { Form, Accordion, Button, Card } from "react-bootstrap";
import "./addProject.css";
import { toast } from "react-toastify";
import CustomModal from "../../components/custom-modal-component/CustomModal";

function AddProject() {
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");
  const [deleteProjectName, setDeleteProjectName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const { isLoading, isError, message, projects } = useSelector(getAdminState);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleOnChange = (e) => {
    setProjectName(e.target.value);
  };

  const onAddProject = async (e) => {
    e.preventDefault();

    if (projectName) {
      const res = await dispatch(createProject(projectName));
      setProjectName("");
      if (res.payload.projectName) {
        toast.success("Project Created Successfully");
      }
    } else {
      toast.error("Please enter a project name");
    }
  };

  const refreshList = () => {
    dispatch(getProjects());
  };

  const handleDelete = (projectName) => {
    setShowConfirm(true);
    setDeleteProjectName(projectName);
  };

  const handleModalClose = () => {
    setShowConfirm(false);
    setDeleteProjectName("");
  };

  const onConfirmDelete = async () => {
    if (deleteProjectName) {
      setShowConfirm(false);
      // Dispatch Delete request
      const res = await dispatch(deleteProject(deleteProjectName));
      if (res.type === "admin/deleteProject/fulfilled") {
        toast.success("Project deleted successfully");
        dispatch(getProjects());
      }
    }
  };

  return (
    <div className="content-center">
      <Accordion defaultActiveKey="0" style={{ width: "500px" }}>
        {/* Add New Project */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Project</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={onAddProject}>
              {/* Project Name */}
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Project Name</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the project name"
                  id="projectName"
                  value={projectName}
                  onChange={handleOnChange}
                  name="projectName"
                />
              </Form.Group>
              <div className="add-project-btn">
                <Button
                  className="btn btn-dark"
                  type="submit"
                  disabled={isLoading}
                  style={{ width: "140px" }}
                >
                  {isLoading ? "Loading…" : "Create Project"}
                </Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          {/* View All Projects */}
          <Accordion.Header>All Projects</Accordion.Header>
          <Accordion.Body>
            <button className="btn btn-secondory" onClick={refreshList}>
              Refresh
            </button>
            {isLoading && <h2 className="heading">Loading...</h2>}

            {!isLoading && projects.length === 0 && (
              <>
                <h2 className="heading">Nothing Here</h2>
                <p className="heading-sub">Looks like no project is added</p>
              </>
            )}

            {!isLoading &&
              projects.length > 0 &&
              projects.map((project) => (
                <div className="project-container" key={project._id}>
                  <Card style={{ width: "20rem", margin: "10px" }}>
                    <Card.Body>
                      <Card.Title>{project.projectName}</Card.Title>
                      <Card.Subtitle className="text-muted">
                        ID: {project._id}
                      </Card.Subtitle>
                      <hr></hr>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(project.projectName)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <CustomModal
        show={showConfirm}
        handleClose={handleModalClose}
        onConfirm={onConfirmDelete}
        message="Are you sure? This action is irreversable"
      />
    </div>
  );
}

export default AddProject;
