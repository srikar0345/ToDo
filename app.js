document.addEventListener('DOMContentLoaded', () => {
    const tdItemsContainer = document.getElementById("tdItemsContainer");
    const addtdButton = document.getElementById("addtdButton");
    const savetdButton = document.getElementById("savetdButton");
    const message = document.getElementById("message");

    const gettdListFromLocalStorage = () => {
        const stringifiedtdList = localStorage.getItem("tdList");
        return stringifiedtdList ? JSON.parse(stringifiedtdList) : [];
    };

    let tdList = gettdListFromLocalStorage();
    let count = tdList.length;

    const saveTasks = () => {
        localStorage.setItem("tdList", JSON.stringify(tdList));
        message.textContent = "Tasks saved locally";
        message.classList.add("para");
    };

    const onAddtd = () => {
        const userInputElement = document.getElementById("tdUserInput");
        const userInputValue = userInputElement.value.trim();

        if (!userInputValue) {
            alert("Enter Valid Text");
            return;
        }

        message.textContent = "Click to save locally";
        message.classList.remove("para");
        message.classList.add("para0");

        count += 1;
        const newtd = { text: userInputValue, uniqueNo: count, isChecked: false };
        tdList.push(newtd);
        createAndAppendtd(newtd);
        userInputElement.value = "";
    };

    const onStatusChange = (checkboxId, labelId, tdId) => {
        const checkboxElement = document.getElementById(checkboxId);
        const labelElement = document.getElementById(labelId);
        labelElement.classList.toggle("checked");

        const tdObject = tdList.find(td => `td${td.uniqueNo}` === tdId);
        tdObject.isChecked = !tdObject.isChecked;
    };

    const onDeletetd = (tdId) => {
        const tdElement = document.getElementById(tdId);
        tdElement.classList.add('remove');
        setTimeout(() => {
            tdItemsContainer.removeChild(tdElement);
            tdList = tdList.filter(td => `td${td.uniqueNo}` !== tdId);
        }, 300);
    };

    const createAndAppendtd = (td) => {
        const tdId = `td${td.uniqueNo}`;
        const checkboxId = `checkbox${td.uniqueNo}`;
        const labelId = `label${td.uniqueNo}`;

        const tdElement = document.createElement("li");
        tdElement.classList.add("td-item-container", "d-flex", "flex-row", "fade-in");
        tdElement.id = tdId;

        const inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = checkboxId;
        inputElement.checked = td.isChecked;
        inputElement.onclick = () => onStatusChange(checkboxId, labelId, tdId);
        inputElement.classList.add("checkbox-input");
        tdElement.appendChild(inputElement);

        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container", "d-flex", "flex-row");
        tdElement.appendChild(labelContainer);

        const labelElement = document.createElement("label");
        labelElement.setAttribute("for", checkboxId);
        labelElement.id = labelId;
        labelElement.classList.add("checkbox-label");
        labelElement.textContent = td.text;
        if (td.isChecked) labelElement.classList.add("checked");
        labelContainer.appendChild(labelElement);

        const deleteIconContainer = document.createElement("div");
        deleteIconContainer.classList.add("delete-icon-container");
        labelContainer.appendChild(deleteIconContainer);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
        deleteIcon.onclick = () => onDeletetd(tdId);
        deleteIconContainer.appendChild(deleteIcon);

        tdItemsContainer.appendChild(tdElement);
    };

    addtdButton.onclick = onAddtd;
    savetdButton.onclick = saveTasks;

    tdList.forEach(td => createAndAppendtd(td));
});
