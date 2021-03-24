import PaginationComponent from "react-js-pagination";
import './paginator.css';

const Pagination = ({currentPage, itemCount, onClick}) => {
  return (
    <PaginationComponent
        activePage={currentPage}
        itemsCountPerPage={2}
        totalItemsCount={itemCount}
        pageRangeDisplayed={5}
        onChange={onClick}
        prevPageText={'<'}
        nextPageText={'>'}
        itemClass={'pagination-item'}
    />
  );
}
 
export default Pagination;