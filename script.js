function update_selection() {
  tab = getCookie('tab');

  document.querySelector('#add_button').disabled = false;
  var tbl = document.getElementById('output_table'), rIndex;

  for (var i = 0; i < tbl.rows.length; i++) {
    tbl.rows[i].onclick = function () {
      rIndex = this.rowIndex;

      document.cookie = "old_pk_selected=" + this.cells[0].innerHTML;
      switch(tab){
        case 'details':
          document.cookie = "current_pk_selected=" + this.cells[0].innerHTML + '%%%' + this.cells[1].innerHTML + '%%%' + this.cells[2].innerHTML;
          break;
        case 'materials':
          document.cookie = "current_pk_selected=" + this.cells[0].innerHTML + '%%%' + this.cells[1].innerHTML;
          break;
        case 'products':
          document.cookie = "current_pk_selected=" + this.cells[0].innerHTML + '%%%' + this.cells[2].innerHTML + '%%%' + this.cells[1].innerHTML;
          break;
      }


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

      fetch('http://194.67.67.119:65000/api/get/details', {
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

      fetch('http://194.67.67.119:65000/api/get/products', {
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

      fetch('http://194.67.67.119:65000/api/get/materials', {
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
      pk = getCookie('current_pk_selected').split('%%%')[0];
      switch(tab) {
      case 'details':
        addr = 'http://194.67.67.119:65000/api/delete/details';
        body = JSON.stringify({"detail_name": pk});
        break;
      case 'products':
        addr = 'http://194.67.67.119:65000/api/delete/products';
        body = JSON.stringify({"id": pk});
        break;
      case 'materials':
        addr = 'http://194.67.67.119:65000/api/delete/materials';
        body = JSON.stringify({ "material_name": pk});
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

function check_empty() {
    tab = getCookie('tab');
    current_action = getCookie('current_action');
    
    switch(tab) {
    case 'details':
      switch(current_action) {
      case 'add':
          add_details();
          break;
      case 'update':
          update_details();
          break;
      }
      break;
            
    case 'products':
            
      switch(current_action) {
      case 'add':
          add_products();
          break;
      case 'update':
          update_products();
          break;
      }
      break;
            
    case 'materials':
            
      switch(current_action) {
      case 'add':
          add_materials();
          break;
      case 'update':
          update_materials();
          break;
      }
      break;
    }
}

function add_details() {
    try {
      var tab = getCookie(tab);
      var addr;
      var body;

      var name = document.getElementById('add_detail_name').value;
      var weight = document.getElementById('add_detail_weight').value;
      var material_name = document.getElementById('add_detail_material').value;

      addr = 'http://194.67.67.119:65000/api/insert/details';
      body = JSON.stringify({ "detail": {
          "name": name,
          "weight": weight,
          "material_name": material_name
      }});

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
          alert("Добавлено");
        } else {
          alert("Деталь с таким наименованием уже существует");
        }
        document.getElementById('add_detail_form').submit();
        show_details();
      });
  } catch (e) {
      return e;
  }
}
function add_products() {
  arr = read_products_details_table();

  try {
      var tab = getCookie(tab);
      var addr;
      var body;

      var name = document.getElementById('add_product_name').value;

      addr = 'http://194.67.67.119:65000/api/insert/products';
      body = JSON.stringify({ "product": {
          "name": name,
          "details": arr
      }});

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
          alert("Добавлено");
        } else {
          alert("Продукт с таким наименованием уже существует");
        }
        document.getElementById('add_product_form').submit();
        show_products();
      });
  } catch (e) {
      return e;
  }
}

function read_products_details_table2() {
  tbl = document.getElementById('update_product_details');

  var rowLength = tbl.rows.length;

  const arr = [];

  console.log(rowLength);
  for (let i = 0; i < rowLength; i++){
    var oCells = tbl.rows.item(i).cells;
    var cellLength = oCells.length;

    var pk = oCells.item(0).innerHTML;
    var pk_amount = document.getElementById('amount_input' + i).value;
    if (pk_amount > 0) {
      arr.push({"name": pk, "amount": parseInt(pk_amount)});
    }
  }

  return arr;
}

function read_products_details_table() {
  tbl = document.getElementById('add_product_details');

  var rowLength = tbl.rows.length;

  const arr = [];

  console.log(rowLength);
  for (let i = 0; i < rowLength; i++){
    var oCells = tbl.rows.item(i).cells;
    var cellLength = oCells.length;

    var pk = oCells.item(0).innerHTML;
    var pk_amount = document.getElementById('amount_input' + i).value;
    if (pk_amount > 0) {
      arr.push({"name": pk, "amount": parseInt(pk_amount)});
    }
  }

  return arr;
}

function add_materials() {
    try {
      var tab = getCookie(tab);
      var addr;
      var body;

      var name = document.getElementById('add_material_name').value;
      var cost = document.getElementById('add_material_cost').value;
      addr = 'http://194.67.67.119:65000/api/insert/materials';
      body = JSON.stringify({ "material": {
          "name": name,
          "cost_per_gram": cost
      }});

      fetch(addr, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: body,
      })
      .then(response => {
        if (response.status == 200) {
          alert("Добавлено");
        } else {
          alert("Материал с таким наименованием уже существует");
        }
        document.getElementById('add_material_form').submit();
        show_materials();
      });
  } catch (e) {
      return e;
  }
}

function update_details() {
    try {
      var tab = getCookie(tab);
      var old_pk_selected = getCookie('old_pk_selected');
      var addr;
      var body;
      
      addr = 'http://194.67.67.119:65000/api/update/details';
      body = JSON.stringify({ "detail": {
          "name": document.getElementById('update_detail_name').value,
          "weight": document.getElementById('update_detail_weight').value,
          "material_name": document.getElementById('update_detail_material').value,
          "old_name": old_pk_selected
      }});

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
          alert("Изменено");
        } else {
          alert("Ошибка");
        }
        document.getElementById('update_detail_form').submit();
        show_details();
      });
  } catch (e) {
      return e;
  }
}

