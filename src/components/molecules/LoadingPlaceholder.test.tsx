import { render, screen } from "@testing-library/react";
import React from "react";

import LoadingPlaceholder from "./LoadingPlaceholder";

describe("LoadingPlaceholderコンポーネントのテスト", () => {
  test("16個のローディングプレースホルダーが表示されること", () => {
    render(<LoadingPlaceholder />);
    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(16);
  });

  test("奇数番目のプレースホルダーがw-fullとmb-6クラスを持つこと", () => {
    render(<LoadingPlaceholder />);
    const placeholders = screen.getAllByRole("status");
    placeholders.forEach((placeholder, index) => {
      if (index % 2 === 1) {
        expect(placeholder).toHaveClass("w-full");
        expect(placeholder).toHaveClass("mb-6");
      }
    });
  });

  test("偶数番目のプレースホルダーがw-20とmb-2クラスを持つこと", () => {
    render(<LoadingPlaceholder />);
    const placeholders = screen.getAllByRole("status");
    placeholders.forEach((placeholder, index) => {
      if (index % 2 === 0) {
        expect(placeholder).toHaveClass("w-20");
        expect(placeholder).toHaveClass("mb-2");
      }
    });
  });
});
