// login
function loginByClicked() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  // body params for login request
  let params = {
    username: username,
    password: password,
  };
  toggleLoader(true);
  axios
    .post(`${baseUrl}/login`, params)
    .then((res) => {
      toggleLoader(false);

      let token = res.data.token;
      let user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      let modalClose = document.getElementById("closeBtnLogin").click();
      swal("Good job!", "You loged in sucessfully!", "success");
      setNavBar();
    })
    .catch((e) => {
      toggleLoader(false);
      let modalClose = document.getElementById("closeBtnLogin").click();
      swal("OH NO!", e.response.data.message, "error");
    });
}
// end login

// function checkuserLOged in or not

function setNavBar() {
  if (localStorage.getItem("token") !== null) {
    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("login-btn-div").style.display = "none";
    document.getElementById("add-post").style.display = "flex";
    document.getElementById("logout-btn-div").style.display = "flex ";
    // add img of reg and username
    document.getElementById("img-user").src = user.profile_image;
    document.getElementById("name-user").innerHTML = user.username;
  } else {
    document.getElementById("login-btn-div").style.display = "flex ";
    document.getElementById("logout-btn-div").style.display = "none";
    document.getElementById("add-post").style.display = "none";

    // remove img of reg and username

    document.getElementById("img-user").src = "";
    document.getElementById("name-user").innerHTML = "";
  }
}
setNavBar();

// function to logout
function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  swal("You loged out sucessfully!", "See you soon", "success");
  setNavBar();
}

// function of sign up
function signUpByClicked() {
  let regusername = document.getElementById("reg-username").value;
  let regpassword = document.getElementById("reg-password").value;
  let regname = document.getElementById("reg-name").value;
  let image = document.getElementById("reg-img").files[0];

  // body params for login request
  let formData = new FormData();
  formData.append("username", regusername);
  formData.append("password", regpassword);
  formData.append("name", regname);
  formData.append("image", image);
  toggleLoader(true);

  axios
    .post(`${baseUrl}/register`, formData)
    .then((res) => {
      toggleLoader(false);

      let Regtoken = res.data.token;
      let Reguser = res.data.user;
      localStorage.setItem("token", Regtoken);
      localStorage.setItem("user", JSON.stringify(Reguser));
      console.log(res.data);
      let modalClose = document.getElementById("RegcloseBtnLogin").click();
      swal("Good job!", "You Sign up sucessfully!", "success");
      setNavBar();
    })
    .catch((e) => {
      toggleLoader(false);
      let modalClose = document.getElementById("RegcloseBtnLogin").click();
      swal("OH NO!", e.response.data.message, "error");
    });
}

// add new post
function addPostByClicked() {
  let TitlePost = document.getElementById("TitlePost").value;
  let textAreaPost = document.getElementById("textAreaPost").value;
  let imgPost = document.getElementById("imgPost").files[0];
  let formData = new FormData();
  formData.append("title", TitlePost);
  formData.append("image", imgPost);
  formData.append("body", textAreaPost);
  let headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  toggleLoader(true);

  axios
    .post(`${baseUrl}/posts`, formData, {
      headers: headers,
    })
    .then((res) => {
      toggleLoader(false);

      console.log(res);
      let modalClose = document.getElementById("postcloseBtnLogin").click();
      swal("Good job!", "Post Created sucessfully!", "success");
      getPosts();
    })
    .catch((e) => {
      toggleLoader(false);

      let modalClose = document.getElementById("postcloseBtnLogin").click();
      swal("OH NO!", e.response.data.message, "error");
    });
}

// go to details page
function postDetail(id) {
  localStorage.setItem("id", id);
  window.location = "postDetails.html";
}

// function take post from storage
function sendItem(item) {
  let post = JSON.parse(decodeURIComponent(item));
  localStorage.setItem("postToEdit", JSON.stringify(post));
}
// edit post
function editPost() {
  // input to get the value from it to send it to form data
  let post = JSON.parse(localStorage.getItem("postToEdit"));
  let TitleEdit = document.getElementById("Titleedit").value;
  let textAreaEdit = document.getElementById("textAreaPostEdit").value;
  let imgEdit = document.getElementById("imgedit").files[0];
  // form data because we gave an image of file
  let formData = new FormData();
  formData.append("title", TitleEdit);
  formData.append("image", imgEdit);
  formData.append("body", textAreaEdit);
  // because that api make with php we use this dont make it from url of axios direct
  formData.append("_method", "put");
  // headers to send the token to know the user who has this post or not
  let headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  toggleLoader(true);

  axios
    .post(`${baseUrl}/posts/${post.id}`, formData, {
      headers: headers,
    })
    .then((res) => {
      toggleLoader(false);

      console.log(res);
      let modalClose = document.getElementById("postcloseBtnedit").click();
      swal("Good job!", "Post Edited sucessfully!", "success");
      getPosts();
    })
    .catch((e) => {
      toggleLoader(false);
      let modalClose = document.getElementById("postcloseBtnedit").click();
      swal("OH NO!", e.response.data.message, "error");
    });
}

// delete item
function delItem(item) {
  let post = JSON.parse(decodeURIComponent(item));
  localStorage.setItem("postToDelete", JSON.stringify(post));
}
function deletingPost() {
  let postId = JSON.parse(localStorage.getItem("postToDelete")).id;
  let headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  toggleLoader(true);

  axios
    .delete(`${baseUrl}/posts/${postId}`, {
      headers: headers,
    })
    .then((res) => {
      toggleLoader(false);

      console.log(res);
      let modalClose = document.getElementById("postcloseBtnDelete").click();
      swal("deleted successfully", "", "success");
      getPosts();
    })
    .catch((e) => {
      toggleLoader(false);
      let modalClose = document.getElementById("postcloseBtnDelete").click();
      swal("OH NO!", e.response.data.message, "error");
    });
}
// go to my profile page
function myProfile() {
  let userId =
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user")).id
      : "";
  localStorage.setItem("idOfPostsfromUserWhoClicked", userId);
  window.location = "profile.html";
}
