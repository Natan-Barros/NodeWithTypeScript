import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface CreateTransactionDTO {
  title: string;
  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length > 0) {
      const income = this.transactions
        .map(transaction => {
          if (transaction.type === 'income') return transaction.value;
          return 0;
        })
        .reduce((accumulator, current) => accumulator + current);

      const outcome = this.transactions
        .map(transaction => {
          if (transaction.type === 'outcome') return transaction.value;
          return 0;
        })
        .reduce((accumulator, current) => accumulator + current);

      const total = income - outcome;
      return { income, outcome, total };
    }

    return { income: 0, outcome: 0, total: 0 };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
