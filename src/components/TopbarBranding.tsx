import { useTheme } from "../context/ThemeContext";

interface TopbarBrandingProps {
  /** When true, applies center-specific layout (e.g. for topbar-center). */
  center?: boolean;
}

export default function TopbarBranding({ center }: TopbarBrandingProps) {
  const { isDark } = useTheme();
  const logoSrc = isDark ? "/integer-white.png" : "/nteger-light.png";
  const className = center ? "topbarBranding topbarBranding--center" : "topbarBranding";

  return (
    <div className={className} aria-hidden="true">
      <img src={logoSrc} alt="" className="topbarBrandingLogo" />
      <span className="topbarBrandingText">1nteger Information System</span>
    </div>
  );
}
