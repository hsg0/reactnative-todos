import { ImageBackground, Text, TextInput, View, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import yellowandgreen from "../assets/images/yellowandgreen.png";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { data } from "../data/todos.js";

export default function Index() {
  const [todos, setTodos] = useState(data);
const [text, setText] = useState("");

const addTodo = () => {
  if(text.trim()) {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id: newId, title: text, completed: false };
    setTodos([...todos, newTodo]);
    setText("");
  }
}

const removeTodo = (id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
}
  

const toggleTodo = (id) => {
  setTodos(
    todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    })
  );
};

return (
  <ImageBackground source={yellowandgreen} style={styles.imageBackground}>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter todo"
            style={styles.textInput}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Pressable style={styles.button} onPress={addTodo}>
            <Text>Add Todo</Text>
          </Pressable>
        </View>
        <View style={styles.listView}>
          {todos.map((todo, index) => (
            <View key={index} style={styles.todolist1}>
              <Pressable onPress={() => toggleTodo(todo.id)}>
                <Text
                  style={[
                    styles.todolistText,
                    todo.completed && { textDecorationLine: "line-through" },
                  ]}
                >
                  {todo.title}
                </Text>
              </Pressable>
              <FontAwesome6
                onPress={() => {
                  removeTodo(todo.id);
                }}
                style={styles.trash}
                name="trash-can"
                size={24}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  textInput: {
    height: 40,
    flex: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 5,
  },
  button: {
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  listView: {
    width: "90%",
    marginTop: 20,
  },
  todolist1: {
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between text and icon
    alignItems: "center", // Align items vertically center
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "white",
  },
  todolistText: {
    flex: 1, // Take available space
    color: "black",
  },
  trash: {
    color: "red",
    marginLeft: 10, // Add some space between text and icon
  },
});