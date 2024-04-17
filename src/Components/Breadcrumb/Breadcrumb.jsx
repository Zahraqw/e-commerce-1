import { Link} from "../../Constants";
import "./Breadcrumb.css";
 
const Breadcrumb = ({ Category, CategoryLink, SubCategory, SubCategoryLink, Data }) => {
  return (
    <div>
      <Link className='bread-item' to={CategoryLink}>{Category}</Link>
      <Link className='bread-item' to={SubCategoryLink}>{SubCategory}</Link>
      <span >{Data}</span>
    </div>
  );
};

export default Breadcrumb;
