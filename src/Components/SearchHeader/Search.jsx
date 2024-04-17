import {
  FontAwesomeIcon,
  useState,
  categories,
  Link,
  setSearch,
  useDispatch,
  useSelector,
} from "../../Constants.js";
import "./Search.css";

const Search = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const dispatch = useDispatch();

  return (
    <div className={`${isMenuOpen ? "searchOut opened-menu" : "searchOut"}`}>
      <div className="search container ">
        <div
          className="categories aria-expanded={isMenuOpen}"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
          <p>CATEGORIES</p>
          <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="inputModalSearch"
            placeholder="Search By product name ..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <Link to={`/products`}>
            <button className="btnSearch">
              <FontAwesomeIcon icon="fa fa-search" />
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`product-menu-container ${isMenuOpen ? "opened-menu" : ""}`}
        tabIndex="-1"
        aria-hidden={!isMenuOpen}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="container row">
          {categories.map((category, index) => (
            <div
              key={index}
              className="product-menu-group col-lg-2 col-md-3 col-sm-4 col-xs-12"
            >
              <Link className="product-menu-heading">{category.name}</Link>
              <ul>
                {category.subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <Link className="product-menu-item">{subcategory}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
