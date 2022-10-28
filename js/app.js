/* getting the tags */
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");


//getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

//console.log(date, currYear, currMonth);
const months = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(); //getting first week day of the month 0-6
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of the month 1-31
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); //getting last day of the month 0-6
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of the previous month 1-31

   // console.log(lastDateofMonth);
   let liTag = ""; 

   for(let i = firstDateofMonth; i > 0; i--){ //creating li of previous months
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
   }

   for(let i = 1; i<= lastDateofMonth; i++){ //creating li of all days of the current month
    //adding active class to li, if the current day, month, and year matched
    let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                        && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
   }

   for(let i = lastDayofMonth; i < 6; i++){ //creating li of next month for first few days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
   }
   
   
   currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
   daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon =>{
    icon.addEventListener("click", ()=>{ //adding click event o both icons
        //console.log(icon);

        //if clicked icon is previous icon then decrement current mon`th by 1 else increment
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11){
            //creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();  //updating current year with new date year
            currMonth = date.getMonth();  //updating current month with new date month
        }else{  //else pass new Date as date value
            date = new Date();
        }
        
        renderCalendar();
    });
}); 