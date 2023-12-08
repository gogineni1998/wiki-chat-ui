const my_input = async () => {

  value = document.getElementsByClassName("input-box")[0].value;
  document.getElementsByClassName("input-box")[0].value = "";

  // Robot icon creation
  const robot_icon = document.createElement("span");
  robot_icon.className = "material-symbols-outlined"
  const robot_input_text = document.createTextNode("robot");
  robot_icon.append(robot_input_text)

  // person Icon creation
  const user_icon = document.createElement("span");
  user_icon.className = "material-symbols-outlined"
  const user_text = document.createTextNode("person");
  user_icon.append(user_text)


  // loading chat container div
  let chat_container = document.getElementsByClassName("chat-container")[0];

  // creating user input div
  const user_input = document.createElement("div");
  user_input.className = "user-text";
  const user_input_text = document.createTextNode(value);

  // creating user input paragraph
  const input_paragraph = document.createElement("p")
  input_paragraph.appendChild(user_input_text)

  // adding person icon to div
  user_input.appendChild(user_icon)

  // adding user input paragraph to div
  user_input.appendChild(input_paragraph);

  // adding user input to loaded container
  chat_container.appendChild(user_input);

  const url = "http://34.162.110.229:5000";
  const data = {
    input: value,
  };

  // creating loading div
  const rel_div = document.createElement("div");
  rel_div.className = "ai-text";
  const node_rel = document.createTextNode("Loading...");

  // creating loading div paragraph
  rel_paragraph = document.createElement("p")
  rel_paragraph.appendChild(node_rel)

  // adding robot icon
  rel_div.appendChild(robot_icon);
  // adding paragraph to div
  rel_div.appendChild(rel_paragraph)
  // adding div to main container

  chat_container.appendChild(rel_div);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  // removing loading div
  const element = document.getElementsByClassName("ai-text");
  element[element.length-1].remove()

  // creating ai generated div
  const div = document.createElement("div");
  div.className = "ai-text";

  // creating ai generated text paragraph
  const robot_div = document.createElement("p")
  const node = document.createTextNode(json.data);
  robot_div.appendChild(node)

  // adding robot icon
  div.appendChild(robot_icon)
  // adding robot text paragraph
  div.appendChild(robot_div);
  // adding to main container
  chat_container.appendChild(div);
};