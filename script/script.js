'use strict';

const startButton = document.getElementById('start');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const checkboxDeposit = document.querySelector('#deposit-check');
// const additionalIncome1 = document.querySelectorAll('.additional_income-item')[0];
// const additionalIncome2 = document.querySelectorAll('.additional_income-item')[1];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

document.addEventListener('DOMContentLoaded', function () {
   startButton.disabled = true;
});

const isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
   income: [],
   incomeMonth: 0,
   budget: 0,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   accumulatedMonth: 0,
   targetMonth: 0,
   budgetDay: 0,

   start: function () {

      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();

      // appData.getInfoDeposit();
      // appData.calcSavedMoney();
   },
   showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();
   },
   addExpensesBlock: function () {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         buttonPlusExpenses.style.display = 'none';
      };
   },
   addIncomeBlock: function () {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         buttonPlusIncome.style.display = 'none';
      };
   },
   getExpenses: function () {
      expensesItems.forEach(function (item) {
         const itemExpenses = item.querySelector('.expenses-title').value;
         const cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
         }
      })
   },
   getIncome: function () {
      incomeItems.forEach(function (item) {
         const itemIncome = item.querySelector('.income-title').value;
         const cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
         }
      })

      for (let key in appData.income) {
         appData.incomeMonth += +appData.income[key];
      }

   },
   getAddExpenses: function () {
      const addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
         item = item.trim();
         if (item !== '') {
            appData.addExpenses.push(item);
         }
      })
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(function (item) {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      })
   },
   changeRange: function () {
      periodAmount.textContent = periodSelect.value;
   },
   getExpensesMonth: function () {
      for (let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return targetAmount.value / appData.budgetMonth;

   },
   getStatusIncome: function () {
      if (appData.budgetDay >= 1200) {
         return ("У вас высокий уровень дохода");
      } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
         return ("У вас средний уровень дохода");
      } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
         return ("К сожалению у вас уровень дохода ниже среднего");
      } else {
         return ("Что-то пошло не так");
      };
   },
   getInfoDeposit: function () {
      appData.deposit = confirm('Есть ли у Вас депозит в банке?');
      if (appData.deposit) {
         do {
            appData.percentDeposit = prompt("Какой годовой процент?", 10);
         } while (!isNumber(appData.percentDeposit))
         do {
            appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
         } while (!isNumber(appData.moneyDeposit))
      }
   },
   calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
   }
};

startButton.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeRange);
periodSelect.addEventListener('input', appData.showResult);

// salaryAmount.addEventListener('input', function () {
//    if (salaryAmount.value !== '') {
//       startButton.style.display = 'block';
//    } else {
//       startButton.style.display = 'none';
//    }
// });

salaryAmount.addEventListener('input', function () {
   if (salaryAmount.value !== '') {
      startButton.disabled = false;
   } else {
      startButton.disabled = true;
   }
});