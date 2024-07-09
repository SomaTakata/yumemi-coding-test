import React from "react";

interface TemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ header, content }) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center px-4 py-12  sm:px-12">
      {header}
      <div className="h-10" />
      <div className="w-full">{content}</div>
    </main>
  );
};

export default Template;
