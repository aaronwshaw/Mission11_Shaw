import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://bookstore3-shaw-backend-csc3gjc3d0fhhxer.eastus-01.azurewebsites.net/bookstore/getbookcategories'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div
        className="card p-3"
        style={{ display: 'inline-block', width: 'max-content' }}
      >
        <h5 className="text-start">Book Categories</h5>
        <div className="d-flex flex-column align-items-start">
          {categories.map((c) => (
            <div key={c} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={c}
                value={c}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={c}>
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
