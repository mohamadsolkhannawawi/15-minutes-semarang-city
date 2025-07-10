import React from "react";
import SearchBar from "./SearchBar";

// Manual testing component untuk SearchBar
const SearchBarTesting = () => {
	const handleSearch = (query) => {
		console.log("Search query:", query);
		alert(`Searching for: ${query}`);
	};

	const handleClear = () => {
		console.log("Search cleared");
		alert("Search cleared!");
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>SearchBar Testing</h2>

			<div style={{ marginBottom: "20px" }}>
				<h3>Mobile View (simulate by resizing browser)</h3>
				<SearchBar onSearch={handleSearch} onClear={handleClear} />
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h3>Testing Instructions:</h3>
				<ul>
					<li>✅ Type text to see placeholder disappear</li>
					<li>✅ Type text to see clear button (X) appear</li>
					<li>✅ Click clear button to clear text</li>
					<li>✅ Click search button or press Enter to search</li>
					<li>✅ Resize browser to test responsive behavior</li>
				</ul>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h3>Responsive Breakpoints:</h3>
				<ul>
					<li>📱 Mobile (&lt;480px): 45px height, 14px font</li>
					<li>📱 Small Mobile (480px+): 50px height, 15px font</li>
					<li>📱 Tablet (768px+): 60px height, 18px font</li>
					<li>💻 Desktop (1024px+): 80px height, 20px font</li>
					<li>🖥️ Large Desktop (1440px+): 80px height, 20px font</li>
				</ul>
			</div>
		</div>
	);
};

export default SearchBarTesting;
