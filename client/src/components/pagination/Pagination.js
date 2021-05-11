import PaginationComponent from "react-js-pagination";
import './paginator.css';

const Pagination = ({currentPage, itemsCountPerPage,itemCount, onClick}) => {
  return (
    <PaginationComponent
        activePage={currentPage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={itemCount}
        pageRangeDisplayed={5}
        onChange={onClick}
        prevPageText={'<'}
        nextPageText={'>'}
        itemClass={'pagination-item'}
        hideDisabled={'hidden'}
    />
  );
}
 
export default Pagination;