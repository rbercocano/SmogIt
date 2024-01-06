import './Badge.css';
function Badge({ text, variant }) {
    return (
        <span className={`badge badge-${variant}`}>{text}</span>
    )
}
export default Badge;