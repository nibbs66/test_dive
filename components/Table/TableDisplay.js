import Table from './Table';


const TableDisplay = ({ title, tableTitle, columns, PageSize, checked, showFilter,
                          handleReset, activeFilter, setActiveFilter, rows, setRows, link, font,
                          filterData, filterColumns, textSize, handleFilter}) => {
    return (
        <div className='container flex w-full items-center justify-center '>
            <Table  title={title} tableTitle={tableTitle} rows={rows} columns={columns}
                    setRows={setRows} link={link} filterData={filterData} filterColumns={filterColumns} showFilter={showFilter}  handleFilter={handleFilter}
                    PageSize={PageSize} checked={checked} textSize={textSize} handleReset={handleReset} activeFilter={activeFilter} setActiveFilter={setActiveFilter}   font={font}/>
        </div>
    )
}

export default TableDisplay
