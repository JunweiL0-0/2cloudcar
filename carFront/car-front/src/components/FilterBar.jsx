import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CarTable from './CarTable';
import './FilterBar.css';

const FilterSection = () => {
    // Value to be memorised, updated and displayed
    const [filters, setFilters] = useState({
        brand: null,
        year: null,
        model: null,
        carType: null,
        condition: null,
    });
    // Dynamically changing value base on the incoming response
    const [brandOptions, setBrandOptions] = useState([]); // State to store fetched brand data
    const [yearOptions, setYearOptions] = useState([]); // State to store fetched year data
    const [modelOptions, setModelOptions] = useState([]); // State to store fetched model data
    const [carTypeOptions, setCarTypeOptions] = useState([]); // State to store fetched carType data
    const [conditionOptions, setConditionOptions] = useState([]); // State to store fetched condition data
    const [carData, setCarData] = useState([]); // State to store fetched car data
    const [headerText, setHeaderText] = useState('Please select any options to search'); // State for header text
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Function to fetch data from the backend based on filters
    const fetchData = async (appliedFilters = {}) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get('http://localhost:5001/api/car', {
                params: {
                    // Update value or set to default
                    brand: appliedFilters.brand?.value || '',
                    year: appliedFilters.year?.value || '',
                    model: appliedFilters.model?.value || '',
                    carType: appliedFilters.carType?.value || '',
                    usedOrNew: appliedFilters.condition?.value || '',
                },
            });

            const data = response.data; // Store the response into variable
            setCarData(data); // Set the fetched car data

            // Extract distinct values and map for dropdown format
            const distinctBrands = [...new Set(data.map(car => car.Brand))].map(brand => ({ value: brand, label: brand }));
            const distinctYears = [...new Set(data.map(car => car.Year))].map(year => ({ value: year, label: year }));
            const distinctModels = [...new Set(data.map(car => car.Model))].map(model => ({ value: model, label: model }));
            const distinctCarTypes = [...new Set(data.map(car => car.CarType))].map(carType => ({ value: carType, label: carType }));
            const distinctConditions = [...new Set(data.map(car => car.UsedOrNew))].map(condition => ({ value: condition, label: condition }));

            // Update dropdown options dynamically
            setBrandOptions(distinctBrands);
            setYearOptions(distinctYears);
            setModelOptions(distinctModels);
            setCarTypeOptions(distinctCarTypes);
            setConditionOptions(distinctConditions);
        } catch (error) {
            console.error('Error fetching data:', error); // Log error
        } finally {
            setLoading(false); // End loading
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle dropdown change
    const handleChange = (selectedOption, actionMeta) => {
        const updatedFilters = {
            ...filters,
            [actionMeta.name]: selectedOption,
        };
        // Rest filters
        setFilters(updatedFilters);

        // Fetch data again with updated filters
        fetchData(updatedFilters);

        // Update header text based on selected brand and model
        const brand = updatedFilters.brand?.label || '';
        const model = updatedFilters.model?.label || '';
        if (brand && model) {
            setHeaderText(`Searching for ${brand} ${model}`);
        } else if (brand) {
            setHeaderText(`Searching for ${brand}`);
        } else {
            setHeaderText('Please select any options to search');
        }
    };

    // Function to check if any filter is selected
    const isAnyFilterSelected = () => {
        return Object.values(filters).some(filter => filter !== null);
    };

    // Styles for each dropdown box
    const customStyles = {
        control: (base) => ({
            ...base,
            borderRadius: '10px',
            borderColor: '#1abc9c',
            boxShadow: 'none',
            width: '100%',
        }),
        singleValue: (base) => ({
            ...base,
            color: 'black',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'black',
        }),
        menu: (base) => ({
            ...base,
            borderRadius: '10px',
            width: '100%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }),
        option: (base, { isSelected }) => ({
            ...base,
            backgroundColor: isSelected ? '#1abc9c' : 'white',
            color: isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: '#16a085',
                color: 'white',
            },
        }),
    };

    return (
        <div className="filter-section">
            {headerText && <h2>{headerText}</h2>}
            <div className="filter-container">
                <div className="filter-item">
                    <Select
                        name="brand"
                        options={brandOptions}
                        value={filters.brand}
                        onChange={handleChange}
                        placeholder="Select Brand"
                        styles={customStyles}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        name="year"
                        options={yearOptions}
                        value={filters.year}
                        onChange={handleChange}
                        placeholder="Select Year"
                        styles={customStyles}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        name="model"
                        options={modelOptions}
                        value={filters.model}
                        onChange={handleChange}
                        placeholder="Select Model"
                        styles={customStyles}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        name="carType"
                        options={carTypeOptions}
                        value={filters.carType}
                        onChange={handleChange}
                        placeholder="Select Car Type"
                        styles={customStyles}
                    />
                </div>
                <div className="filter-item">
                    <Select
                        name="condition"
                        options={conditionOptions}
                        value={filters.condition}
                        onChange={handleChange}
                        placeholder="Select Condition"
                        styles={customStyles}
                    />
                </div>

                <div className="button-container">
                    <button
                        className="clear-button"
                        onClick={() => {
                            setFilters({
                                brand: null,
                                year: null,
                                model: null,
                                carType: null,
                                condition: null,
                            });
                            fetchData({});
                            setHeaderText('Please select any options to search'); // Clear header text
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                carData.length > 0 ? (
                    <CarTable carData={carData} />
                ) : (
                    <div className="no-results">
                        {isAnyFilterSelected() ? 'No results found.' : 'Please select any options to search.'}
                    </div>
                )
            )}
        </div>
    );
};

export default FilterSection;
