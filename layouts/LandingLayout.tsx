import React from "react";
import LandingHeader from "@/components/LandingHeader";

interface Props {
  children?:
    | string
    | JSX.Element
    | JSX.Element[]
    | React.ReactNode
    | React.ReactNode[];
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div>
      <LandingHeader />
      <div className="p-6">{children}</div>
    </div>
  );
};

export default LandingLayout;
