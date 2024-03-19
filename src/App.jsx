import Header from "./components/Header";
import InputAddTask from "./components/InputAddTask";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="background-image">
      <Header />
      <InputAddTask />
      <TodoList />
    </div>
  );
}

export default App;
