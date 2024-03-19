export default function Checkbox({ onChange, checked }) {
  return <input type="checkbox" onChange={onChange} checked={checked} />;
}
