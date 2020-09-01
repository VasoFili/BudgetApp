'use strict';

const salaryAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeItems = document.querySelectorAll('.income-items'); // Дополнительный доход
const buttonPlusIncome = document.getElementsByTagName('button')[0]; // Плюс, добавить дополнительный доход
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Возможный доход
const additionalIncome1 = document.querySelectorAll('.additional_income-item')[0]; // Возможный доход1
const additionalIncome2 = document.querySelectorAll('.additional_income-item')[1]; // Возможный доход2
let expensesItems = document.querySelectorAll('.expenses-items'); // Обязательные расходы
const buttonPlusExpenses = document.getElementsByTagName('button')[1]; // Плюс, добавить обязательный расход
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const checkboxDeposit = document.querySelector('#deposit-check'); // Депозит да/нет
const targetAmount = document.querySelector('.target-amount'); // Цель
const periodSelect = document.querySelector('.period-select'); // Период расчета
let periodAmount = document.querySelector('.period-amount'); // Период расчета число
const startButton = document.getElementById('start'); // Кнопка "Рассчитать"
const resetButton = document.getElementById('cancel'); //Кнопка "Сбросить"

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0]; // *Доход за месяц
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; // *Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; // *Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; // *Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // *Возможные расходы
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; // *Накопления за период
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // *Срок достижения цели в месяцах


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
         this.incomeMonth += +this.income[key];
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
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      appData.budgetDay = Math.floor(this.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return targetAmount.value / this.budgetMonth;

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
      return this.budgetMonth * periodSelect.value;
   },
   reset: function () {

      let allInputs = document.querySelectorAll('.data input[type = text]');
      let allResults = document.querySelectorAll('.result input[type = text]');

      allInputs.forEach(function (elem) {
         elem.value = '';
         elem.disabled = false;
      });
      allResults.forEach(function (elem) {
         elem.value = '';
      });
      for (let i = 1; i < incomeItems.length; i++) {
         incomeItems[i].remove(incomeItems[i]);
      };
      for (let i = 1; i < expensesItems.length; i++) {
         expensesItems[i].remove(expensesItems[i]);
      };

      appData.income = [];
      appData.incomeMonth = 0;
      appData.budget = 0;
      appData.addIncome = [];
      appData.expenses = {};
      appData.addExpenses = [];
      appData.deposit = false;
      appData.percentDeposit = 0;
      appData.moneyDeposit = 0;
      appData.budgetMonth = 0;
      appData.expensesMonth = 0;
      appData.accumulatedMonth = 0;
      appData.targetMonth = 0;
      appData.budgetDay = 0;

      buttonPlusIncome.style.display = 'block';
      buttonPlusExpenses.style.display = 'block';
      buttonPlusIncome.disabled = false;
      buttonPlusExpenses.disabled = false;

      checkboxDeposit.disabled = false;
      periodSelect.disabled = false;

      resetButton.style.display = 'none';
      startButton.style.display = 'block';

      periodSelect.value = '0';
      periodAmount.textContent = '1';

   }
};

const start = function () {

   appData.budget = +salaryAmount.value;

   appData.getExpenses();
   appData.getIncome();
   appData.getExpensesMonth();
   appData.getAddExpenses();
   appData.getAddIncome();
   appData.getBudget();
   appData.showResult();

   // const allInput = document.querySelectorAll([type = 'text']);
   // const allInput = document.querySelectorAll('input[type="text"]'); (ЭТО НЕ РАБОТАЕТ)
   // allInput.disabled = true;
   salaryAmount.disabled = true;
   let allIncomeTitles = document.querySelectorAll('.income-title');
   for (let i = 0; i < allIncomeTitles.length; i++) {
      allIncomeTitles[i].disabled = true;
   };
   let allIncomeAmounts = document.querySelectorAll('.income-amount');
   for (let i = 0; i < allIncomeAmounts.length; i++) {
      allIncomeAmounts[i].disabled = true;
   };
   let allExpensesTitles = document.querySelectorAll('.expenses-title');
   for (let i = 0; i < allExpensesTitles.length; i++) {
      allExpensesTitles[i].disabled = true;
   };
   let allExpensesAmounts = document.querySelectorAll('.expenses-amount');
   for (let i = 0; i < allExpensesAmounts.length; i++) {
      allExpensesAmounts[i].disabled = true;
   };
   buttonPlusIncome.disabled = true;
   additionalIncome1.disabled = true;
   additionalIncome2.disabled = true;
   buttonPlusExpenses.disabled = true;
   additionalExpensesItem.disabled = true;
   checkboxDeposit.disabled = true;
   targetAmount.disabled = true;
   periodSelect.disabled = true;

   resetButton.style.display = 'block';
   startButton.style.display = 'none';

};

startButton.addEventListener('click', start.bind(appData));
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeRange);
periodSelect.addEventListener('input', appData.showResult);
resetButton.addEventListener('click', appData.reset);
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