document.getElementById("hobbyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const hobbyName = document.getElementById("hobbyName").value.trim();
  if (!hobbyName) return;
  try {
    const res = await fetch("https://hobbyback.onrender.com/api/hobby/createhobby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: hobbyName }),
    });

    if (res.ok) {
      document.getElementById("hobbyName").value = "";
      fetchHobbies();
    } else {
      alert("Failed to add hobby");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error adding hobby");
  }
});

async function deleteHobby(id) {
  try {
    const res = await fetch(
      `https://hobbyback.onrender.com/api/hobby/deletehobby/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      fetchHobbies(); // Refresh the list after successful deletion
    } else {
      alert("Failed to delete hobby");
    }
  } catch (error) {
    console.error("Error deleting hobby:", error);
  }
}

async function fetchHobbies() {
  try {
    const res = await fetch("https://hobbyback.onrender.com/api/hobby/showhobby");
    const data = await res.json();
    const list = document.getElementById("hobbyList");
    list.innerHTML = "";
    data.forEach((hobby) => {
      const li = document.createElement("li");
      li.textContent = hobby.name;
      // Add a delete button to each list item
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.onclick = () => deleteHobby(hobby._id); // Pass the unique MongoDB ID
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching hobbies:", error);
  }
}

fetchHobbies();
