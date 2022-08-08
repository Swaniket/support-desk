import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BackButton({ url }) {
  return (
    <Link to={url} className="btn btn-outline-dark" style={{margin: "15px"}}>
      <FaArrowCircleLeft /> Back
    </Link>
  );
}

export default BackButton;
