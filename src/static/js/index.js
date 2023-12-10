let chart_generator = ""
topic_data = []
document.getElementsByClassName("topic_names")[0].style.display = 'none'
document.getElementsByClassName("chart")[0].style.display = 'none'
const ctx = document.getElementById('myChart');
topics_selected = []
const url = "http://34.125.36.177:5000"; 

let input = document.getElementsByClassName("input-box");
input[0].addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    my_input()
  }
});



const my_input = async () => {
  value = document.getElementsByClassName("input-box")[0].value;
  if(value.length === 0) {
    return 0;
  }
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

  const data = {
    "input": value,
    "topics": topics_selected
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
  console.log(json)
  // removing loading div
  const element = document.getElementsByClassName("ai-text");
  element[element.length - 1].remove()
  topic_data = json.analytics
  // creating ai generated div
  const div = document.createElement("div");
  div.className = "ai-text";

  // creating ai generated text paragraph
  const robot_div = document.createElement("p")
  const node = document.createTextNode(json.topic+" : "+json.data);
  robot_div.appendChild(node)

  // adding robot icon
  div.appendChild(robot_icon)
  // adding robot text paragraph
  div.appendChild(robot_div);
  // adding to main container
  chat_container.appendChild(div);
};

const topic_checker = () => {
  let checkbox = document.getElementById("select_topics");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      document.getElementsByClassName("topic_names")[0].style.display = 'block'
      document.getElementById("select_analytics").style.display = 'none'
      document.getElementById("analytics_label").style.display = 'none'
    } else {
      document.getElementsByClassName("topic_names")[0].style.display = 'none'
      document.getElementById("select_analytics").style.display = 'inline'
      document.getElementById("analytics_label").style.display = 'inline'
    }
  });
}

const analytics_checker = async () => {
  let checkbox = document.getElementById("select_analytics");
  checkbox.addEventListener("change", async () => {
    if (checkbox.checked) {
      document.getElementById("select_topics").style.display = 'none'
      document.getElementById("topics_label").style.display = 'none'
      document.getElementsByClassName("container")[0].style.display = 'none'
      document.getElementsByClassName("input-container")[0].style.display = 'none'
      document.getElementsByClassName("chart")[0].style.display = 'block'
      document.getElementById("myChart").style.display = 'block'
      const response = await fetch(url+"/analytics")
      const json = await response.json();
      topic_data = json.analytics
      if(chart_generator != "") {
        chart_generator.destroy()
      }
      chart_generator = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            'Health',
            'Environment',
            'Technology',
            'Economy',
            'Entertainment',
            'Sports',
            'Politics',
            'Education',
            'Travel',
            'Food',
            'chit chat'
          ],
          datasets: [{
            label: 'Hits',
            data: topic_data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 0, 0)',
              'rgb(165, 42, 42)',
              'rgb(145, 56, 49)',
              'rgb(255, 68, 51)',
              'rgb(222, 49, 99)',
              'rgb(220, 20, 60)',
              'rgb(169, 92, 104)',
              'rgb(255, 255, 0)'
            ],
            hoverOffset: 4
          }]
        }
      });
    } else {
      document.getElementById("select_topics").style.display = 'inline'
      document.getElementById("topics_label").style.display = 'inline'
      document.getElementsByClassName("container")[0].style.display = 'block'
      document.getElementsByClassName("input-container")[0].style.display = 'flex'
      document.getElementsByClassName("chart")[0].style.display = 'none'
      document.getElementById("myChart").style.display = 'none'
    }
  });
  
}

const topic_adder = (topic) => {
  let checkbox = document.getElementById(topic);
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      topics_selected.push(topic)
    } else {
      topics_selected = topics_selected.filter(element => element != topic)
    }
  });
}