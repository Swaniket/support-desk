import { Card } from "react-bootstrap";

function CustomCard({ title, value }) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="text-middle">{title}</Card.Title>
        <Card.Text>
          <h1 className="text-middle">{value}</h1>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
