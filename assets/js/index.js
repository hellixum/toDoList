let dataFetched = false; 
fetchData(); 

function fetchData() {
  if(dataFetched) return; 
  dataFetched = true;
  fetch('http://localhost:3000/getData')
  .then(data => data.json())
  .then(data => {
    // console.log(data); 
    data.forEach(element => {
      addElement(element.name, element.crossed); 
    });
  })
  .catch(err => console.log(err)); 
}


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    const str = ev.target.textContent; 
    fetch('http://localhost:3000/updateData', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: str.substring(0, str.length - 1)
    })
  })
  .then(res => { 
    if(res.status === 400){
      alert("cannot update item"); 
      return ;
    }
    ev.target.classList.toggle('checked');
  })
  .catch(err => console.log(err));
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    fetch('http://localhost:3000/createData', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputValue, 
      crossed: false,
    })
  })
  .then(res => { 
    if(res.status === 400){
      alert("List Item already present"); 
      return ;
    }
    addElement(inputValue, false); 
  })
  .catch(err => console.log(err));
  }
  
  document.getElementById("myInput").value = "";
}

function addElement(inputValue, crossed) {

  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  if(crossed) li.className += 'checked';
  
  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      let str = div.textContent;
      deleteItemRequest(str.substring(0, str.length - 1))
      .then(res => {
        // console.log(res); 
        if(res.status === 400){
          alert("Failed to delete Item"); 
          return ;
        }
        div.style.display = "none";
      })
      .catch(err => console.log(err));
      
    }
  }

}

function deleteItemRequest(innerText){
    return fetch('http://localhost:3000/deleteData', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: innerText
    })
  })

}