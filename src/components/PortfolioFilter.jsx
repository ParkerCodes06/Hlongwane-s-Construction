const categories = [
  "All",
  "Buildings",
  "Foundations",
  "Electricity",
  "Carports",
  "Ceilings",
];

export default function PortfolioFilter({ active, onSelect }) {
  return (
    <div className="portfolio-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn${active === cat ? " active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
