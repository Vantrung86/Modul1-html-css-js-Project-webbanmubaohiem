let listOrder = JSON.parse(localStorage.getItem("listOrder"));

function renderOrder() {
  let text = "";
  for (let i = 0; i < listOrder.length; i++) {
    text += `
       <tr>
            <td>${i+1}</td>
            <td>${listOrder[i].idOrder}</td>
            <td>${listOrder[i].nameOrder}</td>
            <td>$ ${listOrder[i].totalOrderpay}</td>
            <td>${listOrder[i].dayOrder}</td>
            <td>${listOrder[i].status}</td>
            <td>
                <button onclick="access(${i})" class="btn_common btn_edit">access</button>
                <button onclick="cancel(${i})" class="btn_common btn_delete">cancel</button>
            </td></tr>
       `;
  }
  document.getElementById("renderOrder").innerHTML = text;
}
renderOrder();


//function access
function access(index) {
  let order = { ...listOrder[index] };
  if (order.status == "wait") {
    order.status = "access";
    listOrder[index] = order;
    localStorage.setItem("listOrder", JSON.stringify(listOrder));
    renderOrder();
  }else if (order.status == "access") {
    order.status = "wait";
    listOrder[index] = order;
    localStorage.setItem("listOrder", JSON.stringify(listOrder));
    renderOrder();
    
  }
}


//function cancel
function cancel(index) {
  let order = { ...listOrder[index] };
  if (order.status == "wait") {
    order.status = "cancel";
    listOrder[index] = order;
  }else if (order.status == "cancel") {
    order.status = "wait";
    listOrder[index] = order;
  }
  localStorage.setItem("listOrder", JSON.stringify(listOrder));
  renderOrder();
}
