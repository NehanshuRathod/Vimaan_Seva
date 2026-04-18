class Wallet {
    constructor({ _id, userId, balance }) {
        this._id = _id;
        this.userId = userId;
        this.balance = balance || 50000;
    }

    hasSufficientFunds(amount) {
        return this.balance >= amount;
    }

    deduct(amount) {
        if (!this.hasSufficientFunds(amount)) {
            throw new Error("Insufficient wallet balance");
        }
        this.balance -= amount;
        return this.balance;
    }

    add(amount) {
        this.balance += amount;
        return this.balance;
    }
}

export default Wallet;
