import React, { Component } from "react";
import Nav from "./Nav";
import DataTable from "./DataTable";
import API from "../utils/API";
import "../styles/DataArea.css";

export default class DataArea extends Component {

    state = {
        employees: [{}],
        filteredEmployees: [{}],
        order: "descend"
    };

    headings = [
        { name: "Image", width: "10%" },
        { name: "Name", width: "10%" },
        { name: "Phone", width: "20%" },
        { name: "Email", width: "20%" },
        { name: "DOB", width: "10%" }
    ]

    handleSort = heading => {
        if (this.state.order === "descend") {
            this.setState({
                order: "ascend"
            })
        } else {
            this.setState({
                order: "descend"
            })
        }

        const compareFnc = (a, b) => {
            if (this.state.order === "ascend") {
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
        const sortedUsers = this.state.filteredEmployees.sort(compareFnc);
        this.setState({ filteredEmployees: sortedUsers });
    }

    handleSearchChange = event => {
        console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = this.state.employees.filter(item => {
            // merge data together, then see if user input is anywhere inside
            let values = Object.values(item)
                .join("")
                .toLocaleLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({ filteredEmployees: filteredList });
    }
    componentDidMount() {
        API.search().then(res => {
            this.setState({
                employees: res.data.results,
                filteredEmployees: res.data.results
            })
        })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Nav handleSearchChange={this.handleSearchChange} />
                <div className="data-area">
                    <DataTable
                        headings={this.headings}
                        employees={this.state.filteredEmployees}
                        handleSort={this.handleSort}
                    />
                </div>
            </>
        );
    }
}

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
