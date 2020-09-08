'use strict';

let salaryAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeItems = document.querySelectorAll('.income-items'); // Дополнительный доход
let buttonPlusIncome = document.getElementsByTagName('button')[0]; // Плюс, добавить дополнительный доход
let additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Возможный доход
let expensesItems = document.querySelectorAll('.expenses-items'); // Обязательные расходы
let buttonPlusExpenses = document.getElementsByTagName('button')[1]; // Плюс, добавить обязательный расход
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
let checkboxDeposit = document.querySelector('#deposit-check'); // Депозит да/нет
let targetAmount = document.querySelector('.target-amount'); // Цель
let periodSelect = document.querySelector('.period-select'); // Период расчета
let periodAmount = document.querySelector('.period-amount'); // Период расчета число
let startButton = document.getElementById('start'); // Кнопка "Рассчитать"
let resetButton = document.getElementById('cancel'); //Кнопка "Сбросить"

let budgetMonthValue = document.querySelector('.result-budget_month input'); // *Доход за месяц
let budgetDayValue = document.querySelector('.result-budget_day input'); // *Дневной бюджет
let expensesMonthValue = document.querySelector('.result-expenses_month input'); // *Расход за месяц
let additionalIncomeValue = document.querySelector('.result-additional_income input'); // *Возможные доходы
let additionalExpensesValue = document.querySelector('.result-additional_expenses input'); // *Возможные расходы
let incomePeriodValue = document.querySelector('.result-income_period input'); // *Накопления за период
let targetMonthValue = document.querySelector('.result-target_month input'); // *Срок достижения цели в месяцах

const AppData = function () {
   this.budget = 0;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.income = {};
   this.incomeMonth = 0;
   this.addIncome = [];
   this.expenses = {};
   this.expensesMonth = 0;
   this.deposit = false;
   this.percentDeposit = 0;
   this.moneyDeposit = 0;
   this.addExpenses = [];
}

AppData.prototype.check = function () {
   if (salaryAmount.value !== '') {
      startButton.removeAttribute('disabled');
   }
};
AppData.prototype.start = function () {
   if (salaryAmount.value === '') {
      startButton.setAttribute('disabled', 'true');
      return;
   }
   let allInput = document.querySelectorAll('.data input[type = text]');
   allInput.forEach(function (item) {
      item.setAttribute('disabled', 'true');
   });
   checkboxDeposit.disabled = true;
   buttonPlusExpenses.setAttribute('disabled', 'true');
   buttonPlusIncome.setAttribute('disabled', 'true');
   startButton.style.display = 'none';
   resetButton.style.display = 'block';

   this.budget = +salaryAmount.value;

   this.getExpenses();
   this.getIncome();
   this.getExpensesMonth();
   this.getAddExpenses();
   this.getAddIncome();
   this.getBudget();
   // this.getInfoDeposit();
   this.getStatusIncome();
   this.showResult();
   console.log(appData);
};
AppData.prototype.showResult = function () {
   const _this = this;
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = this.budgetDay;
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpenses.join(', ');
   additionalIncomeValue.value = this.addIncome.join(', ');
   targetMonthValue.value = Math.ceil(this.getTargetMonth());
   incomePeriodValue.value = this.calcPeriod();
   periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = _this.calcPeriod();
   });
};
AppData.prototype.addExpensesBlock = function () {
   const cloneExpensesItem = expensesItems[0].cloneNode(true);
   expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
   expensesItems = document.querySelectorAll('.expenses-items');
   if (expensesItems.length === 3) {
      buttonPlusExpenses.style.display = 'none';
   };
};
AppData.prototype.addIncomeBlock = function () {
   const cloneIncomeItem = incomeItems[0].cloneNode(true);
   incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
   incomeItems = document.querySelectorAll('.income-items');
   if (incomeItems.length === 3) {
      buttonPlusIncome.style.display = 'none';
   };
};
AppData.prototype.getExpenses = function () {
   const _this = this;
   expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
         _this.expenses[itemExpenses] = cashExpenses;
      }
   })
};
AppData.prototype.getIncome = function () {
   const _this = this;
   incomeItems.forEach(function (item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
         _this.income[itemIncome] = cashIncome;
      }
   })

   for (let key in this.income) {
      this.incomeMonth += +this.income[key];
   }

};
AppData.prototype.getAddExpenses = function () {
   const addExpenses = additionalExpensesItem.value.split(',');
   const _this = this;
   addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
         _this.addExpenses.push(item);
      }
   })
};
AppData.prototype.getAddIncome = function () {
   const _this = this;
   additionalIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
         _this.addIncome.push(itemValue);
      }
   })
};
AppData.prototype.getExpensesMonth = function () {
   for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
   }
};
AppData.prototype.getBudget = function () {
   this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
   return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
   if (this.budgetDay >= 1200) {
      return ("У вас высокий уровень дохода");
   } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ("У вас средний уровень дохода");
   } else if (this.budgetDay > 0 && this.budgetDay < 600) {
      return ("К сожалению у вас уровень дохода ниже среднего");
   } else {
      return ("Что-то пошло не так");
   };
};
AppData.prototype.getInfoDeposit = function () {
   this.deposit = confirm('Есть ли у Вас депозит в банке?');
   if (this.deposit) {
      do {
         this.percentDeposit = prompt("Какой годовой процент?", 10);
      }
      while (!isNaN(this.percentDeposit) && isFinite(this.percentDeposit))
      do {
         this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNaN(this.moneyDeposit) && isFinite(this.moneyDeposit))
   }
};
AppData.prototype.calcPeriod = function () {
   return this.budgetMonth * periodSelect.value;
};
AppData.prototype.changeRange = function () {
   periodAmount.textContent = periodSelect.value;
};
AppData.prototype.reset = function () {

   let allInputs = document.querySelectorAll('.data input[type = text]');
   let allResults = document.querySelectorAll('.result input[type = text]');

   allInputs.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
   });
   allResults.forEach(function (elem) {
      elem.value = '';
   });
   for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
   };
   for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
   };

   this.budget = 0;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.income = {};
   this.incomeMonth = 0;
   this.addIncome = [];
   this.expenses = {};
   this.expensesMonth = 0;
   this.deposit = false;
   this.percentDeposit = 0;
   this.moneyDeposit = 0;
   this.addExpenses = [];

   buttonPlusIncome.style.display = 'block';
   buttonPlusExpenses.style.display = 'block';
   buttonPlusIncome.disabled = false;
   buttonPlusExpenses.disabled = false;

   checkboxDeposit.disabled = false;
   checkboxDeposit.checked = false;
   periodSelect.disabled = false;

   resetButton.style.display = 'none';
   startButton.style.display = 'block';

   periodSelect.value = '0';
   periodAmount.textContent = '1';

   console.log(appData);
};

AppData.prototype.eventListeners = function () {
   const _this = this;
   startButton.addEventListener('click', _this.start.bind(appData));
   buttonPlusExpenses.addEventListener('click', _this.addExpensesBlock);
   buttonPlusIncome.addEventListener('click', _this.addIncomeBlock);
   salaryAmount.addEventListener('keyup', _this.check);
   resetButton.addEventListener('click', _this.reset.bind(appData));
   periodSelect.addEventListener('input', _this.changeRange);
};

const appData = new AppData();
console.log(appData);
appData.eventListeners();