function update_products() {
  arr = read_products_details_table2();

  try {
      var tab = getCookie(tab);
      var addr;
      var body;
      pk = getCookie('current_pk_selected');
      pks = pk.split('%%%');

      var name = document.getElementById('update_product_name').value;

      addr = 'http://194.67.67.119:65000/api/update/products';
      body = JSON.stringify({ "product": {
          "id": parseInt(pks[0]),
          "name": name,
          "details": arr
      }});

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
          alert("Изменено");
        } else {
          alert("Ошибка");
        }
        document.getElementById('add_product_form').submit();
        show_products();
      });
  } catch (e) {
      return e;
  }
}

function update_materials() {
    try {
      var tab = getCookie(tab);
      var old_pk_selected = getCookie('old_pk_selected');
      var addr;
      var body;

      // get all values by item id's   
      addr = 'http://194.67.67.119:65000/api/update/materials';
      body = JSON.stringify({ "material": {
          "name": document.getElementById('update_material_name').value,
          "cost_per_gram": document.getElementById('update_material_cost').value,
          "old_name": old_pk_selected,
      }});

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
          alert("Изменено");
        } else {
          alert("Ошибка");
        }
        document.getElementById('update_material_form').submit();
        show_materials();
      });
  } catch (e) {
      return e;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function updateAmountsInAdditionalTable() {
  tbl = document.getElementById('update_product_details');
  var rowLength = tbl.rows.length;
  pk = getCookie('current_pk_selected');
  pks = pk.split('%%%');
  pks = pks[1].split(',');
  console.log(pks.length);
  console.log(pks);

  for (let i = 0; i < rowLength; i++){
    var oCells = tbl.rows.item(i).cells;
    var cellLength = oCells.length;

    for (var j = 0; j < pks.length; j+=2) {
      if (pks[j] == oCells.item(0).innerHTML) {
        console.log(oCells.item(0).innerHTML + "   /   " + pks[j] + " " + pks[j+1]);
        document.getElementById('amount_input' + i).value = pks[j+1];
      }
    }
  }
}

function change_popup_show() {
  tab = getCookie('tab');
  document.cookie = "current_action=update";
  switch(tab) {
    case 'details':
      document.getElementById('changedetails').style.display = "flex";

      pk = getCookie('current_pk_selected');

      pks = pk.split('%%%');
      if (pks.length != 3) {
        return;
      }

      document.getElementById('update_detail_name').value = pks[0];
      document.getElementById('update_detail_weight').value = pks[1];
      document.getElementById('update_detail_material').value = pks[2];
      break;


    case 'products':
      document.getElementById('changeproducts').style.display = "flex";

      try {
        var details;

        fetch('http://194.67.67.119:65000/api/get/details', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
          },
        })
        .then(response => response.json())
        .then(response => {
          json = JSON.stringify(response);
          var obj = JSON.parse(json);
          details = obj.details.map(value => Object.values(value));
          updateAdditionalTableCreate(details);
          updateAmountsInAdditionalTable();

          pk = getCookie('current_pk_selected');

          pks = pk.split('%%%');

          document.getElementById('update_product_name').value = pks[2];
        });
      } catch(e) {
        return e;
      }
      break;
      break;

    case 'materials':
      document.getElementById('changematerials').style.display = "flex";

      pk = getCookie('current_pk_selected');

      pks = pk.split('%%%');
      if (pks.length != 2) {
        return;
      }
      document.getElementById('update_material_name').value = pks[0];
      document.getElementById('update_material_cost').value = pks[1];
      break;
  }
}

