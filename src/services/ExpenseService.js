
export const createExpense = (expenseArray, expenseObj) => {
    return [...expenseArray, expenseObj];
  };
  
  export const editExpense = (expenseArray, expenseId, updatedData) => {
    return expenseArray.map((exp) =>
      exp.id === expenseId ? { ...exp, ...updatedData } : exp
    );
  };
  
  export const removeExpenseFromArray = (expenseArray, expenseId) => {
    return expenseArray.filter((exp) => exp.id !== expenseId);
  };
  