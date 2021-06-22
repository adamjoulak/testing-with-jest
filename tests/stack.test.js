const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

//Testar att nästsista objektet returneras efter en pop
test('peek on stack should return the second to last item after last item has been popped', () => {
    stack.push(1);
    stack.push("2");
    stack.push(3);
    stack.push("the second to last item muddafokka");
    stack.push("not 4");
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe("not 4");
    stack.pop();
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe("the second to last item muddafokka");
});
