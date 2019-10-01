const sendButton = document.querySelector(".send__button");
const sendInput = document.querySelector('.send__input');
const typeInput = document.getElementsByName('type');
console.log(typeInput);

sendButton.addEventListener('click', () => {
    if (sendInput.value === '' || !parseInt(sendInput.value)){
        return;
    }

    const valueInput = sendInput.value;
    let activeType;

    if (typeInput[0].checked){
        activeType = typeInput[0].value;
    } else {
        activeType = typeInput[1].value;
    }

    createItem(activeType, valueInput);
    calcTotal();
    sendInput.value = '';
})

function createItem(type, value){
    const list = document.querySelector(`.${type}-list`);
    const li = document.createElement('li');

    li.className = "item";
    li.textContent = value;

    list.appendChild(li);
}

function calcTotal(){
    const listItems = document.getElementsByClassName("item");
    const totalElement = document.querySelector(".total__sum");
    let totalSum = 0;

    for (li of listItems){
        li.parentNode.classList.contains('minus-list') ? totalSum -= Number(li.textContent) : totalSum += Number(li.textContent);
    };

    totalElement.textContent = totalSum;
}
