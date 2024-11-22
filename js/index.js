var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var websiteList = [];

if (JSON.parse(localStorage.getItem("websiteList")) !== null) {
  websiteList = JSON.parse(localStorage.getItem("websiteList"));
}

displayData();

function addWebSite() {
  if (validationName() === true && validationUrl() === true)  {
    let checkName = false;
    for (let i = 0; i < websiteList.length; i++) {
        if (websiteList[i].name === siteName.value) {
            checkName = true;
            break;
        }
    }
    if (checkName) {
      Swal.fire({
        icon: "error",
        text: "The Name Website Existing Or Empty",
      });
        return;
    }

    var website = {
      name: siteName.value,
      url: siteUrl.value,
    };
    websiteList.push(website);
    clearForm();
    displayData();
    localStorage.setItem("websiteList", JSON.stringify(websiteList));
  }
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < websiteList.length; i++) {
    cartona += `   <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${websiteList[i].name}</td>
                    <td><button class="btn text-white" id="visitbtn"><i class="fa-solid fa-eye pe-2"></i>  <a class="text-decoration-none text-white" href="${
                      websiteList[i].url
                    }" target="blank" >Visit</a></button></td>
                    <td><button onclick="deleteWebSite(${i})" class="btn text-white" id="deletebtn"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                  </tr>`;
  }

  document.getElementById("addData").innerHTML = cartona;
}
function clearForm() {
  siteName.value = null;
  siteUrl.value = null;
}
function deleteWebSite(index) {
  websiteList.splice(index, 1);
  displayData();
  localStorage.setItem("websiteList", JSON.stringify(websiteList));
}


function validationName() {
  var regex = /^[a-zA-Z]{3,20}$/;
  var text = siteName.value;
  var msgName = document.getElementById("msgName");
  if (regex.test(text) === true) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else if (regex.test(text) === false) {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    msgName.classList.remove("d-none");
    return false;
  }
}
function validationUrl() {
  var regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var text = siteUrl.value;
  var msgUrl = document.getElementById("msgUrl");
 if (regex.test(text)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    msgUrl.classList.add("d-none");
    return true;
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    msgUrl.classList.remove("d-none");
    return false;
  }
}



