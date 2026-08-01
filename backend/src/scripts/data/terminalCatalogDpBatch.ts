import type { TerminalProblem } from './terminalCatalog';

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalogDpBatch: TerminalProblem[] = [
    {
        title: 'Fibonacci Number',
        description: `The Fibonacci sequence starts 0, 1, and every later value is the sum of the previous two. Given n, print F(n).\n\nInput\n- Line 1: integer n\n\nOutput\nOne integer: F(n).`,
        testCases: [
            { input: '0', expectedOutput: '0', isHidden: false },
            { input: '1', expectedOutput: '1', isHidden: false },
            { input: '10', expectedOutput: '55', isHidden: false },
            { input: '20', expectedOutput: '6765', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim());let a=0,b=1;for(let i=0;i<n;i++)[a,b]=[b,a+b];console.log(a);`
    },
    {
        title: 'Min Cost Climbing Stairs',
        description: `Each array value is the cost of stepping on that stair. You may begin at stair 0 or 1, then climb one or two stairs at a time. Print the minimum cost to move beyond the last stair.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated costs\n\nOutput\nOne integer: the minimum cost.`,
        testCases: [
            { input: arrayInput([10, 15, 20]), expectedOutput: '15', isHidden: false },
            { input: arrayInput([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), expectedOutput: '6', isHidden: false },
            { input: arrayInput([0, 0]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([5, 6, 2]), expectedOutput: '6', isHidden: true }
        ],
        referenceJavaScript: `const c=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let a=0,b=0;for(let i=2;i<=c.length;i++){const d=Math.min(b+c[i-1],a+c[i-2]);a=b;b=d;}console.log(b);`
    },
    {
        title: 'N-th Tribonacci Number',
        description: `The Tribonacci sequence is T(0)=0, T(1)=1, T(2)=1, and each later value is the sum of the previous three. Given n, print T(n).\n\nInput\n- Line 1: integer n\n\nOutput\nOne integer: T(n).`,
        testCases: [
            { input: '4', expectedOutput: '4', isHidden: false },
            { input: '0', expectedOutput: '0', isHidden: false },
            { input: '2', expectedOutput: '1', isHidden: false },
            { input: '25', expectedOutput: '1389537', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim());let a=0,b=1,c=1;for(let i=0;i<n;i++)[a,b,c]=[b,c,a+b+c];console.log(a);`
    },
    {
        title: 'House Robber',
        description: `Each value is money in a house on one street. Robbing adjacent houses is forbidden. Print the greatest amount that can be robbed.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative integers\n\nOutput\nOne integer: the maximum amount.`,
        testCases: [
            { input: arrayInput([1, 2, 3, 1]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([2, 7, 9, 3, 1]), expectedOutput: '12', isHidden: false },
            { input: arrayInput([2, 1, 1, 2]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([5]), expectedOutput: '5', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let x=0,y=0;for(const v of a)[x,y]=[y,Math.max(y,x+v)];console.log(y);`
    },
    {
        title: 'House Robber II',
        description: `Houses are arranged in a circle, so the first and last houses are adjacent. Robbing adjacent houses is forbidden. Print the greatest amount that can be robbed.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative integers\n\nOutput\nOne integer: the maximum amount.`,
        testCases: [
            { input: arrayInput([2, 3, 2]), expectedOutput: '3', isHidden: false },
            { input: arrayInput([1, 2, 3, 1]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([1, 2, 3]), expectedOutput: '3', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);function rob(x){let p=0,q=0;for(const v of x)[p,q]=[q,Math.max(q,p+v)];return q;}console.log(a.length===1?a[0]:Math.max(rob(a.slice(1)),rob(a.slice(0,-1))));`
    },
    {
        title: 'Delete and Earn',
        description: `Choosing a number earns that number, but deletes every occurrence of its neighboring values one less and one greater. You may choose values repeatedly until none remain. Print the maximum points possible.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative integers\n\nOutput\nOne integer: the maximum points.`,
        testCases: [
            { input: arrayInput([3, 4, 2]), expectedOutput: '6', isHidden: false },
            { input: arrayInput([2, 2, 3, 3, 3, 4]), expectedOutput: '9', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([8, 10, 4, 9, 1, 3, 5, 9, 4, 10]), expectedOutput: '37', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),m=new Map();for(const x of a)m.set(x,(m.get(x)||0)+x);const k=[...m.keys()].sort((x,y)=>x-y);let take=0,skip=0,prev=-Infinity;for(const x of k){const best=Math.max(take,skip);if(x===prev+1)[take,skip]=[skip+m.get(x),best];else[take,skip]=[best+m.get(x),best];prev=x;}console.log(Math.max(take,skip));`
    },
    {
        title: "Pascal's Triangle",
        description: `Given the number of rows, print the first n rows of Pascal's triangle. Each row contains binomial coefficients and starts and ends with 1.\n\nInput\n- Line 1: integer n\n\nOutput\nn lines, with one row per line and values separated by spaces.`,
        testCases: [
            { input: '1', expectedOutput: '1', isHidden: false },
            { input: '3', expectedOutput: '1\n1 1\n1 2 1', isHidden: false },
            { input: '4', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1', isHidden: false },
            { input: '5', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),out=[];for(let i=0;i<n;i++){const row=Array(i+1).fill(1);for(let j=1;j<i;j++)row[j]=out[i-1][j-1]+out[i-1][j];out.push(row);}console.log(out.map(r=>r.join(' ')).join('\\n'));`
    },
    {
        title: 'Divisor Game',
        description: `Alice starts with n. On a turn, the current player chooses x where 0 < x < n and n is divisible by x, then replaces n with n-x. Alice moves first. Print true if Alice can force a win with optimal play, otherwise false.\n\nInput\n- Line 1: integer n\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '2', expectedOutput: 'true', isHidden: false },
            { input: '3', expectedOutput: 'false', isHidden: false },
            { input: '1', expectedOutput: 'false', isHidden: false },
            { input: '100', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim());console.log(n%2===0?'true':'false');`
    },
    {
        title: 'Counting Bits',
        description: `For every integer from 0 through n inclusive, print how many 1 bits appear in its binary representation.\n\nInput\n- Line 1: integer n\n\nOutput\nn+1 space-separated counts.`,
        testCases: [
            { input: '2', expectedOutput: '0 1 1', isHidden: false },
            { input: '5', expectedOutput: '0 1 1 2 1 2', isHidden: false },
            { input: '0', expectedOutput: '0', isHidden: false },
            { input: '10', expectedOutput: '0 1 1 2 1 2 2 3 1 2 2', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),a=Array(n+1).fill(0);for(let i=1;i<=n;i++)a[i]=a[i>>1]+(i&1);console.log(a.join(' '));`
    },
    {
        title: 'Longest Increasing Subsequence',
        description: `Given an integer array, print the length of its longest strictly increasing subsequence. The chosen values need not be contiguous.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the longest length.`,
        testCases: [
            { input: arrayInput([10, 9, 2, 5, 3, 7, 101, 18]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([0, 1, 0, 3, 2, 3]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([7, 7, 7, 7]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([4, 10, 4, 3, 8, 9]), expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),d=[];for(const x of a){let l=0,r=d.length;while(l<r){const m=(l+r)>>1;if(d[m]<x)l=m+1;else r=m;}d[l]=x;}console.log(d.length);`
    },
    {
        title: 'Coin Change II',
        description: `Given distinct coin denominations and an amount, print the number of combinations that make exactly that amount. Coin order does not create a new combination.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated coin values\n- Line 3: target amount\n\nOutput\nOne integer: the number of combinations.`,
        testCases: [
            { input: '3\n1 2 5\n5', expectedOutput: '4', isHidden: false },
            { input: '1\n2\n3', expectedOutput: '0', isHidden: false },
            { input: '1\n10\n10', expectedOutput: '1', isHidden: false },
            { input: '3\n1 2 3\n4', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],c=t.slice(1,n+1),amount=t[n+1],d=Array(amount+1).fill(0);d[0]=1;for(const x of c)for(let i=x;i<=amount;i++)d[i]+=d[i-x];console.log(d[amount]);`
    },
    {
        title: 'Word Break',
        description: `Given a string and a dictionary of words, print true if the string can be split into one or more dictionary words, otherwise false. A dictionary word may be reused.\n\nInput\n- Line 1: lowercase string s\n- Line 2: integer n\n- Line 3: n space-separated dictionary words\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'leetcode\n2\nleet code', expectedOutput: 'true', isHidden: false },
            { input: 'applepenapple\n2\napple pen', expectedOutput: 'true', isHidden: false },
            { input: 'catsandog\n5\ncats dog sand and cat', expectedOutput: 'false', isHidden: false },
            { input: 'cars\n3\ncar ca rs', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),s=t[0],n=Number(t[1]),w=new Set(t.slice(2,n+2)),d=Array(s.length+1).fill(false);d[0]=true;for(let i=1;i<=s.length;i++)for(let j=0;j<i;j++)if(d[j]&&w.has(s.slice(j,i))){d[i]=true;break;}console.log(d[s.length]?'true':'false');`
    },
    {
        title: 'Partition Equal Subset Sum',
        description: `Given a positive integer array, print true if it can be split into two subsets with equal sums. Each input value must belong to exactly one subset.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated positive integers\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: arrayInput([1, 5, 11, 5]), expectedOutput: 'true', isHidden: false },
            { input: arrayInput([1, 2, 3, 5]), expectedOutput: 'false', isHidden: false },
            { input: arrayInput([2, 2, 1, 1]), expectedOutput: 'true', isHidden: false },
            { input: arrayInput([100, 100]), expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),sum=a.reduce((x,y)=>x+y,0);if(sum%2){console.log('false');}else{const d=Array(sum/2+1).fill(false);d[0]=true;for(const x of a)for(let i=sum/2;i>=x;i--)d[i]=d[i]||d[i-x];console.log(d[sum/2]?'true':'false');}`
    },
    {
        title: 'Target Sum',
        description: `Place either + or - before every input number. Print how many assignments evaluate to the target.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative integers\n- Line 3: target integer\n\nOutput\nOne integer: the number of assignments.`,
        testCases: [
            { input: '5\n1 1 1 1 1\n3', expectedOutput: '5', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '1\n1\n2', expectedOutput: '0', isHidden: false },
            { input: '3\n1 2 1\n2', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),target=t[n+1];let m=new Map([[0,1]]);for(const x of a){const next=new Map();for(const [sum,count] of m){next.set(sum+x,(next.get(sum+x)||0)+count);next.set(sum-x,(next.get(sum-x)||0)+count);}m=next;}console.log(m.get(target)||0);`
    },
    {
        title: 'Decode Ways',
        description: `A digit string maps 1 through 26 to letters A through Z. Print the number of valid decodings. A leading zero or a standalone zero is invalid.\n\nInput\n- Line 1: a string of digits\n\nOutput\nOne integer: the number of decodings.`,
        testCases: [
            { input: '12', expectedOutput: '2', isHidden: false },
            { input: '226', expectedOutput: '3', isHidden: false },
            { input: '06', expectedOutput: '0', isHidden: false },
            { input: '11106', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim();let a=1,b=s[0]==='0'?0:1;for(let i=1;i<s.length;i++){const c=(s[i]!=='0'?b:0)+(s.slice(i-1,i+1)>='10'&&s.slice(i-1,i+1)<='26'?a:0);a=b;b=c;}console.log(b);`
    },
    {
        title: 'Perfect Squares',
        description: `Given n, print the least number of perfect square numbers whose sum is n. A perfect square can be used more than once.\n\nInput\n- Line 1: positive integer n\n\nOutput\nOne integer: the minimum count.`,
        testCases: [
            { input: '12', expectedOutput: '3', isHidden: false },
            { input: '13', expectedOutput: '2', isHidden: false },
            { input: '1', expectedOutput: '1', isHidden: false },
            { input: '43', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),d=Array(n+1).fill(Infinity);d[0]=0;for(let i=1;i<=n;i++)for(let j=1;j*j<=i;j++)d[i]=Math.min(d[i],d[i-j*j]+1);console.log(d[n]);`
    },
    {
        title: 'Combination Sum IV',
        description: `Given distinct positive numbers and a target, print the number of ordered sequences whose values sum to the target. Different orders count as different sequences.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated positive integers\n- Line 3: target integer\n\nOutput\nOne integer: the number of ordered sequences.`,
        testCases: [
            { input: '3\n1 2 3\n4', expectedOutput: '7', isHidden: false },
            { input: '1\n9\n3', expectedOutput: '0', isHidden: false },
            { input: '1\n2\n4', expectedOutput: '1', isHidden: false },
            { input: '2\n1 2\n5', expectedOutput: '8', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),target=t[n+1],d=Array(target+1).fill(0);d[0]=1;for(let i=1;i<=target;i++)for(const x of a)if(x<=i)d[i]+=d[i-x];console.log(d[target]);`
    },
    {
        title: 'Solving Questions With Brainpower',
        description: `Each question has points and brainpower. Solving question i earns its points and forces you to skip the next brainpower[i] questions. You may skip questions freely. Print the maximum points possible.\n\nInput\n- Line 1: integer n\n- Next n lines: integers points and brainpower\n\nOutput\nOne integer: the maximum points.`,
        testCases: [
            { input: '4\n3 2\n4 3\n4 4\n2 5', expectedOutput: '5', isHidden: false },
            { input: '5\n1 1\n2 2\n3 3\n4 4\n5 5', expectedOutput: '7', isHidden: false },
            { input: '1\n1 1', expectedOutput: '1', isHidden: false },
            { input: '3\n10 0\n1 0\n1 0', expectedOutput: '12', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],d=Array(n+1).fill(0);for(let i=n-1;i>=0;i--){const p=t[1+2*i],skip=t[2+2*i],next=Math.min(n,i+skip+1);d[i]=Math.max(d[i+1],p+d[next]);}console.log(d[0]);`
    },
    {
        title: 'Unique Paths',
        description: `A robot starts in the top-left cell of an m by n grid and can move only right or down. Print how many paths reach the bottom-right cell.\n\nInput\n- Line 1: integers m and n\n\nOutput\nOne integer: the number of paths.`,
        testCases: [
            { input: '3 7', expectedOutput: '28', isHidden: false },
            { input: '3 2', expectedOutput: '3', isHidden: false },
            { input: '1 1', expectedOutput: '1', isHidden: false },
            { input: '10 10', expectedOutput: '48620', isHidden: true }
        ],
        referenceJavaScript: `const [m,n]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),d=Array(n).fill(1);for(let i=1;i<m;i++)for(let j=1;j<n;j++)d[j]+=d[j-1];console.log(d[n-1]);`
    },
    {
        title: 'Unique Paths II',
        description: `A robot starts in the top-left cell of a grid and can move only right or down. A 1 is an obstacle and a 0 is free. Print the number of paths to the bottom-right cell.\n\nInput\n- Line 1: integers m and n\n- Next m lines: n space-separated 0 or 1 values\n\nOutput\nOne integer: the number of paths.`,
        testCases: [
            { input: '3 3\n0 0 0\n0 1 0\n0 0 0', expectedOutput: '2', isHidden: false },
            { input: '2 2\n1 0\n0 0', expectedOutput: '0', isHidden: false },
            { input: '1 1\n0', expectedOutput: '1', isHidden: false },
            { input: '3 4\n0 0 0 0\n0 1 0 0\n0 0 0 0', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),m=t[0],n=t[1],d=Array(n).fill(0);d[0]=1;for(let i=0;i<m;i++)for(let j=0;j<n;j++){if(t[2+i*n+j])d[j]=0;else if(j)d[j]+=d[j-1];}console.log(d[n-1]);`
    }
];
