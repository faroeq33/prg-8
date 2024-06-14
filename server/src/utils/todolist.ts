import axios from "axios";

async function getTodoList() {
  try {
    const response = await axios.get(
      "https://stud.hosted.hr.nl/1041379/takenlijst.txt"
    );
    const todoList = response.data;
    console.log(todoList);
    return todoList as string;
  } catch (error) {
    console.error("Error retrieving todo list:", error);
  }
}

export default getTodoList;
