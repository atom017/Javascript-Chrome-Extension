const saveBtn = document.getElementById("input-btn");
const input = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById('tab-btn');

let myLeads =[];

function dump(){
    let deletes = document.querySelectorAll('.delete');
    
    deletes.forEach((item)=>item.addEventListener('click',function(){
        const link = this.previousElementSibling.getAttribute('href');
        myLeads = myLeads.filter((lead) => lead !== link);
        console.log(myLeads);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        ulEl.removeChild(this.parentElement);    
    }));
      
}
deleteBtn.addEventListener('click',function(){
    console.log('clicked');
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


saveBtn.addEventListener('click',saveLead);
let leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocal){
    myLeads = leadsFromLocal;
    render(myLeads);
    dump();
}


const tabs = [{url:'https://www.youtube.com'}];
tabBtn.addEventListener('click',function(){

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
        dump();
      });

    
});


function render(leads){
    let listItems = "";

    for(let i =0; i< leads.length; i++){
        //ulEl.innerHTML += `<li>${myLeads[i]}</li>` 
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
                <span class='delete'>x</span>
            </li>
        `
    }

    ulEl.innerHTML = listItems;
}


function saveLead(){
    if(input.value !== ''){
        myLeads.push(input.value);
    
        input.value ="";
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
        dump();
    }
   
}


