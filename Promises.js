class MyPromise {
  get pending() {
    return "pending";
  }
  get Fulfilled() {
    return "Fulfilled";
  }
  get Rejected() {
    return "Rejected";
  }
  static Myall(arr) {
    const Carr = [...arr];
    const result = [];
    let count = 0;
    return new MyPromise((res, rej) => {
      if (Carr.length === 0) {
        res(result);
      }
      Carr.forEach((p, i) => {
        p.Mythen(
          (val) => {
            result[i] = val;
            count++;
            if (Carr.length === count) {
              res(result);
            }
          },
          (val) => {
            rej(val);
          },
        );
      });
    });
  }
  static Myrace(arr) {
    const Carr = [...arr];
    return new MyPromise((res, rej) => {
      Carr.forEach((p, i) => {
        p.Mythen(
          (val) => {
            res(val);
          },
          (val) => {
            rej(val);
          },
        );
      });
    });
  }
  constructor(fn = () => {}) {
    this.state = {
      status: this.pending,
      callbacks: [],
    };
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  #drainCallbk() {
    //guard for empty array or no .Mythen() on promises
    if (!(this.state.callbacks.length == 0)) {
      //getting the first obj from the callback array & calling the function based on the rejected or fulfulled
      const obj = this.state.callbacks.shift();
      queueMicrotask(() =>
        this.#helper4Chaining(obj[`On${this.state.status}`], obj.newPromise),
      );
      // this.#helper4Chaining(obj[`On${this.state.status}`], obj.newPromise);

      //recursively draining the callback array
      this.#drainCallbk();
    } else {
      return;
    }
  }
  #helper4Chaining(fn, newPromise) {
    try {
      if (fn == undefined) {
        throw this.state.data;
      }
      const result = fn(this.state.data);
      if (result instanceof MyPromise) {
        result.Mythen(
          (val) => newPromise.resolve(val),
          (val) => newPromise.reject(val),
        );
      } else {
        newPromise.resolve(result);
      }
    } catch (err) {
      newPromise.reject(err);
    }
  }

  resolve(data) {
    //guard
    if (this.state.status != this.pending) return;

    // changing status
    this.state.status = this.Fulfilled;

    //storing data
    this.state.data = data;

    //calling fn to drain callbacks queue OnFulfilled
    this.#drainCallbk();
  }
  reject(data) {
    //guard
    if (this.state.status != this.pending) return;

    // changing status
    this.state.status = this.Rejected;

    //storing data
    this.state.data = data;

    //calling fn to drain callbacks queue OnRejected
    this.#drainCallbk();
  }
  Mythen(OnFulfilled = (data) => data, OnRejected) {
    //creating a promise instance
    const newPromise = new MyPromise();
    if (this.state.status == this.Fulfilled) {
      queueMicrotask(() => this.#helper4Chaining(OnFulfilled, newPromise));
      // this.#helper4Chaining(OnFulfilled, newPromise);
    } else if (this.state.status == this.Rejected) {
      queueMicrotask(() => this.#helper4Chaining(OnRejected, newPromise));
      // this.#helper4Chaining(OnRejected, newPromise);
    } else {
      this.state.callbacks.push({ OnFulfilled, OnRejected, newPromise });
    }
    //returing the promise instance
    return newPromise;
  }
  //implementing myCatch
  MyCatch(Onrejection) {
    return this.Mythen(undefined, Onrejection);
  }

  Myfinally(fn) {
    return this.Mythen(
      (val) => {
        fn();
        return val;
      },
      (val) => {
        fn();
        throw val;
      },
    );
  }
}

module.exports = MyPromise;
