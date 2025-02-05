import { useState } from 'react';
import './CarTable.css';

const CarTable = ({ carData }) => {
    const itemsPerPage = 10; // Set number of items to be displayed on the table
    const [currentPage, setCurrentPage] = useState(0); // Calculate current index show items correctly

    // Calculate the total number of pages
    const totalPages = Math.ceil(carData.length / itemsPerPage); // Round up number of pages

    // Get the data for the current page
    const currentData = carData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handle navigation to the previous page
    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    // Handle navigation to the next page
    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    // Extract table headers dynamically, excluding 'id'
    const headers = Object.keys(carData[0] || {}).filter((key) => key !== '_id');

    return (
        <div className="car-table-wrapper">
            <div className="car-table-container">
                <table className="car-table">
                    <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((car, index) => (
                        <tr key={index}>
                            {headers.map((header) => (
                                <td key={header}>{car[header]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CarTable;
