'use strict';

const salaryAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeItems = document.querySelectorAll('.income-items'); // Дополнительный доход
const buttonPlusIncome = document.getElementsByTagName('button')[0]; // Плюс, добавить дополнительный доход
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Возможный доход
let expensesItems = document.querySelectorAll('.expenses-items'); // Обязательные расходы
const buttonPlusExpenses = document.getElementsByTagName('button')[1]; // Плюс, добавить обязательный расход
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const checkboxDeposit = document.querySelector('#deposit-check'); // Депозит да/нет
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount'); // Цель
const periodSelect = document.querySelector('.period-select'); // Период расчета
const periodAmount = document.querySelector('.period-amount'); // Период расчета число
const startButton = document.getElementById('start'); // Кнопка "Рассчитать"
const resetButton = document.getElementById('cancel'); //Кнопка "Сбросить"

const budgetMonthValue = document.querySelector('.result-budget_month input'); // *Доход за месяц
const budgetDayValue = document.querySelector('.result-budget_day input'); // *Дневной бюджет
const expensesMonthValue = document.querySelector('.result-expenses_month input'); // *Расход за месяц
const additionalIncomeValue = document.querySelector('.result-additional_income input'); // *Возможные доходы
const additionalExpensesValue = document.querySelector('.result-additional_expenses input'); // *Возможные расходы
const incomePeriodValue = document.querySelector('.result-income_period input'); // *Накопления за период
const targetMonthValue = document.querySelector('.result-target_month input'); // *Срок достижения цели в месяцах

class AppData {
   constructor() {
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
   check() {
      if (salaryAmount.value !== '') {
         startButton.removeAttribute('disabled');
      }
   }
   start() {
      if (salaryAmount.value === '') {
         startButton.setAttribute('disabled', 'true');
         return;
      }
      const allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach((item) => {
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
      this.getInfoDeposit();
      this.getBudget();
      this.getStatusIncome();
      this.showResult();
   }
   showResult() {
      const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', () => {
         incomePeriodValue.value = _this.calcPeriod();
      });
   }
   addExpensesBlock() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
         buttonPlusExpenses.style.display = 'none';
      };
   }
   addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         buttonPlusIncome.style.display = 'none';
      };
   }
   getExpenses() {
      const _this = this;
      expensesItems.forEach((item) => {
         const itemExpenses = item.querySelector('.expenses-title').value;
         const cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
         }
      });
   }
   getIncome() {
      const _this = this;
      incomeItems.forEach((item) => {
         const itemIncome = item.querySelector('.income-title').value;
         const cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
         }
      });

      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }

   }
   getAddExpenses() {
      const addExpenses = additionalExpensesItem.value.split(',');
      const _this = this;
      addExpenses.forEach((item) => {
         item = item.trim();
         if (item !== '') {
            _this.addExpenses.push(item);
         }
      });
   }
   getAddIncome() {
      const _this = this;
      additionalIncomeItem.forEach((item) => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            _this.addIncome.push(itemValue);
         }
      });
   }
   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }
   getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   }
   getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
   }
   getStatusIncome() {
      if (this.budgetDay >= 1200) {
         return (`У вас высокий уровень дохода`);
      } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
         return (`У вас средний уровень дохода`);
      } else if (this.budgetDay > 0 && this.budgetDay < 600) {
         return (`К сожалению у вас уровень дохода ниже среднего`);
      } else {
         return (`Что-то пошло не так`);
      };
   }
   getInfoDeposit() {
      if (this.deposit) {
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
      }
   }
   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }
   changeRange() {
      periodAmount.textContent = periodSelect.value;
   }
   reset() {

      const allInputs = document.querySelectorAll('.data input[type = text]');
      const allResults = document.querySelectorAll('.result input[type = text]');

      allInputs.forEach((elem) => {
         elem.value = '';
         elem.removeAttribute('disabled');
      });
      allResults.forEach((elem) => {
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

      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
   }
   changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
         depositPercent.style.display = 'inline-block';
         depositPercent.addEventListener('input', this.checkPercent);
         depositPercent.value = '';
      } else {
         depositPercent.value = valueSelect;
         depositPercent.removeEventListener('blur', this.checkPercent);
      }
   }
   checkPercent() {
      if (depositPercent.value > 100) {
         alert("Введите корректное значение в поле проценты");
         // startButton.setAttribute('disabled', 'true');
      }
   }
   depositHandler() {
      if (checkboxDeposit.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);
      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);
      }
   }
   eventListeners() {
      const _this = this;
      startButton.addEventListener('click', _this.start.bind(appData));
      buttonPlusExpenses.addEventListener('click', _this.addExpensesBlock);
      buttonPlusIncome.addEventListener('click', _this.addIncomeBlock);
      salaryAmount.addEventListener('keyup', _this.check);
      resetButton.addEventListener('click', _this.reset.bind(appData));
      periodSelect.addEventListener('input', _this.changeRange);
      checkboxDeposit.addEventListener('change', this.depositHandler.bind(this));
      // checkPersent.addEventListener('keyup')
   }
}

const appData = new AppData();
appData.eventListeners();

// !isNaN(parseFloat(n)) && isFinite(n)
// !isNaN(depositPercent.value) && isFinite(depositPercent.value) && 
// depositPercent.value > 100 || depositPercent.value < 0 || 
// checkPersent() {
//    if (this.deposit && !isNaN(this.percentDeposit) && isFinite(this.percentDeposit)) {
// depositPercent.value.replace(/\s/g, '').length === 0 || 
//    }
// }