document.addEventListener("DOMContentLoaded", () => {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeChat = document.getElementById("close-chat");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  chatbotIcon.addEventListener("click", () => {
    chatbotContainer.style.display =
      chatbotContainer.style.display === "none" ||
      chatbotContainer.style.display === ""
        ? "flex"
        : "none";
  });

  closeChat.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
      addMessage("You", message);
      userInput.value = "";

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        addMessage("Bot", data.response);
      } catch (error) {
        console.error("Error:", error);
        addMessage(
          "Bot",
          "I'm sorry, I encountered an error. Please try again."
        );
      }
    }
  });

  function addMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender.toLowerCase()}-message`);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  addMessage(
    "Bot",
    "Hello! How can I assist you with your travel plans in Nepal today?"
  );
});
