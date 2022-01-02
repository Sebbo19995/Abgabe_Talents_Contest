import { React } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const GenericDataGrid = (props) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        }];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      ];


    return(
        <>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={props.rows} columns={props.columns} sx={props.sx}/>
            </div>
        </>

    )
}

export default GenericDataGrid;