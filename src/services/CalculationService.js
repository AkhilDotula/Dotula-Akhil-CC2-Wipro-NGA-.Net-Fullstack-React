

export const calcSummary = (friends, expenses) => {
    const balanceMap = {};
    // Initialize balances.
    friends.forEach((friend) => {
      balanceMap[friend.id] = 0;
    });
  
    expenses.forEach((exp) => {
      const share = exp.amount / exp.participants.length;
      exp.participants.forEach((pid) => {
        balanceMap[pid] -= share;
      });
      balanceMap[exp.payer] += exp.amount;
    });
  
    return balanceMap;
  };
  
  export const calcTotalExpenses = (expenses) => {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
  };
  