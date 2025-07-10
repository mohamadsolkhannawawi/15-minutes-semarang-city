import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
	const mockOnSearch = jest.fn();
	const mockOnClear = jest.fn();

	beforeEach(() => {
		mockOnSearch.mockClear();
		mockOnClear.mockClear();
	});

	test("renders SearchBar with placeholder", () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");
		expect(input).toBeInTheDocument();
	});

	test("shows clear button when text is entered", async () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");
		fireEvent.change(input, { target: { value: "test search" } });

		await waitFor(() => {
			const clearButton = screen.getByLabelText("Clear search");
			expect(clearButton).toBeInTheDocument();
		});
	});

	test("hides placeholder when text is entered", () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");
		fireEvent.change(input, { target: { value: "test" } });

		expect(input.placeholder).toBe("");
	});

	test("calls onSearch when form is submitted", () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");
		const searchButton = screen.getByLabelText("Search");

		fireEvent.change(input, { target: { value: "test search" } });
		fireEvent.click(searchButton);

		expect(mockOnSearch).toHaveBeenCalledWith("test search");
	});

	test("calls onClear when clear button is clicked", async () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");
		fireEvent.change(input, { target: { value: "test search" } });

		await waitFor(() => {
			const clearButton = screen.getByLabelText("Clear search");
			fireEvent.click(clearButton);
		});

		expect(mockOnClear).toHaveBeenCalled();
		expect(input.value).toBe("");
	});

	test("has proper styling classes", () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const form = screen.getByRole("form");
		const input = screen.getByPlaceholderText("Telusuri Lokasi");

		expect(form).toHaveClass("relative", "w-full");
		expect(input).toHaveClass(
			"w-full",
			"rounded-lg",
			"shadow-md",
			"search-input"
		);
	});

	test("has correct background color and font family", () => {
		render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

		const input = screen.getByPlaceholderText("Telusuri Lokasi");

		expect(input).toHaveStyle({
			backgroundColor: "#ECEFCA",
			color: "#213448",
			fontFamily: "Poppins, sans-serif",
			fontWeight: "500",
		});
	});
});
