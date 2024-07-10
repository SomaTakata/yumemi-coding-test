import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

import ScrollButton from ".";

// Mock the Button and Icon components
jest.mock("@/shared/components/Button", () => ({ children, onClick, className }: any) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

jest.mock("@/shared/components/Icon", () => ({ IconComponent, className }: any) => (
  <div className={className}>
    {IconComponent === FaAngleDoubleDown ? "FaAngleDoubleDown" : "FaAngleDoubleUp"}
  </div>
));

describe("ScrollButtonコンポーネントのテスト", () => {
  const mockOnClick = jest.fn();

  test("atTopがtrueのとき、正しいテキストとアイコンが表示されること", () => {
    render(<ScrollButton atTop={true} onClick={mockOnClick} />);
    expect(screen.getByText("統計を見る")).toBeInTheDocument();
    expect(screen.getByText("FaAngleDoubleDown")).toBeInTheDocument();
  });

  test("atTopがfalseのとき、正しいテキストとアイコンが表示されること", () => {
    render(<ScrollButton atTop={false} onClick={mockOnClick} />);
    expect(screen.getByText("都道府県を選択する")).toBeInTheDocument();
    expect(screen.getByText("FaAngleDoubleUp")).toBeInTheDocument();
  });

  test("ボタンクリック時にonClickが呼ばれること", () => {
    render(<ScrollButton atTop={true} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("ボタンに適用されるクラスが正しいこと", () => {
    render(<ScrollButton atTop={true} onClick={mockOnClick} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("fixed bottom-4 right-4 bg-slate-600 text-sm text-white");
  });
});
