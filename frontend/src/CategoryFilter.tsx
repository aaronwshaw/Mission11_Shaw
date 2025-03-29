import { useEffect, useState } from 'react';

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/bookstore/getbookcategories'
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
