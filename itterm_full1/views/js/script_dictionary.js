function login() {
  const container = document.querySelector(".container");

  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
      const response = await fetch("http://localhost:3333/api/dict", {
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

async function getDicts() {
  let accessToken = localStorage.getItem("accessToken");
  const container = document.querySelector(".dict-container");
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
  fetch("http://localhost:3333/api/dict", {
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
    .then((data) => {
      displayAuthors(data.dicts);
    })
    .catch((error) => {
      console.log("Error fetching dictionary:", error);
      container.innerHTML = "<p style='color:red;'>Failed to load authors.</p>";
    });
}

function displayDicts(data) {
  const container = document.querySelector(".container");
  container.innerHTML = data
    .map(
      (item) => `
      <div
        class="card"
        style="
          background-color: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.2s;
        "
        onmouseover="this.style.transform='scale(1.02)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <img
          src="https://cdn.textstudio.com/output/sample/normal/7/4/3/6/topic-logo-73-16347.png"
          alt="Topic Image"
          style="width: 100%; height: 180px; object-fit: cover;"
        />
        <div style="padding: 15px;">
          <p class="card-text">${item.term}</p>
          <p class="card-text">${item.letter}</p>
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
    const responce = await fetch("http://localhost:3333/api/dict/refresh", {
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
