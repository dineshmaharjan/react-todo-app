import React from "react";
import '../home/home.css';
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      errors: {},
      todos: [],
      id: 0,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleFormValidation() {
    const { title, description } = this.state;
    let errors = {};
    let isValid = true;

    if (!title) {
      isValid = false;
      errors["title"] = "Title field is empty";
    }

    if (!description) {
      isValid = false;
      errors["description"] = "Description field is empty";
    }

    this.setState({
      errors: errors,
    });
    return isValid;
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const { title, description } = this.state;
      this.setState({
        id: ++this.state.id,
      });
      const todo = {
        id: this.state.id,
        title: title,
        description: description,
      };
      let tempTodo = this.state.todos;
      tempTodo.push(todo);
      this.setState({
        todos: tempTodo,
        title:'',
        description:''
      });

      console.log("pushed" + this.state.todos);
    }
  };

  render() {
    const { todos, errors } = this.state;
    return (
      <div className="container">
        <h3>Todo List</h3>

        <div>
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label><br />
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={this.state.title}
                placeholder="Enter note title"
                onChange={this.handleInputChange}
              /><br />
              {errors["title"] ? (
                <span id="titleError" className="form-text text-muted">
                  {errors["title"]}
                </span>
              ) : (
                ""
              )}
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="description">Description</label><br />
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter note description"
                value={this.state.description}
                onChange={this.handleInputChange}
              /><br/>
              {errors["description"] ? (
                <span id="descriptionError" className="form-text text-muted">
                  {errors["description"]}
                </span>
              ) : (
                ""
              )}
            </div>
            <br />
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
        <br />
        <div>
          <table className="r-table">
            <thead className="table-header">
              <tr>
                <th>S.N.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => {
                console.log("data" + todo.description);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default HomePage;
