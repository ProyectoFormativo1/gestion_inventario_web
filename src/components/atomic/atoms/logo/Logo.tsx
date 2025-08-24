import "./Logo.css";

interface LogoProps {
    size?: number | string;
    highlight?: boolean;
    onClick?: () => void;
}

const Logo = ({ size = 24, highlight = true, onClick }: LogoProps) => {
    return (
        <label
            className={`logo${onClick ? " logo--clickable" : ""}`}
            style={{ fontSize: typeof size === "number" ? `${size}px` : size, cursor: onClick ? "pointer" : undefined }}
            onClick={onClick}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? "button" : undefined}
        >
            Stock
            {highlight ? (
                <span className="logo__highlight">Pilot</span>
            ) : (
                "Pilot"
            )}
        </label>
    );
};

export default Logo;