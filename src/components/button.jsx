import "./button.scss";

export default function Button({ icon, text, onClick, className }) {
  return (
    <div className={`button ${className}`} onClick={onClick}>
      <div className="button_icon">{icon}</div>
      {text && <div className="button_text">{text}</div>}
    </div>
  );
}
