import { React } from 'react';
import { DataGrid } from "@mui/x-data-grid";

const GenericDataGrid = (props) => {
    
    return(
        <>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={props.rows} columns={props.columns} sx={props.sx}/>
            </div>
        </>

    )
}

export default GenericDataGrid;