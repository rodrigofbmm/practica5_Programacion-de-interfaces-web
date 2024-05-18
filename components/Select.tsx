import { FunctionComponent } from "preact";

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: Event) => void;
  options: string[];
}

const Select: FunctionComponent<SelectProps> = ({ name, value, onChange, options }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      <option value="">Cualquiera</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
