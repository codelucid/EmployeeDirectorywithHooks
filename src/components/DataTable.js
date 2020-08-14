import React from "react";
import DataBody from "./DataBody.js";
import "../styles/DataTable.css";



function DataTable({ headings, employees, handleSort }) {
    return (
        <div className="datatable mt-5">
            <table id="table" className="table table-striped table-hover table-condensed">
                <thead className="thead-dark">
                    <tr>
                        {headings.map(({ name, width }) => {
                            return (
                                <th
                                    className="col"
                                    key={name}
                                    style={{ width }}
                                    onClick={() => {
                                        handleSort(name.toLowerCase());
                                    }}
                                >
                                    {name}
                                    <span className="pointer"></span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <DataBody employees={employees} />
            </table>
        </div>
    );
}

export default DataTable;