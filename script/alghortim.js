// تبدیل ترنزیشن ها به آبجکت برای راحتی کار
function parseTransitions(rawList) {
    const transitions = {};

    for (let line of rawList) {
        const match = line.match(/&\((.+),(.+)\)=(.+)/);
        if (!match) continue;

        const [_, state, symbol, target] = match;
        if (!transitions[state]) transitions[state] = {};
        transitions[state][symbol] = target;
    }

    return transitions;
}

// گرفتن استیت های قابل دسترس
function getReachableStates(dfa) {
    const reachable = new Set();
    const queue = [dfa.startState];

    while (queue.length > 0) {
        const state = queue.shift();
        if (reachable.has(state)) continue;

        reachable.add(state);

        for (const symbol of dfa.alphabet) {
            const next = dfa.transitions[state]?.[symbol];
            if (next && !reachable.has(next)) queue.push(next);
        }
    }

    return Array.from(reachable);
}

// حذف استیت‌های غیر قابل دسترس
function removeUnreachableStates(dfa) {
    const reachableStates = getReachableStates(dfa);

    const newTransitions = {};
    for (const state of reachableStates) {
        newTransitions[state] = {};
        for (const symbol of dfa.alphabet) {
            const next = dfa.transitions[state]?.[symbol];
            if (reachableStates.includes(next)) newTransitions[state][symbol] = next;
        }
    }

    return {
        ...dfa,
        states: reachableStates,
        transitions: newTransitions,
        finalStates: dfa.finalStates.filter((s) => reachableStates.includes(s)),
    };
}

function findDistinguishablePairs(dfa, reachableStates) {
    const { transitions, finalStates, alphabet } = dfa;
    const states = Array.from(reachableStates);
    const distinguishable = new Set();
    const statePairs = [];

    for (let i = 0; i < states.length; i++) {
        for (let j = i + 1; j < states.length; j++) {
            const s1 = states[i];
            const s2 = states[j];
            statePairs.push([s1, s2]);

            const s1Accept = finalStates.includes(s1);
            const s2Accept = finalStates.includes(s2);

            if (s1Accept !== s2Accept) distinguishable.add(`${s1},${s2}`);
        }
    }

    let changed = true;
    while (changed) {
        changed = false;

        for (const [s1, s2] of statePairs) {
            if (distinguishable.has(`${s1},${s2}`)) continue;

            for (const symbol of alphabet) {
                const next1 = transitions[s1]?.[symbol];
                const next2 = transitions[s2]?.[symbol];
                if (!next1 || !next2) continue;

                const pair = [next1, next2].sort().join(",");
                if (distinguishable.has(pair)) {
                    distinguishable.add(`${s1},${s2}`);
                    changed = true;
                    break;
                }
            }
        }
    }

    const equivalentPairs = [];
    for (const [s1, s2] of statePairs) {
        if (!distinguishable.has(`${s1},${s2}`)) equivalentPairs.push([s1, s2]);
    }

    return equivalentPairs;
}

function buildEquivalenceClasses(states, equivalentPairs) {
    const groups = [];
    const visited = new Set();

    for (const state of states) {
        if (visited.has(state)) continue;

        const group = new Set([state]);
        for (const [a, b] of equivalentPairs) {
            if (a === state || b === state) {
                group.add(a);
                group.add(b);
            }
        }
        for (const s of group) visited.add(s);
        groups.push(group);
    }

    return groups;
}

function buildMinimizedDFA(classes, transitions, alphabet, startState, finalStates) {
    const classMap = {};
    const newStates = {};
    const newFinalStates = new Set();
    let newStartState = "";

    classes.forEach((stateSet, index) => {
        const className = `C${index}`;
        for (const state of stateSet) classMap[state] = className;
    });

    classes.forEach((stateSet, index) => {
        const className = `C${index}`;
        const [rep] = stateSet;
        newStates[className] = {};

        for (const symbol of alphabet) {
            const target = transitions[rep]?.[symbol];
            if (target) newStates[className][symbol] = classMap[target];
        }
    });

    newStartState = classMap[startState];

    for (const state of finalStates) {
        const cls = classMap[state];
        if (cls) newFinalStates.add(cls);
    }

    return {
        states: Object.keys(newStates),
        alphabet,
        transitions: newStates,
        startState: newStartState,
        finalStates: Array.from(newFinalStates),
    };
}

// چاپ DFA
function printDFA(dfa) {
    console.log("DFA:");
    console.log("States:", dfa.states.join(", "));
    console.log("Alphabet:", dfa.alphabet.join(", "));
    console.log("Start State:", dfa.startState);
    console.log("Final States:", dfa.finalStates.join(", "));
    console.log("Transitions:", dfa.transitions);
}

// تابع کلی مینیمایز
function minimizeDFA(dfa) {
    console.log("Input DFA:");
    printDFA(dfa);

    const cleanDFA = removeUnreachableStates(dfa);
    const equivalentPairs = findDistinguishablePairs(cleanDFA, cleanDFA.states);
    const classes = buildEquivalenceClasses(cleanDFA.states, equivalentPairs);
    const minDFA = buildMinimizedDFA(
        classes,
        cleanDFA.transitions,
        cleanDFA.alphabet,
        cleanDFA.startState,
        cleanDFA.finalStates
    );

    console.log("\nMinimized DFA:");
    printDFA(minDFA);

    return minDFA;
}
// ! render graphs
function renderDFA(inputDFA, containerId) {
    const nodes = new vis.DataSet(
        inputDFA.states.map(state => ({
          id: state,
          label: state,
          shape: 'circle',
          size: 40,
          font: { size: 16 },
          borderWidth: 1,
          color: inputDFA.finalStates.includes(state) ? 'red' : '#97C2FC' // final states قرمز
        }))
      );
      
  
    var edges = new vis.DataSet(
      Object.entries(inputDFA.transitions).flatMap(([from, trans]) =>
        Object.entries(trans).map(([symbol, to]) => ({
          from: from,
          to: to,
          label: symbol,
          arrows: 'to',
          font: { size: 16, color: '#000', align: 'middle' },
          smooth: { type: 'curvedCW', roundness: 0.2 },
          color: {
            color: '#fff',      // رنگ یال
            highlight: '#ff5555',  // رنگ وقتی انتخاب شد
            hover: '#ff8888'       // رنگ وقتی موس روی یال
          }
        }))
      )
    );
  
    var container = document.getElementById(containerId);
    var data = { nodes: nodes, edges: edges };
    var options = {
      physics: { enabled: true, stabilization: false },
      edges: { smooth: true },
      nodes: { fixed: false },
      layout: {
        hierarchical: {
          direction: 'LR',  // LR = Left → Right, TB = Top → Bottom
          sortMethod: 'directed'
        }
      },
    };
  
    return new vis.Network(container, data, options);
  }
  