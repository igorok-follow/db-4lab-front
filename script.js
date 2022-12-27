function update_selection() {
  document.querySelector('#add_button').disabled = false;
  var tbl = document.getElementById('output_table'), rIndex;

  for (var i = 0; i < tbl.rows.length; i++) {
    tbl.rows[i].onclick = function () {
      rIndex = this.rowIndex;
      console.log(this.cells[0].innerHTML + this.cells[1].innerHTML);
      for (var j = 0; j < tbl.rows.length; j++) {
        tbl.rows[j].classList.remove("selected");
      }
      this.classList.add("selected");

      document.querySelector('#change_button').disabled = false;
      document.querySelector('#delete_button').disabled = false;
    }
  }

  document.querySelector('#change_button').disabled = true;
  document.querySelector('#delete_button').disabled = true;
}

function show_details() {
  // create async req and parse json -> create table
  document.cookie = "tab=details;";
  var arr = [['12', '21'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12'],['12', '12']];
  tableClear();
  tableCreate(arr);
  update_selection();
}

function show_products() {
  document.cookie = "tab=products"
  var arr = [['13', '13'],['13', '13'],['13', '13']];
  tableClear();
  tableCreate(arr);
  update_selection();
}

function show_materials() {
  document.cookie = "tab=materials"
  var arr = [['14', '14'],['14', '14'],['14', '14']];
  tableClear();
  tableCreate(arr);
  update_selection();
}

function delete_details() {

}

function delete_materials() {
  
}

function delete_products() {
  
}

function check_empty() {
  if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
    alert("Fill All Fields !");
  } else {
    document.getElementById('form').submit();
    alert("Form Submitted Successfully...");
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function add_popup_show() {
  tab = getCookie('tab');
  switch(tab) {
    case 'details':
      document.getElementById('adddetails').style.display = "block";
      break;
    case 'products':
      document.getElementById('addproducts').style.display = "block";
      break;
    case 'materials':
      document.getElementById('addmaterials').style.display = "block";
      break;
  }
}
function add_popup_hide(){
  tab = getCookie('tab');
  switch(tab) {
    case 'details':
      document.getElementById('adddetails').style.display = "none";
      break;
    case 'products':
      document.getElementById('addproducts').style.display = "none";
      break;
    case 'materials':
      document.getElementById('addmaterials').style.display = "none";
      break;
  }
}

function tableCreate(params) {
  tbl = document.getElementById("output_table")

  for (let i = 0; i < params.length; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < params[i].length; j++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(params[i][j]));
      td.style.border = '1px solid black';
    }
  }
}

function tableClear() {
  tbl = document.getElementById("output_table");

  tbl.innerHTML = '';
}