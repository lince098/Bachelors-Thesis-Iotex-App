import react from "react";
import { Table, Button, Form, Col } from "react-bootstrap";

const alignRightStyle = {
  justifyContent: "center"
};

export default function TablaPistas() {
  return (
    <div>
      <Form inline className="my-2" style={alignRightStyle}>
        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
          Filtro por centro:
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
        <Button variant="primary" type="submit" className="text-left">
          Submit
        </Button>
      </Form>

      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
