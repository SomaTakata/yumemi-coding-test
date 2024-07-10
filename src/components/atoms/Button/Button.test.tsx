import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import Button from ".";

describe("Buttonコンポーネントのテスト", () => {
  test("子要素が正しく表示されること", () => {
    render(<Button>クリック</Button>);
    expect(screen.getByText("クリック")).toBeInTheDocument();
  });

  test("クリックイベントが発火すること", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    fireEvent.click(screen.getByText("クリック"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("classNameが適用されること", () => {
    const customClass = "custom-class";
    render(<Button className={customClass}>クリック</Button>);
    const buttonElement = screen.getByText("クリック");
    expect(buttonElement).toHaveClass(customClass);
  });
});
