import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import DataTable from "./DataTable";
import API from "../utils/API";
import "../styles/DataArea.css";

function DataArea() {
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [order, setOrder] = useState([])

    useEffect(() => {
        loadEmployees()
    }, [])

    function loadEmployees() {
        API.search().then(res => {
            setEmployees(res.data.results);
            setFilteredEmployees(res.data.results);
        })
            .catch(err => console.log(err));
    };

    // state = {
    //     employees: [{}],
    //     filteredEmployees: [{}],
    //     order: "descend"
    // };

    let headings = [
        { name: "Image", width: "10%" },
        { name: "Name", width: "10%" },
        { name: "Phone", width: "20%" },
        { name: "Email", width: "20%" },
        { name: "DOB", width: "10%" }
    ]

    function handleSort(heading) {
        if (order === "descend") {
            setOrder(
                "ascend"
            )
        } else {
            setOrder(
                "descend"
            )
        }

        const compareFnc = (a, b) => {
            if (order === "ascend") {
                // account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                // numerically
                else if (heading === "name") {
                    return a[heading].first.localeCompare(b[heading].first);
                } else {
                    return a[heading] - b[heading];
                }
            } else {
                // account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                // numberically
                else if (heading === "name") {
                    return b[heading].first.localeCompare(a[heading].first);
                } else {
                    return b[heading] - a[heading];
                }
            }
        }
        const sortedUsers = filteredEmployees.sort(compareFnc);
        setFilteredEmployees(sortedUsers);
    }

    function handleSearchChange(event) {
        console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = employees.filter(item => {
            // merge data together, then see if user input is anywhere inside
            let values = Object.values(item)
                .join("")
                .toLocaleLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        setFilteredEmployees(filteredList);
    }

    return (
        <>
            <Nav handleSearchChange={handleSearchChange} />
            <div className="data-area">
                <DataTable
                    headings={headings}
                    employees={filteredEmployees}
                    handleSort={handleSort}
                />
            </div>
        </>
    );

}
export default DataArea;
// handleSearchChange = event => {

// From this.state.employees and event.target.value, generate filteredEmployees
// Save it with setState into this.state.filteredEmployees

//     console.log(this.state.employees);

//     let filteredEmployees = this.state.employees.filter((element) => element.name.first.toUpperCase().startsWith(event.target.value.toUpperCase()));

//     this.setState({ search: event.target.value, filteredEmployees: filteredEmployees });
// }



// const person = {
//     firstName: "Cooper",
//     lastName: "Healey",
//     eat: function() {
//         console.log(`${firstName} ${lastName} eats!`);
//     }
// }
// // A method is a function tied to an object
// person.eat();

// function eat2(potato) {
//     console.log(`${potato.firstName} ${potato.lastName} eats!`);
// }

// const person1 = {
//     firstName: "Hannah",
//     lastName: "Folk",
// }
// eat2(person1);