function change_popup_hide(){
  tab = getCookie('tab');
  switch(tab) {
    case 'details':
      document.getElementById('changedetails').style.display = "none";
      break;
    case 'products':
      document.getElementById('changeproducts').style.display = "none";
      document.getElementById('update_product_details').innerHTML = '';
      break;
    case 'materials':
      document.getElementById('changematerials').style.display = "none";
      break;
  }
}

function add_popup_show() {
  tab = getCookie('tab');
  document.cookie = "current_action=add";
  switch(tab) {
    case 'details':
      document.getElementById('adddetails').style.display = "flex";
      break;
    case 'products':
      document.getElementById('addproducts').style.display = "flex";

      try {
        var details;

        fetch('http://194.67.67.119:65000/api/get/details', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
          },
        })
        .then(response => response.json())
        .then(response => {
          json = JSON.stringify(response);
          var obj = JSON.parse(json);
          details = obj.details.map(value => Object.values(value));
          additionalTableCreate(details);
        });
      } catch(e) {
        return e;
      }
      break;
    case 'materials':
      document.getElementById('addmaterials').style.display = "flex";
      break;
  }
}
function add_popup_hide(){
  tab = getCookie('tab');
  switch(tab) {
    case 'details':
      document.getElementById('adddetails').style.display = "none";
      document.getElementById('add_detail_form').reset();
      break;
    case 'products':
      document.getElementById('addproducts').style.display = "none";
      document.getElementById('add_product_form').reset();
      document.getElementById('add_product_details').innerHTML = '';
      break;
    case 'materials':
      document.getElementById('addmaterials').style.display = "none";
      document.getElementById('add_materials_form').reset();
      break;
  }
}

function updateAdditionalTableCreate(params) {
  tbl = document.getElementById("update_product_details");

  for (let i = 0; i < params.length; i++) {
    const tr = tbl.insertRow();
    td = tr.insertCell();
    td.appendChild(document.createTextNode(params[i][0]));
    td = tr.insertCell();
    div = document.createElement("div");
    div.setAttribute("class", "details_amount_input");
    input = document.createElement("input");
    input.setAttribute("id", "amount_input" + i);
    input.setAttribute("type", "number");
    input.setAttribute("step", 1);
    input.setAttribute("value", 0);
    input.setAttribute("size", 10);
    div.appendChild(input);
    td.appendChild(div);
    
    td.style.border = '1px solid black';
  }
}

function additionalTableCreate(params) {
  tbl = document.getElementById("add_product_details");

  for (let i = 0; i < params.length; i++) {
    const tr = tbl.insertRow();
    td = tr.insertCell();
    td.appendChild(document.createTextNode(params[i][0]));
    td = tr.insertCell();
    div = document.createElement("div");
    div.setAttribute("class", "details_amount_input");
    input = document.createElement("input");
    input.setAttribute("id", "amount_input" + i);
    input.setAttribute("type", "number");
    input.setAttribute("step", 1);
    input.setAttribute("value", 0);
    input.setAttribute("size", 10);
    div.appendChild(input);
    td.appendChild(div);
    
    td.style.border = '1px solid black';
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
