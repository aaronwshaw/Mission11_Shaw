import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import WelcomeBand from './WelcomeBand';

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <WelcomeBand />
        </div>
        <div className="row gx-4">
          <div className="col-md-3">
            <CategoryFilter />
          </div>
          <div className="col-md-9">
            <BookList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
