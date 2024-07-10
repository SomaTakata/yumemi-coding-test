import { render, screen } from "@testing-library/react";
import React from "react";

import Template from ".";

describe("Templateコンポーネントのテスト", () => {
  const headerContent = <div>Header Content</div>;
  const mainContent = <div>Main Content</div>;

  test("ヘッダーが正しく表示されること", () => {
    render(<Template content={mainContent} header={headerContent} />);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  test("メインコンテンツが正しく表示されること", () => {
    render(<Template content={mainContent} header={headerContent} />);
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });
});
