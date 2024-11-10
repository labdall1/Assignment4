import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Form, Container, Row, Col, Tab, Nav, Dropdown } from 'react-bootstrap';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoLists, setTodoLists] = useState([{ name: 'All Items', todos: [] }]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '', list: 'All Items' });
  const [newListName, setNewListName] = useState('');

  // Fetch Todo items from backend
  useEffect(() => {
    fetch('http://127.0.0.1:5289/todoitems')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        setTodoLists(prevLists => prevLists.map(list =>
          list.name === 'All Items' ? { ...list, todos: data } : list
        ));
      })
      .catch(error => console.error('Error fetching Todo items:', error));
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prevState => ({ ...prevState, [name]: value }));
  };

  
  const addTodo = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5289/todoitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodos(prevTodos => [...prevTodos, data]);
        setTodoLists(prevLists => prevLists.map(list =>
          list.name === newTodo.list || list.name === 'All Items'
            ? { ...list, todos: [...list.todos, data] }
            : list
        ));
        setNewTodo({ title: '', description: '', dueDate: '', list: 'All Items' }); // Clear input fields after adding
      })
      .catch(error => console.error('Error adding new Todo item:', error));
  };

  
  const addTodoList = (e) => {
    e.preventDefault();
    setTodoLists([...todoLists, { name: newListName, todos: [] }]);
    setNewListName('');
  };

  
  const moveTodo = (todoToMove, newListName) => {
    setTodoLists(todoLists.map(list => {
      if (list.name === newListName) {
        return { ...list, todos: [...list.todos, todoToMove] };
      } else if (list.todos.includes(todoToMove)) {
        return { ...list, todos: list.todos.filter(todo => todo !== todoToMove) };
      } else {
        return list;
      }
    }));
  };

 
  const getVariant = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 2) {
      return 'danger';
    } else if (diffDays <= 4) {
      return 'warning';
    } else if (diffDays <= 7) {
      return 'success';
    } else {
      return 'primary';
    }
  };

  return (
    <Container className="p-3">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center">Assignment 4: ToDo List</h1>
        </Col>
      </Row>
      <Row className="d-flex align-items-start">
        <Col md={4} className="form-container">
          <Form onSubmit={addTodoList}>
            <Form.Group className="mb-3">
              <Form.Label>New List Name</Form.Label>
              <Form.Control
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                required
                placeholder='Add new list'
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add New List
            </Button>
          </Form>

          <Form onSubmit={addTodo} className="mt-4">
            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                placeholder='Add todo item'
                value={newTodo.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="description"
                name="description"
                value={newTodo.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="dueDate">Due Date</Form.Label>
              <Form.Control
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTodo.dueDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="list">List</Form.Label>
              <Form.Control
                as="select"
                id="list"
                name="list"
                value={newTodo.list}
                onChange={handleInputChange}
                required
              >
                {todoLists.map((list, index) => (
                  <option key={index} value={list.name}>{list.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">Add Todo Item</Button>
          </Form>
        </Col>
        <Col md={8}>
          <Tab.Container id="list-tabs" defaultActiveKey="All Items">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {todoLists.map((list, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={list.name}>{list.name}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {todoLists.map((list, index) => (
                    <Tab.Pane eventKey={list.name} key={index}>
                      {list.todos.map((todo, index) => (
                        <ListGroup.Item key={index} variant={getVariant(todo.dueDate)} className="mb-3">
                          <h4>{todo.title}</h4>
                          <p>{todo.description}</p>
                          <p>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
                          <Dropdown onSelect={(newListName) => moveTodo(todo, newListName)} className="float-right">
                            <Dropdown.Toggle variant="success" id={`dropdown-basic${index}`}>
                              Move to...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {todoLists.map((list, listIndex) => (
                                <Dropdown.Item eventKey={list.name} key={listIndex}>{list.name}</Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </ListGroup.Item>
                      ))}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
