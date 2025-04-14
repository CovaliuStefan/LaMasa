interface CategoryFilterProps {
	categories: string[];
	selectedCategory: string | null;
	onSelectCategory: (category: string | null) => void;
  }
  
  const CategoryFilter = ({categories, selectedCategory, onSelectCategory}: CategoryFilterProps) => {
	return (
	  <div className="flex gap-2 mb-4 flex-wrap">
		<button
		  className={`px-4 py-2 rounded ${
			selectedCategory === null ? "bg-blue-600 text-white" : "bg-gray-200"
		  }`}
		  onClick={() => onSelectCategory(null)}
		>
		  All
		</button>
		{categories.map((cat) => (
		  <button
			key={cat}
			className={`px-4 py-2 rounded ${
			  selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
			}`}
			onClick={() => onSelectCategory(cat)}
		  >
			{cat}
		  </button>
		))}
	  </div>
	);
  };
  
  export default CategoryFilter;
  