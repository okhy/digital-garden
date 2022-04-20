<!-- ---
title: Hello
slug: home
--- -->

# JS Execution

pream...
## Execution Context

There are Three types of Execution Contexts

1. Global Execution Context — for code that is not in a function. Only one in a program.
2. Function Execution Context — created for every function invocation.
3. Eval Execution Context — todo

---

Execution Context can be defined as an object containing **Lexical** and **Variable** environments created for both Global script (program) and each function invocation.

### Lexical Environment:

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment.
>

**Lexical Environment consists of:**

- 'this' binding
- **Environmental Recods** that holds identifier bindings (variable values, function references)
- arguments for function context (excluding arrow functions)
- reference to outer LE - what it enables

**Environment record:**

There are two types of **ER:**

1. Declarative **ER** - created for Lexical Environment in Execution Context for functions
2. Object **ER** - created for Global Execution Context. It contains an objective environment record. Apart from variable and function declarations, the object environment record also stores a global binding object (window object in browsers). So for each of binding object’s property (in case of browsers, it contains properties and methods provided by browser to the window object), a new entry is created in the record (that is why global object's properties can be calles without referencing said object - `console.log()` instead of `window.console.log()`.

### Execution Phases:

Each Execution context is created in two phases:

1. Creation Phase - initial phase that includes:
    - global object creation (for global Execution Context)
    - 'this' assignment (depends on how the function was called)
    - variable initiation (memory space assignment. Value is `undefined` - **Hoisting**)
    - function declarations (!) are being referenced
2. Execution Phase
    - Executes code line-by-line
    - assigns values to variables


### **This**

`This` binding depends on how a function was called. **IF** a function was called by a reference of an object (as a method), then `this` is set to that object, otherwise it defaults to global object.

```jsx
function f1(){
  return this;
}

f1() === window; // global object

// ---

var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37
```

❗Exception to that rule is `strict mode` it remains at whatever it's set to when entering the execution context

```jsx
function f2(){
  "use strict"; // see strict mode
  return this;
}

f2() === undefined;
```

**Binding `this`**

Outside object execution context  `this` can be passed to a function invocation several ways.

1. `function.prototype.call(obj, ...arguments)` - will call a function with it's EC `this` being set to passed object and rest of the arguments as passed to it.
2. `function.prototype.apply(obj,[...arguments])` - same as `call()` but with array of arguments instead
3. `function.prototype.bind(obj)` will **return** a function reference with this set to passed object.
4. Constructor functions / `new` keyword:

    If a function is invoked with a `new` it'll return an object. If function returns an object it will be that explicit one, if not `this` object will be returned.

    More precisely:

    1. A new empty object is created
    2. The context object `this` is bound to the new empty object
    3. The new object is linked to the function’s prototype property
    4. `this` is automatically returned unless another value is returned explicitly from the function

**Todo:**

- [https://www.youtube.com/watch?v=PIkA60I0dKU&list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub&index=2](https://www.youtube.com/watch?v=PIkA60I0dKU&list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub&index=2)

### **More:**

- [https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/this](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/this)

---

# Hoisting

It's a process of assigning a **variable** **declaration** a default value of ****`undefined` during Execution Context Creation Phase **and** placing function declarations in memory.

❗ Important thing to notice here is that *let* and *const* will be left as **<uninitialized>**.

- **Let** will be assigned `undefined` in **Execution Phase** if engine won't be able to find it's value in it's declaration place, but
- **Const ****will throw an error if it's only declared, but not defined.
- **Function declarations** are assigned reference to function in memory thus they can be called in Execution Phase even if their declaration is defined after invocation (❗this does not work with **function expressions** as they're variables ❗)

---

# Clojures

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
>

Closure Scope is similar to Execution Context. It's created whenever child-function uses variables  / functions of it's parent. In that case Closure Scope is created over Parent function containing used variables and will stay (in memory) even after Parent's EC is removed from the stack. It will have outer EC reference, and will be referenced by inner functions.

**Q:** how this Execution Context relates to clojures?

**A:** Inner function creates Closure Scope over a parent function that stays in 'memory'/ (to research) even after parent function EC get's removed from the stack.

---

# Callstack (Execution Stack)

- LIFO
- contains execution contexts for each function invocation (call)

![[https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)](Untitled.png)

[https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

---

### General Resources:

- [https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
- [https://medium.com/@sudhakarsp06/creation-phase-and-execution-phase-in-javascript-32fcdbef60f4](https://medium.com/@sudhakarsp06/creation-phase-and-execution-phase-in-javascript-32fcdbef60f4)
- [https://www.youtube.com/watch?v=Nt-qa_LlUH0](https://www.youtube.com/watch?v=Nt-qa_LlUH0) + [https://ui.dev/javascript-visualizer/](https://ui.dev/javascript-visualizer/)

# Example

Pseudo spec:

```jsx
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
    }
    outer: <null>,
    this: <global object>
  }
}

FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
    }
    outer: <Global or outer function environment reference>,
    this: <depends on how function is called>,
		arguments: {0: val, 1: val, length:2}
  }
```

Example:

```jsx
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);
```

```jsx
// global LE after Creation Phase:
GlobalExecutionContext =
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

```jsx
// Globale Execution Context after Execution Phase:
GlobalExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}

```

```jsx
/*
* when multiply function is called in Global Execution Phase
* it's Context is Created.
*
* First the Creation Phase:
*/

FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}

/*
* Then after the Execution Phase:
*/

FunctionExectionContext = {
	LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
	VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}

/*
* After the function completes, the returned value is stored in `c`
* so global LE is updated.
* After that global code completes and the program finishes.
*/
```