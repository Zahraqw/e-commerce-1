import { Form } from "../Constants.js";
const DropdownSelector = ({ label, options, setSelectedValue }) => {
  return (
    <Form.Group className="mb-3 col-md-6">
      <Form.Label>Select {label}</Form.Label>
      <Form.Control as="select" onChange={(e) => setSelectedValue(e.target.value)} required>
      <option value="" disabled selected>Select {label.toLowerCase()}</option>
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );}

export default DropdownSelector
