import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

import PrefectureButton from "./PrefectureButton";

// Mock the Button and Icon components
jest.mock("../atoms/Button", () => ({ children, onClick, className }: any) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

jest.mock("../atoms/Icon", () => ({ IconComponent, className }: any) => (
  <div className={className}>{IconComponent === FaCheckCircle ? "FaCheckCircle" : "FaCircle"}</div>
));

describe("PrefectureButtonコンポーネントのテスト", () => {
  const name = "東京都";
  const onClick = jest.fn();

  test("ボタンが正しく表示されること", () => {
    render(<PrefectureButton name={name} onClick={onClick} selected={false} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test("未選択状態のアイコンとクラスが正しく適用されること", () => {
    render(<PrefectureButton name={name} onClick={onClick} selected={false} />);
    expect(screen.getByText("FaCircle")).toBeInTheDocument();
    expect(screen.getByText(name)).toHaveClass("text-xs text-slate-600 sm:text-sm");
  });

  test("選択状態のアイコンとクラスが正しく適用されること", () => {
    render(<PrefectureButton name={name} onClick={onClick} selected={true} />);
    expect(screen.getByText("FaCheckCircle")).toBeInTheDocument();
    expect(screen.getByText(name)).toHaveClass("text-xs text-blue-600 sm:text-sm");
    expect(screen.getByRole("button")).toHaveClass("border-blue-600");
  });

  test("ボタンクリック時にonClickが呼ばれること", () => {
    render(<PrefectureButton name={name} onClick={onClick} selected={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
