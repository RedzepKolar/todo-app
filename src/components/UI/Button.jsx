export default function Button({
  label,
  color = "",
  labelProp = "",
  ...props
}) {
  let cssClass = "input-button ";

  if (color !== "") {
    cssClass += color;
  }

  return (
    <button className={cssClass} {...props}>
      <span className={labelProp}>{label}</span>
    </button>
  );
}
