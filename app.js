let data = JSON.parse(localStorage.getItem('todos'))


let addBtn = document.getElementById('addBtn'),
    addMsg = document.getElementById('addTitle'),
    addPrior = document.getElementById('addPrior'),
    delbtn = document.getElementById('delBtn')
    block = document.querySelector('.TODO')

let items = data ?? []


addBtn.addEventListener('click', addElement)
delbtn.addEventListener('click', delAllItem)

function delAllItem(){
    items.splice(0,items.length);
    showElements()
    console.log(0)
}
function addElement() {
    console.log('add')
    let item = {
        'todo': addMsg.value,
        'checked': false,
        'prior': addPrior.value
    }
    items.push(item)

    localStorage.setItem('todos', JSON.stringify(items))

    showElements()
    console.log(items)
}

function showElements() {
    block.innerHTML = ''
    items.forEach(function (item, index) {
        let newBlock = `
        <div id="${index}" class="item ${ item.checked ? 'checkedTOdo' : ''} ${ getColor(item.prior) }">
            <input type="checkbox" class='checkbox' data-eid="${index}" ${ item.checked ? 'checked="checked"' : ''}" id="item_${index} '">
            <label for="item_${index}">${item.todo}</label>
            <img data-eid=' ${index}' class='item_icon_del' src='./delete.png'>
            <div class="up_down">
            ${ index > 0 ? "<img data-eid='" + index + "' class='item_icon' src='./arrow-up.png'>" : ''}
            ${ index < items.length-1 ? "<img data-eid='" + index + "' class='item_icon_down' src='./arrow-down.png'>" : ''} 
            </div>
        </div>
        `
        block.innerHTML += newBlock
    })
    let checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(function (el, index) {
        el.addEventListener('change', checkboxHandler)
    })

    let upItemBtns = document.querySelectorAll('div.item img.item_icon')
    upItemBtns.forEach(function (el, index) {
        el.addEventListener('click', upItemPosition)
    })

    let deleteItemBtns = document.querySelectorAll('div.item img.item_icon_del')
    deleteItemBtns.forEach(function (el, index) {
        el.addEventListener('click', deleteItemBtn)
    })
    let downItemBtns = document.querySelectorAll('div.item img.item_icon_down')
    downItemBtns.forEach(function (el, index) {
        el.addEventListener('click', downItemPosition)
    })
}

function deleteItemBtn(event){
    let el = event.currentTarget,
        Index = el.dataset.eid
        items.splice(Index,1);
      
    showElements()
    console.log(items)
    
}
function downItemPosition(event) {
    let el = event.currentTarget,
        fromIndex = el.dataset.eid,
        toIndex = fromIndex + 1,
        tmp_ar = items.splice(fromIndex, 1)[0]
        items.splice(toIndex, 0, tmp_ar)
        //console.log(tmp_ar)
        console.log(items)
        showElements()
}
function getColor(prior) {
    switch(prior) {
        case '1':
            return 'opt1'
            break
        case '2':
            return 'opt2'
            break
        case '3':
            return 'opt3'
            break
		case '4':
			return 'opt4'
			break		    
        default:
            return 'nocolor'
    }
}

function upItemPosition(event) {
    let el = event.currentTarget,
        fromIndex = el.dataset.eid,
        toIndex = fromIndex - 1,
        tmp_ar = items.splice(fromIndex, 1)[0]
        items.splice(toIndex, 0, tmp_ar)
        //console.log(tmp_ar)
        console.log(items)
        showElements()
}

function checkboxHandler(event) {
    let el = event.currentTarget,
        index = el.dataset.eid
    console.log(items[index])
    items[index].checked = !items[index].checked
    console.log(items)
    showElements()
}

if (items) showElements()