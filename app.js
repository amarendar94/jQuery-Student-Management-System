var tdata;
var nrows = 10;
var latestPoint = 0;
var currentPoint = 0;
var users = [];
$(document).ready(function () {

  if (!localStorage.allUsers) {
    jQuery.ajax({
      url: "http://127.0.0.1:5500/student.json", success: function (data) {
        localStorage.allUsers = JSON.stringify(data);
        users = JSON.parse(localStorage.allUsers);
        createTable(users, nrows);
      }
    });

  } else {
        //swindow.addEventListener('scroll', myEfficientFn);
        users = JSON.parse(localStorage.allUsers);
        createTable(users, nrows);
    
  }
});

function addStudent(){  
    var obj = {};
    obj.firstname = document.getElementById("firstname").value;
    obj.lastname = document.getElementById("lastname").value;
    obj.email = document.getElementById("email").value;
    obj.location = [];
    obj.location.push(document.getElementById("location").value);
    obj.phone = document.getElementById("phone").value;
    obj.batch = document.getElementById("technology").value;
    obj.address ={};
    obj.address.communication = document.getElementById("comm_address").value;
    obj.address.permanent = document.getElementById("perm_address").value;
    obj.previous_employer = {
        google: "Computer Programmer",
        facebook: "Frontend developer",
        linkedIn: "Software Engineer"
      };   
    users.push(obj);
    localStorage.allUsers = JSON.stringify(users); 
    users = JSON.parse(localStorage.allUsers);   
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("location").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("technology").value = "";
    document.getElementById("comm_address").value = "";
    document.getElementById("perm_address").value = "";
    //nrows=users.length;
    createTable(users,users.length);
    //window.addEventListener('scroll', myEfficientFn);
//    if(nrows==users.length-1){
//        createTable(users,nrows+1);
//    }else{
//        createTable(users,nrows);
//    }
}

function dropdown() {
  var x = $("#sel option:selected").text();
  var a = parseInt(x);
  createTable(users, a);
}

function createTable(data, nrows) {
  $("#display").html('');
    tdata = '';
  for (i = 0; i < nrows; i++) {
    tdata += `<tr id="data_${i}">
  <td id="firstname_${i}">${data[i].firstname}
  </td>
  <td id="lastname_${i}">${data[i].lastname}</td>
  <td id="email_${i}">${data[i].email}</td>
  <td id="location_${i}">${data[i].location}</td>
  <td id="phone_${i}">${data[i].phone}</td>
  <td id="batch_${i}">${data[i].batch}</td>
  <td id="permanent_${i}">${data[i].address.permanent}</td>
  <td id="communication_${i}">${data[i].address.communication}</td>
  <td><input type="button" value = "more details" id="details_${i}" onclick="details(this.id);"/></td>
  <td><input type="button" value = "delete" id="delete_${i}" onclick="deletes(this.id);"/></td>
  <td><input type="button" value = "edit" id="edit_${i}" onclick="editdetails(this.id);"/>
  </td>
  </tr>`;
  }
  $("#display").html(`<table id="myTable"><thead><th>firstname</th><th>lastname</th><th>emailid</th><th>locatiom</th><th>phone</th><th>batch</th><th>Permanent address</th><th>Communication address</th></thead >
  ${tdata}
  </table>`
  );
}


function editdetails(id) {
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("edit", "data");
  // $("#edit_"+i).hide();
  var editdata = $("#" + id1).attr("contenteditable", true);
    
    console.log(id1);
  $("#edit_" + i).attr('value', 'Save');
  $("#edit_" + i).attr('onclick', 'savedata(this.id)');
}

function savedata(id) {

  var ind = parseInt(id.split('_')[1]);
  var firstname = document.getElementById(`firstname_${ind}`).innerHTML;
  var lastname = document.getElementById(`lastname_${ind}`).innerHTML;
  var email = document.getElementById(`email_${ind}`).innerHTML;
  var location = document.getElementById(`location_${ind}`).innerHTML;
  var phone = document.getElementById(`phone_${ind}`).innerHTML;
  var batch = document.getElementById(`batch_${ind}`).innerHTML;
  var permanent = document.getElementById(`permanent_${ind}`).innerHTML;
  var communication = document.getElementById(`communication_${ind}`).innerHTML;
  users[ind].firstname = firstname;
  users[ind].lastname = lastname;
  users[ind].email = email;
  users[ind].location = location;
  users[ind].phone = phone;
  users[ind].batch = batch;
  users[ind].address.permanent = permanent;
  users[ind].address.communication = communication;
  localStorage.allUsers = JSON.stringify(users);
    users = JSON.parse(localStorage.allUsers);
  $("#edit_" + ind).attr('value', 'Edit');
  $("#data_" + ind).attr("contenteditable",false);
  //  console.log("data_" + ind);
  $("#edit_" + ind).attr('onclick', 'editdetails(this.id)');
}

function deletes(id) {
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("delete", "data");
  document.getElementById(id1).remove();
  $(".videt").remove();
  localStorage.allUsers = JSON.stringify(users);
}


function details(id) {
  $(".videt").remove();
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("details", "data");
  var employee = users[i].previous_employer;
  var str = "";
  for (var key in employee) {
    str += key + ":" + employee[key] + ", ";
  }
  console.log(str);
  document.getElementById(id1).insertAdjacentHTML("afterend", `<tr class="videt" id="extended_${i}"> <td> ${str} </td> </tr>`);
}


function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {

    td1 = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    td4 = tr[i].getElementsByTagName("td")[3];
    td5 = tr[i].getElementsByTagName("td")[4];
    td6 = tr[i].getElementsByTagName("td")[5];
    if (td1) {
      if (td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1 || td3.innerHTML.toUpperCase().indexOf(filter) > -1 || td4.innerHTML.toUpperCase().indexOf(filter) > -1 || td5.innerHTML.toUpperCase().indexOf(filter) > -1 || td6.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var myEfficientFn = debounce(function() {
    currentPoint = window.scrollY;
    if(currentPoint-200>latestPoint){
        console.log("hi");
        if(nrows<=(Math.floor(users.length/10)*10)-10){
        nrows+=10;
        createTable(users, nrows);
        }
        else{
           nrows=users.length;
           createTable(users,nrows);
           window.removeEventListener('scroll',myEfficientFn);  
            document.getElementById("message").innerHTML = "No more records";
       }
    }
    
    
    if(currentPoint>latestPoint){
        latestPoint = currentPoint;
    }
}, 0);

window.addEventListener('scroll', myEfficientFn);