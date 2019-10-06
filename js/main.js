const sendButton = document.querySelector(".send__button");
const sendInput = document.querySelector('.send__input');
const typeInput = document.getElementsByName('type');

// Get items from LocalStorage

window.addEventListener('load', () => {
    const minusItems = JSON.parse(localStorage.getItem('minusItems'));
    const plusItems = JSON.parse(localStorage.getItem('plusItems'));

    if (minusItems.length > 0){
        minusItems.forEach((item) => {
            createItem('minus', item);
        })
    }
    if (plusItems.length > 0){
        plusItems.forEach((item) => {
            createItem('plus', item);
        });
    };

    calcTotal();
}); 

// Set items to localStorage

window.addEventListener("beforeunload",() => {
    const minusLi = document.querySelectorAll('.minus-list .item');
    const plusLi = document.querySelectorAll('.plus-list .item');
    const minusItems = [];
    const plusItems = [];

    minusLi.forEach((item) => {
        minusItems[minusItems.length] = item.firstChild.textContent;
    });
    plusLi.forEach((item) => {
        plusItems[plusItems.length] = item.firstChild.textContent;
    });

    localStorage.setItem('minusItems', JSON.stringify(minusItems));
    localStorage.setItem('plusItems', JSON.stringify(plusItems));
});

// Add item to list
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

// remove item from list

function createItem(type, value){
    const list = document.querySelector(`.${type}-list`);
    const li = document.createElement('li');
    const spanValue = document.createElement('span'); 
    const removeBtn = document.createElement('button');
    
    li.className = "item";

    spanValue.className = 'value';
    spanValue.textContent = value;

    removeBtn.className = 'remove';
    removeBtn.textContent = 'x';
    removeBtn.addEventListener('click', function(){
        this.parentNode.remove();
        calcTotal();
    })

    li.appendChild(spanValue);
    li.appendChild(removeBtn);
    
    list.appendChild(li);
}

function calcTotal(){
    const listItems = document.getElementsByClassName("item");
    const totalElement = document.querySelector(".total__sum");
    let totalSum = 0;

    for (li of listItems){
        li.parentNode.classList.contains('minus-list') ? totalSum -= Number(li.firstChild.textContent) : totalSum += Number(li.firstChild.textContent);
    };

    totalElement.textContent = totalSum;
}
