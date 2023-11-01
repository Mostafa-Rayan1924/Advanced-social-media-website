// the begin of url of the api
const baseUrl = "https://tarmeezacademy.com/api/v1";
let idOfPostsfromUserWhoClicked =
  localStorage.getItem("idOfPostsfromUserWhoClicked") !== null
    ? localStorage.getItem("idOfPostsfromUserWhoClicked")
    : "";
console.log(idOfPostsfromUserWhoClicked);
function showUserInfo() {
  toggleLoader(true);

  axios
    .get(`${baseUrl}/users/${idOfPostsfromUserWhoClicked}`)
    .then(function (response) {
      toggleLoader(false);
      let userInfo = response.data.data;
      console.log(userInfo);
      document.getElementById("user-email").innerHTML = userInfo.email;
      document.getElementById("user-name").innerHTML = userInfo.name;
      document.getElementById("user-username").innerHTML = userInfo.username;
      document.getElementById("user-post-count").innerHTML =
        userInfo.posts_count;
      document.getElementById("username-title-posts").innerHTML =
        userInfo.username;
      document.getElementById("user-img").src = userInfo.profile_image;
      document.getElementById("user-commnets-count").innerHTML =
        userInfo.comments_count;
    });
}
showUserInfo();

function getPosts() {
  let content = "";
  toggleLoader(true);
  axios
    .get(`${baseUrl}/users/${idOfPostsfromUserWhoClicked}/posts`)
    .then(function (response) {
      // handle success
      toggleLoader(false);

      let posts = response.data.data;

      document.querySelector(".user-posts").innerHTML = "";
      posts.map((item) => {
        // show edit btn
        let userId =
          localStorage.getItem("user") != null
            ? JSON.parse(localStorage.getItem("user")).id
            : "";
        let btnContent = ``;
        if (userId == item.author.id) {
          btnContent = `
          <button
          data-te-toggle="modal"
      data-te-target="#edit"
      data-te-whatever="@mdo"
           onclick=(sendItem('${encodeURIComponent(
             JSON.stringify(item)
           )}')) type="button"
           class="inline-block  text-[10px] p-[5px] rounded-full  sm:px-6 sm:pb-2 sm:pt-2.5 sm:text-xs bg-slate-800  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mx-1"> Edit
           </button>
  
           <button
           data-te-toggle="modal"
           data-te-target="#delInfo"
           data-te-whatever="@mdo"
           onclick=(delItem('${encodeURIComponent(
             JSON.stringify(item)
           )}')) type="button"
           class="inline-block  text-[10px] p-[5px] rounded-full  sm:px-6 sm:pb-2 sm:pt-2.5 sm:text-xs bg-red-800  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mx-1"> Delete
           </button>
           `;
        }
        content += `
        <div  class="post my-10" >
        <div
          class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div
            class="border-b-2 flex items-center border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
            <img
              class="w-10 h-10 rounded-full border border-[#ccc] mx-1 object-cover "
              src="${item.author.profile_image}"
             
              alt="" />
            <h2 style="width:200px;">${item.author.username}</h2>
            <div class="flex justify-end  w-full">
  
             ${btnContent}
            
          </div>
          </div>
          <div style="cursor:pointer;" class="p-6" onclick=(postDetail(${
            item.id
          }))>
            <img class="max-w-full w-full imgPost object-cover rounded-lg" src="${
              item.image
            }" alt="" />
            <h6 class="mt-2 text-stone-400">${item.created_at}</h6>
            <h3 class="my-2">${item.title == null ? "" : item.title}</h3>
            <p>
             ${item.body}
            </p>
          </div>
          <div
            class="border-t-2 border-neutral-100 dark:border-neutral-600 dark:text-neutral-50"></div>
          <span class="px-6"
            ><i class="fa-solid fa-pen-clip mr-1 py-[20px] text-sky-600"></i>
           (${item.comments_count}) comments </span>
           
         
        </div>
      </div>
        `;
      });
      document.querySelector(".user-posts").innerHTML += content;
    });
  showUserInfo();
}
getPosts();
