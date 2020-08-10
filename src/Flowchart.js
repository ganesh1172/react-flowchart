import React, { Component } from "react";
import "./flowchart.css";

export default class Flowchart extends Component {
    constructor() {
        super();
        this.state = {
            // value: "",
            structure: {
                id: 1,
                value: "start",
                node: null
            },
            // structure1: {
            //     id: 1,
            //     value: "start",
            //     node: {
            //         id: 2,
            //         value: "email",
            //         node: [
            //             {
            //                 id: 3,
            //                 value: "left",
            //                 node: null
            //             },
            //             {
            //                 id: 5,
            //                 value: "right",
            //                 node: null
            //             }
            //         ]
            //     }
            // }
        };
    }


    //function to check condition value 1 or 2
    getChart(type) {
        if (type === "1") {
            return {
                id: this.getUniqueId(),
                value: "start",
                node: null
            };
        } else {
            return {
                id: this.getUniqueId(),
                value: "Condition",
                node: [
                    {
                        id: this.getUniqueId(),
                        value: "left_child",
                        node: null
                    },
                    {
                        id: this.getUniqueId(),
                        value: "right_child"
                    }
                ]
            };

        }
    }

    //function to add element on the basis of input
    add(id) {
        // console.log(value);
        let data = JSON.parse(JSON.stringify(this.state.structure));
        let path = this.getPath(data, id);
        console.log("r " + path, data);
        let object = eval("data" + path);

        const input = prompt("Please enter value");
        if (!input) {
            return null;
        }
        object.node = this.getChart(input);

        this.setState({ structure: data });

        console.log(data);
    }

    // function to delete a element
    delete(id) {
        let data = JSON.parse(JSON.stringify(this.state.structure));
        let path = this.getPath(data, id);
        console.log("r " + path);
        eval("delete data" + path);

        this.setState({ structure: data });

        console.log("sss", data);
    }

    getPath(o, id, path = "") {
        // console.log(o.value, o.value === value);

        if (o && o.id === id) {
            return path;
        }
        if (o && o.node !== undefined) {
            if (Array.isArray(o.node)) {
                //      console.log('arr', o.node);

                for (let i = 0; i < o.node.length; i++) {
                    let r = this.getPath(o.node[i], id, path + ".node[" + i + "]");
                    if (r) {
                        return r;
                    }
                }
                //        console.log(io);
            } else {
                path = path + ".node";
                return this.getPath(o.node, id, path);
            }
        }
        return null;
    }

    // function to generate unique_id for element
    getUniqueId() {
        return Math.random()
            .toString(16)
            .slice(2);
    }

    //function to generate flowchart
    getUi(o) {
        // if no object return null
        if (!o) {
            return null;
        }

        //storing elements
        let valueNode = (
            <div className="elelemnt_wrap" key={o.value}>
                <div className="element" >
                    {" "}
                    {o.value}
                    <div className="del_element" onClick={() => this.delete(o.id)}>
                        Delete
          </div>
                </div>
                <div className="arrow"></div>
                <div className="add_element" onClick={() => this.add(o.id)}>+</div>
                <div className="arrow"></div>
            </div>
        );

        // to create two array
        let child = [];

        //if not in object then return single value
        if (!o.node) {
            return valueNode;
        }

        if (Array.isArray(o.node)) {
            o.node.forEach(io => {
                console.log(child);
                child.push(this.getUi(io));
            });
        } else {
            child.push(this.getUi(o.node));
        }

        let html = (
            <div
                key={Math.random()
                    .toString(16)
                    .slice(2)}
            >
                {valueNode}
                <div className="row">{child}</div>
            </div>
        );
        return html;
    }

    render() {
        return <div className="container">{this.getUi(this.state.structure)}</div>;
    }
}
