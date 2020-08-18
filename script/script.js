// 'use strict';

const startButton = document.getElementById('start');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const checkboxDeposit = document.querySelector('#deposit-check');
const additionalIncome1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncome2 = document.querySelectorAll('.additional_income-item')[1];

const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

console.log(startButton);
console.log(buttonPlusIncome);
console.log('buttonPlusExpenses: ', buttonPlusExpenses);
console.log('checkboxDeposit: ', checkboxDeposit);
console.log('additionalIncome1: ', additionalIncome1);
console.log('additionalIncome2: ', additionalIncome2);
console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);
console.log('salaryAmount: ', salaryAmount);
console.log('incomeTitle: ', incomeTitle);
console.log('incomeAmount: ', incomeAmount);
console.log('additionalIncomeItem1: ', additionalIncomeItem1);
console.log('additionalIncomeItem2: ', additionalIncomeItem2);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpensesItem: ', additionalExpensesItem);
console.log('targetAmount: ', targetAmount);
console.log('periodSelect: ', periodSelect);



// Кнопку "Рассчитать" через id
// Кнопки“ + ”(плюс) через Tag, каждую в своей переменной.
// Чекбокс по id через querySelector
// Поля для ввода возможных доходов(additional_income - item) при помощи querySelectorAll

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса // "-value", начиная с class = "budget_day-value"
// и заканчивая class = "target_month-value" >

// Оставшиеся поля через querySelector каждый в отдельную переменную:
// поля ввода(input) с левой стороны и не забудьте про range.