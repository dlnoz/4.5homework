let elForm = document.querySelector(".site-form ")

let elImgInput = document.querySelector(".choose-img-input")
let elImg = document.querySelector(".choose-img")


let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos(todos, elForm.nextElementSibling);

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    let todo = {
        id: todos[todos.length -1]?.id ? todos[todos.length -1].id +1 : 1,
        title: evt.target.todo.value,
        isComplated: false,
        image:elImg.src
    }
    todos.push(todo)
    evt.target.reset()

    renderTodos(todos, elForm.nextElementSibling)

    elImg.src = null
    elImg.classList.remove("h-[200px]")
})

  function renderTodos(arr, list){
   list.innerHTML = null
   arr.forEach((item,index) =>{
    let elItem = document.createElement("li")
        elItem.className = `${item.isComplated ? "line-through opacity-[70%] cursor-not-allowed" : "" } duration-300 p-5  `
        elItem.innerHTML = `
        <div class="flex items-center justify-between ">
               <div class=" flex flex-col gap-3">
                    <div class="text-center">
                    <strong class="font-semibold text-green-600 hover:text-white duration-400" >${item.title}</strong>
                    </div>
                    <div class="flex items-center gap-2">
                    <label>
                    <input id="complate" class="hidden" type="checkbox" >
                    <div onclick="handleChekcClick(${item.id})"  id="complate"  class="w-[20px] relative flex items-center justify-center h-[20px] rounded-full border-[1px]  border-slate-500">
                    <div id="complate" class="${item.isComplated ? "bg-red-900" : ""} absolute inset-[2px] mx-auto rounded-full "></div>
                    </div>
                    </label>
                    <strong class="font-semibold text-white">${index +1}.</strong>
                    <button id="edit"  class="bg-transparent border-[2px] border-blue-500 font-semibold  hover:text-blue-500 duration-400 text-white p-2 rounded-md w-[70px] sm:w-[100px]" >Tahrirlash</button>
                    <button id="delete" class="bg-transparent border-[2px] border-red-500 font-semibold hover:text-red-500 duration-400 text-white p-2 rounded-md w-[70px] sm:w-[100px]"  >O'chirish</button>
                    </div>
             </div>
        </div>        
           <img class=" ${item.image.includes("null") ? "hidden" : ""} mt-[8px] ml-[50px]  mx-auto rounded-md  object-cover" src="${item.image}" alt="photo" width="200" height="200" />
        `
         list.appendChild(elItem)

         elItem.addEventListener("click", function (e) {
            if(e.target.id == "delete"){
                todos.splice(index, 1)
                renderTodos(todos, elForm.nextElementSibling)
                localStorage.setItem("todos", JSON.stringify(todos))
            }

            else if(e.target.id == "edit"){
                if(!item.isComplated){
                    let newValue = prompt(item.title)
                    todos[index].title = newValue
                    renderTodos(todos, elForm.nextElementSibling)
                    localStorage.setItem("todos", JSON.stringify(todos))
                }
            }

         })   

    })

   localStorage.setItem("todos", JSON.stringify(todos));

  }


  function handleChekcClick(id){
    let findObj = todos.find(item => item.id == id)
    findObj.isComplated = !findObj.isComplated
    renderTodos(todos, elForm.nextElementSibling)
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  elImgInput.addEventListener("change", function (e){
    console.log(URL.createObjectURL(e.target.files[0]))
    elImg.src = URL.createObjectURL(e.target.files[0])
    elImg.classList = "h-[200px]"

  })