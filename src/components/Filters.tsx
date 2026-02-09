import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FiltersProps {
	filters: {
		colors: string[];
		priceRange: { min: number; max: number };
		searchTerm: string;
	};
	setFilters: (filters: any) => void;
}

const colorMap: Record<string, string> = {
	Rouge: "bg-red-500",
	Blanc: "bg-white border border-gray-300",
	Jaune: "bg-yellow-400",
	Orange: "bg-orange-400",
	Rose: "bg-pink-400",
	Violet: "bg-purple-500",
	Bleu: "bg-blue-500",
};

function Filters({ filters, setFilters }: FiltersProps) {
	const availableColors = Object.keys(colorMap);

	const toggleColor = (color: string) => {
		const newColors = filters.colors.includes(color)
			? filters.colors.filter((currentColor) => currentColor !== color)
			: [...filters.colors, color];
		setFilters({ ...filters, colors: newColors });
	};

	const handlePriceRange = (value: number | number[]) => {
		if (Array.isArray(value)) {
			setFilters({
				...filters,
				priceRange: { min: value[0], max: value[1] },
			});
		}
	};

	const hasActiveFilters =
		filters.colors.length > 0 ||
		filters.priceRange.min > 0 ||
		filters.priceRange.max < 150 ||
		filters.searchTerm !== "";

	return (
		<div className="w-full lg:w-64 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
			<h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-5 h-5 text-green-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<title>Filtre icone</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
					/>
				</svg>
				Filtres
			</h2>

			{/* Search Filter */}
			<div className="mb-5">
				<label className="block text-sm font-semibold text-gray-700 mb-2">
					Rechercher
				</label>
				<div className="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<title>recherche loupe</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						placeholder="Nom du bouquet..."
						value={filters.searchTerm}
						onChange={(e) =>
							setFilters({ ...filters, searchTerm: e.target.value })
						}
						className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
					/>
				</div>
			</div>

			<div className="w-full h-px bg-gray-100 mb-5" />

			{/* Color Filter */}
			<div className="mb-5">
				<label className="block text-sm font-semibold text-gray-700 mb-3">
					Couleurs
				</label>
				<div className="flex flex-wrap gap-2">
					{availableColors.map((color) => {
						const isSelected = filters.colors.includes(color);
						return (
							<button
								key={color}
								type="button"
								onClick={() => toggleColor(color)}
								className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
									isSelected
										? "bg-green-100 text-green-700 ring-2 ring-green-500"
										: "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
								}`}
							>
								<span
									className={`w-3 h-3 rounded-full shrink-0 ${colorMap[color]}`}
								/>
								{color}
							</button>
						);
					})}
				</div>
			</div>

			<div className="w-full h-px bg-gray-100 mb-5" />

			{/* Price Filter */}
			<div className="mb-6">
				<label className="block text-sm font-semibold text-gray-700 mb-1">
					Prix
				</label>
				<p className="text-sm text-green-600 font-bold mb-3">
					{filters.priceRange.min}€ — {filters.priceRange.max}€
				</p>
				<div className="px-1">
					<Slider
						range
						min={0}
						max={150}
						value={[filters.priceRange.min, filters.priceRange.max]}
						onChange={handlePriceRange}
						styles={{
							track: {
								backgroundColor: "#16a34a",
								height: 6,
							},
							rail: {
								backgroundColor: "#e5e7eb",
								height: 6,
							},
							handle: {
								borderColor: "#16a34a",
								backgroundColor: "#fff",
								width: 18,
								height: 18,
								marginTop: -6,
								boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
							},
						}}
					/>
				</div>
				<div className="flex justify-between text-xs text-gray-400 mt-2">
					<span>0€</span>
					<span>150€</span>
				</div>
			</div>

			{/* Reset Button */}
			{hasActiveFilters && (
				<button
					type="button"
					onClick={() =>
						setFilters({
							colors: [],
							priceRange: { min: 0, max: 150 },
							searchTerm: "",
						})
					}
					className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
				>
					Réinitialiser les filtres
				</button>
			)}
		</div>
	);
}

export default Filters;
