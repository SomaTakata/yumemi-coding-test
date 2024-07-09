import { render } from "@testing-library/react";
import React from "react";
import { FaBeer } from "react-icons/fa";

import Icon from "./Icon";

describe("Iconコンポーネントのテスト", () => {
  test("IconComponentが正しく表示されること", () => {
    const { container } = render(<Icon IconComponent={FaBeer} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("classNameが適用されること", () => {
    const customClass = "custom-class";
    const { container } = render(<Icon IconComponent={FaBeer} className={customClass} />);
    expect(container.querySelector("svg")).toHaveClass(customClass);
  });

  test("sizeが適用されること", () => {
    const size = 24;
    const { container } = render(<Icon IconComponent={FaBeer} size={size} />);
    expect(container.querySelector("svg")).toHaveAttribute("height", `${size}`);
    expect(container.querySelector("svg")).toHaveAttribute("width", `${size}`);
  });
});
