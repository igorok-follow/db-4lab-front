function update_selection() {
  document.querySelector('#add_button').disabled = false;
  var tbl = document.getElementById('output_table'), rIndex;

  for (var i = 0; i < tbl.rows.length; i++) {
    tbl.rows[i].onclick = function () {
      rIndex = this.rowIndex;
      document.cookie = "current_pk_selected=" + this.cells[0].innerHTML;
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
  try {
      var json;

      fetch('http://localhost:65000/api/get/details', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        document.cookie = "tab=details"
        json = JSON.stringify(response);
        var obj = JSON.parse(json);
        tableClear();
        tableCreate(obj.details.map(value => Object.values(value)));
        update_selection();
      });
  } catch (e) {
      return e;
  }
}

function show_products() {
  try {
      var json;

      fetch('http://localhost:65000/api/get/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        document.cookie = "tab=products"
        json = JSON.stringify(response);
        var obj = JSON.parse(json);
        console.log(obj);
        tableClear();
        tableCreateProducts(obj.products.map(value => Object.values(value)));
        update_selection();
      });
  } catch (e) {
      return e;
  }
}

function show_materials() {
  try {
      var json;

      fetch('http://localhost:65000/api/get/materials', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        document.cookie = "tab=materials"
        json = JSON.stringify(response);
        var obj = JSON.parse(json);
        tableClear();
        tableCreate(obj.materials.map(value => Object.values(value)));
        update_selection();
      });
  } catch (e) {
      return e;
  }
}

function delete_item() {
  try {
      var json;
      var addr;
      var body;

      var tab = getCookie('tab');
      switch(tab) {
      case 'details':
        addr = 'http://localhost:65000/api/delete/details';
        body = JSON.stringify({"detail_name": getCookie('current_pk_selected')});
        break;
      case 'products':
        addr = 'http://localhost:65000/api/delete/products';
        body = JSON.stringify({"id": getCookie('current_pk_selected')});
        break;
      case 'materials':
        addr = 'http://localhost:65000/api/delete/materials';
        body = JSON.stringify({ "material_name": getCookie('current_pk_selected')});
        break;
      }

      console.log(getCookie('current_pk_selected'));

      fetch(addr, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: body,
      })
      .then(response => {
        console.log(response.status);
        if (response.status == 200) {
          alert("Удалено");
        }
        switch(tab) {
        case 'details':
          show_details();
          break;
        case 'products':
          show_products();
          break;
        case 'materials':
          show_materials();
          break;
        }
      });
  } catch (e) {
      return e;
  }
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

function tableCreateProducts(params) {
  tbl = document.getElementById("output_table")

  for (let i = 0; i < params.length; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < params[i].length; j++) {
      const td = tr.insertCell();

      if (j != 2) {
        td.appendChild(document.createTextNode(params[i][j]));
      } else {
        td.appendChild(document.createTextNode(params[i][j].map(value => Object.values(value))));
      }
      td.style.border = '1px solid black';
    }
  }
}
