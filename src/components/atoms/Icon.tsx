import React from "react";
import { IconType } from "react-icons";

interface IconProps {
  IconComponent: IconType;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ IconComponent, className, size = 16 }) => {
  return <IconComponent className={className} size={size} />;
};

export default Icon;
