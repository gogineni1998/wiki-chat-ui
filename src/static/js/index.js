const my_input = async () => {
  const b = document.getElementsByClassName("chat-container")[0];
  const user_input = document.createElement("div");

  value = document.getElementsByClassName("input-box")[0].value;
  document.getElementsByClassName("input-box")[0].value = "";
  user_input.className = "user-text";
  const user_input_text = document.createTextNode(value);
  user_input.appendChild(user_input_text);
  b.appendChild(user_input);

  const url = "http://34.162.110.229:5000";
  const data = {
    input: value,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  const a = document.getElementsByClassName("chat-container")[0];
  const div = document.createElement("div");
  div.className = "ai-text";
  const node = document.createTextNode(json.data);
  div.appendChild(node);
  a.appendChild(div);
};