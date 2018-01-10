import React, {Component} from "react";
import firebase from 'firebase';
import {AgGridReact} from "ag-grid-react";


export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.createColumnDefs(),
            gridOptions:this.createGridOptions(),
            rowData: []
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }

    componentDidMount(){

        // var config = {
        //   apiKey: "AIzaSyDkf002b2FOilGV8TgElmTnEvuCPFVS6-0",
        //   authDomain: "react-pwa-f6908.firebaseapp.com",
        //   databaseURL: "https://react-pwa-f6908.firebaseio.com/",
        //   storageBucket: "bucket.appspot.com",
        // };
        //
        // firebase.initializeApp(config);
        this.state={
            columnDefs: this.createColumnDefs(),
            gridOptions:this.createGridOptions(),
            rowData: this.createRowData(),
        }
        console.log('State later in componentDidMount',this.state.rowData);

    }

    createColumnDefs() {
        return [
          {headerName: "Product", field: "Product" ,width:300},
          {headerName: "ProductID", field: "ProductID",width:100},
          {headerName: "Description", field: "Description",width:500},
          {headerName: "Price", field: "Price",width:150},
          {headerName: "Supplier", field: "SupplierID",width:150}
        ];
    }

    createRowData() {
      var dbGoSeva=firebase.database().ref().child('GoSeva');
      var dbProductsList=dbGoSeva.child('ProductCategory');
        console.log('State before createRowData ',this.state.rowData);
        return (
             dbProductsList.on("value",snapshot => {
              let snapshotArray = snapshotToArray(snapshot);
              this.setState({rowData: snapshotArray})
              console.log('State later createRowData',this.state.rowData);

            })
        );
    }

    createGridOptions(){
        return (
          {
            groupSelectsChildren: true,
            groupDefaultExpanded: -1,
            rowSelection: 'multiple',
            groupSelectsChildren: true,
            autoGroupColumnDef: {
                headerName: 'Product',
                field: 'key',
                width: 300,
                editable: true,
                cellRendererParams: {
                    checkbox: true
                }
            },
            defaultColDef: {
                checkboxSelection: function(params) {
                    var isGrouping = params.columnApi.getRowGroupColumns().length > 0;
                    return params.colIndex === 0 && !isGrouping;
                }
            }


          }
        );

    }

    render() {
        let containerStyle = {
            height: 115,
            width: 1050
        };
console.log('State later in render',this.state.rowData);
        return (
            <div style={containerStyle} className="ag-blue">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    gridOptions={this.state.gridOptions}
                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
};

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
