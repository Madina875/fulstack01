function login() {
  const container = document.getElementById("loginForm");
  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/topic/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      console.error("Error during login:", error);
      container.innerHTML = "<p style='color:red;'>Login failed.</p>";
    }
  });
}

async function getTopic() {
  let accessToken = localStorage.getItem("accessToken");
  const grid = document.querySelector(".topics-grid");
  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);

  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("AccessToken vaqti otib keygan ");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }
  fetch("http://localhost:3000/api/topic", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, //authorization
      "Content-Type": "application/json",
    },
  })
    .then((responce) => {
      if (!responce.ok) {
        throw new Error("Fetch failed responce status: ", responce.status);
      }
      return responce.json();
    })
    .then((topics) => {
      displayTopic(topics.topic);
    })
    .catch((error) => {
      console.log("Error fetching dictionary:", error);
      grid.innerHTML = "<p style='color:red;'>Failed to load topics.</p>";
    });
}

function displayTopic(topics) {
  const grid = document.querySelector(".topics-grid");
  grid.innerHTML = topics
    .map(
      (topic) => `
          <div class="card" style="
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            
            <img
              src="https://cdn.textstudio.com/output/sample/normal/7/4/3/6/topic-logo-73-16347.png"
              alt="Topic Image"
              style="width: 100%; height: 180px; object-fit: cover;"
            />
            
            <div style="padding: 15px;">
              <p style="margin: 8px 0;"><strong>Created:</strong> ${new Date(
                topic.created_date
              ).toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Updated:</strong> ${new Date(
                topic.updated_date
              ).toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Author ID:</strong> ${
                topic.author_id
              }</p>
              <p style="margin: 8px 0;"><strong>Approved:</strong> ${
                topic.is_approved ? "Yes" : "No"
              }</p>
              <p style="margin: 8px 0;"><strong>Checked:</strong> ${
                topic.is_checked ? "Yes" : "No"
              }</p>
            </div>
          </div>
        `
    )
    .join("");
}

function getTokenExpTime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken() {
  const loginUrl = "/login";
  try {
    const responce = await fetch("http://localhost:3000/api/topic/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await responce.json();

    if (data.error && data.error == "jwt expired") {
      console.log("Refresh tokenning vaqti chiqib ketgan");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordamida yangilandi ");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}
