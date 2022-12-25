function show_details() {
  // create async req and parse json -> create table

  var arr = [['12', '12'],['12', '12'],['12', '12']];
  tableCreate(arr);
}

function show_products() {

}

function show_materials() {

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
function add_popup_show() {
  document.getElementById('abc').style.display = "block";
}
function add_popup_hide(){
  document.getElementById('abc').style.display = "none";
}

function tableCreate(params) {
  tbl = document.getElementById("output_table")

  for (let i = 0; i < params.length; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < params[i].length; j++) {
      console.log(params[j]);
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(params[i][j]));
      td.style.border = '1px solid black';
    }
  }
}