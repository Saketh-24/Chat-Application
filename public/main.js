const socket = io();

const messageConatiner = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on("total-people", (data) => {
  console.log(data);
  let element = document.querySelector("#client-total");
  element.innerHTML = `Group members ${data}`;
});

function sendMessage() {
  console.log(messageInput.value);
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dataTime: new Date(),
  };

  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  console.log(data);
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessaage, data) {
  const newElement = `<li class=${
    isOwnMessaage ? "message-right" : "message-left"
  }>
          <p class="message">
             ${data.message}
            <span>${data.name}</span>
          </p>
        </li>`;
  if (data.message == "") return;
  messageConatiner.innerHTML += newElement;
  scrollToBottom();
}

function scrollToBottom() {
  messageConatiner.scrollTo(0, messageConatiner.scrollHeight);
}
