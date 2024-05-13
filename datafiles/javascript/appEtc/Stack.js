class Stack {
	constructor() {
		this.top = undefined;
	}

	push(val) {
		this.top = new StackNode(val, this.top);
	}

	pop() {
		let ret = this.top.val;
		this.top = this.top.pre;
		return ret;
	}

	isEmpty() {
		return this.top === undefined;
	}
}

class StackNode {
	constructor(val, pre) {
		this.val = val;
		this.pre = pre;
	}
};
