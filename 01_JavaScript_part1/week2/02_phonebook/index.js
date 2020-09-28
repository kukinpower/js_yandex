// Телефонная книга

let phoneBook = new Map();
let g_contact;
let currentArr = [];

function filterByNum(number, index)
{
	if (phoneBook.get(g_contact[1]).indexOf(number) === -1)
		phoneBook.get(g_contact[1]).push(number);
}

function findNumToDel(number, index)
{
	if (currentArr.indexOf(number) !== -1)
		phoneBook.get(g_contact[1]).push(number);
}

function addContact(contact)
{
	g_contact = contact;
	var nums = contact[2].split(',');

	if (!(phoneBook.has(contact[1])))
	{
		phoneBook.set(contact[1], nums)
	}
	else {
		nums.forEach(filterByNum);
	}

}

function removeContact(num)
{
	var index;
	var flag = false;

	for (let [key, value] of phoneBook) {
		index = value.indexOf(num);
		if (index !== -1) {
			while (index !== -1) {
				value.splice(index, 1);
				index = value.indexOf(num);
			}
			if (!flag)
				flag = true;
		}
	}
	return flag;
}

function isObjValueExists(obj) {
	for(var i in obj) return true;
	return false;
}

function show()
{
	var sortArr = [];
	for (let [key, value] of phoneBook) {
		if (isObjValueExists(value))
			sortArr.push(`${key}: ${value.join(', ')}`);
	}
	sortArr.sort();
	return sortArr;
}


/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

	if (command.startsWith('ADD')) {
		addContact(command.slice(3).split(' '));
	}
	else if (command.startsWith('REMOVE_PHONE')) {
		return removeContact(command.slice(13));
	}
	else if (command.startsWith('SHOW')) {
		return show();
	}



};

/*
В этом задании необходимо реализовать функцию, через которую можно управлять телефонной книгой.

Для управления телефонной книгой нужно реализовать три команды:
ADD — добавляет контакт
REMOVE_PHONE — удаляет номер
SHOW — возвращает содержимое телефонной книги

Гарантируется, что функция будет вызываться корректно, только со списком перечисленных команд.
Корректность входных данных проверять не нужно.
Имя команды пишется большими буквами, параметры разделяются одним пробелом.
Гарантируется уникальность добавляемых телефонов.

Команда ADD
Добавляет контакт в телефонную книгу со списком телефонов.
Телефоны перечисляются через запятую. Если такой контакт существует, то команда пополняет список телефонов контакта.

Команда REMOVE_PHONE
Удаляет телефон из телефонной книги. Если телефон успешно удалён, то функция должна вернуть true.
Если такого телефона в телефонной книге не существует, то возвращается false.

Команда SHOW
Возвращает массив контактов с их телефонами. Массив содержит строчки вида: "Имя: Телефон1, Телефон2".
Массив должен быть отсортирован по имени контакта. Телефоны идут в порядке добавления их в телефонную книгу.
Контакт с пустым списком телефонов не должен возвращаться.
 */