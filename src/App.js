import React, { Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.max_content_id = 3;
        this.state = {
            mode: "welcome",
            selected_content_id: 0,
            welcome: { title: "Welcome", desc: "Hello, React!!" },
            subject: { title: "WEB", sub: "World Wide Web!" },
            contents: [
                { id: 1, title: "HTML", desc: "HTML is for information" },
                { id: 2, title: "CSS", desc: "CSS is for design" },
                { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
            ]
        };
    }
    getReadContent() {
        let i = 0;
        while (i < this.state.contents.length) {
            let data = this.state.contents[i];
            if (data.id === this.state.selected_content_id) {
                return data;
            }
            i += 1;
        }
    }
    getContent() {
        let _title,
            _desc,
            _article = null;
        if (this.state.mode === "welcome") {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        } else if (this.state.mode === "read") {
            let _content = this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
        } else if (this.state.mode === "create") {
            _article = (
                <CreateContent
                    onSubmit={function (_title, _desc) {
                        this.max_content_id += 1;
                        let newContents = Array.from(this.state.contents);
                        newContents.push({
                            id: this.max_content_id,
                            title: _title,
                            desc: _desc
                        });
                        this.setState({
                            contents: newContents,
                            mode: "read",
                            selected_content_id: this.max_content_id
                        });
                    }.bind(this)}
                ></CreateContent>
            );
        } else if (this.state.mode === "update") {
            let _content = this.getReadContent();
            _article = (
                <UpdateContent
                    data={_content}
                    onSubmit={function (_id, _title, _desc) {
                        let newContents = Array.from(this.state.contents);
                        let i = 0;
                        while (i < newContents.length) {
                            if (newContents[i].id === _id) {
                                newContents[i] = { id: _id, title: _title, desc: _desc };
                                break;
                            }
                            i += 1;
                        }
                        this.setState({
                            contents: newContents,
                            mode: "read"
                        });
                    }.bind(this)}
                ></UpdateContent>
            );
        }
        return _article;
    }
    render() {
        console.log("App render");
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function () {
                        this.setState({ mode: "welcome" });
                    }.bind(this)}
                ></Subject>
                <TOC
                    data={this.state.contents}
                    onChangePage={function (id) {
                        this.setState({ mode: "read", selected_content_id: Number(id) });
                    }.bind(this)}
                ></TOC>
                <Control
                    onChangeMode={function (_mode) {
                        if (_mode === "delete") {
                            if (window.confirm("really?")) {
                                let i = 0;
                                let _contents = Array.from(this.state.contents);
                                while (i < _contents.length) {
                                    if (_contents[i].id === this.state.selected_content_id) {
                                        _contents.splice(i, 1);
                                        break;
                                    }
                                    i += 1;
                                }
                                this.setState({
                                    contents: _contents,
                                    mode: "welcome"
                                });
                                alert("deleted!");
                            }
                        } else {
                            this.setState({ mode: _mode });
                        }
                    }.bind(this)}
                ></Control>
                {this.getContent()}
            </div>
        );
    }
}

export default App;
