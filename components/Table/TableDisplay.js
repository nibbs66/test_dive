import Table from './Table';


const TableDisplay = ({ title, tableTitle, columns, PageSize, rows, setRows, link, font, textSize}) => {
    return (
        <div className='container flex w-full items-center justify-center '>
            <Table  title={title} tableTitle={tableTitle} rows={rows} columns={columns} setRows={setRows} link={link} PageSize={PageSize} textSize={textSize}  font={font}/>
        </div>
    )
}

export default TableDisplay
