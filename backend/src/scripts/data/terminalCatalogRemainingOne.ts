import type { TerminalProblem } from './terminalCatalog';

export const terminalCatalogRemainingOne: TerminalProblem[] = [
    {
        title: '4Sum',
        description: `Given an integer array and a target, print every unique quadruplet of distinct positions whose values sum to target. Sort each quadruplet increasingly and print quadruplets in lexicographic order, one per line. Print NONE when there are no quadruplets.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n- Line 3: target integer\n\nOutput\nUnique quadruplets, one per line.`,
        testCases: [
            { input: '6\n1 0 -1 0 -2 2\n0', expectedOutput: '-2 -1 1 2\n-2 0 0 2\n-1 0 0 1', isHidden: false },
            { input: '5\n2 2 2 2 2\n8', expectedOutput: '2 2 2 2', isHidden: false },
            { input: '4\n1 2 3 4\n50', expectedOutput: 'NONE', isHidden: false },
            { input: '5\n-2 -1 0 1 2\n0', expectedOutput: '-2 -1 1 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1).sort((x,y)=>x-y),x=t[n+1],out=[];for(let i=0;i<n-3;i++){if(i&&a[i]===a[i-1])continue;for(let j=i+1;j<n-2;j++){if(j>i+1&&a[j]===a[j-1])continue;let l=j+1,r=n-1;while(l<r){const s=a[i]+a[j]+a[l]+a[r];if(s===x){out.push([a[i],a[j],a[l],a[r]].join(' '));while(a[l]===a[++l]);while(a[r]===a[--r]);}else if(s<x)l++;else r--;}}}console.log(out.join('\\n')||'NONE');`
    },
    {
        title: 'Boats to Save People',
        description: `Each person has a weight and each boat carries at most two people with total weight at most limit. Print the fewest boats needed.\n\nInput\n- Line 1: integer n\n- Line 2: n weights\n- Line 3: boat weight limit\n\nOutput\nOne integer: the minimum number of boats.`,
        testCases: [
            { input: '4\n3 2 2 1\n3', expectedOutput: '3', isHidden: false },
            { input: '4\n3 5 3 4\n5', expectedOutput: '4', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '5\n1 2 2 3 4\n4', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1).sort((x,y)=>x-y),limit=t[n+1];let l=0,r=n-1,boats=0;while(l<=r){if(a[l]+a[r]<=limit)l++;r--;boats++;}console.log(boats);`
    },
    {
        title: 'Contiguous Array',
        description: `Given a binary array, print the maximum length of a contiguous subarray containing the same number of zeroes and ones.\n\nInput\n- Line 1: integer n\n- Line 2: n values, each 0 or 1\n\nOutput\nOne integer: the maximum length.`,
        testCases: [
            { input: '2\n0 1', expectedOutput: '2', isHidden: false },
            { input: '3\n0 1 0', expectedOutput: '2', isHidden: false },
            { input: '4\n0 0 1 1', expectedOutput: '4', isHidden: false },
            { input: '7\n0 1 1 0 1 1 1', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),first=new Map([[0,-1]]);let sum=0,best=0;for(let i=0;i<a.length;i++){sum+=a[i]?1:-1;if(first.has(sum))best=Math.max(best,i-first.get(sum));else first.set(sum,i);}console.log(best);`
    },
    {
        title: 'Find Peak Element',
        description: `An element is a peak when it is greater than its immediate neighbors; values outside the array are negative infinity. Print the index of the leftmost peak. Adjacent values are different.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n\nOutput\nOne zero-based peak index.`,
        testCases: [
            { input: '4\n1 2 3 1', expectedOutput: '2', isHidden: false },
            { input: '1\n1', expectedOutput: '0', isHidden: false },
            { input: '6\n1 2 1 3 5 6', expectedOutput: '1', isHidden: false },
            { input: '5\n5 4 3 2 1', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let ans=0;for(let i=0;i<a.length;i++)if((i===0||a[i]>a[i-1])&&(i===a.length-1||a[i]>a[i+1])){ans=i;break;}console.log(ans);`
    },
    {
        title: 'First Missing Positive',
        description: `Given an unsorted integer array, print the smallest missing positive integer.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n\nOutput\nOne integer: the first missing positive.`,
        testCases: [
            { input: '3\n1 2 0', expectedOutput: '3', isHidden: false },
            { input: '4\n3 4 -1 1', expectedOutput: '2', isHidden: false },
            { input: '5\n7 8 9 11 12', expectedOutput: '1', isHidden: false },
            { input: '4\n1 1 2 2', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),s=new Set(a);let x=1;while(s.has(x))x++;console.log(x);`
    },
    {
        title: 'Lemonade Change',
        description: `Customers pay for a $5 lemonade using $5, $10, or $20 bills in order. Start with no change and print true if every customer can receive correct change; otherwise print false.\n\nInput\n- Line 1: integer n\n- Line 2: n bill values\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '5\n5 5 5 10 20', expectedOutput: 'true', isHidden: false },
            { input: '5\n5 5 10 10 20', expectedOutput: 'false', isHidden: false },
            { input: '1\n5', expectedOutput: 'true', isHidden: false },
            { input: '6\n5 5 5 5 20 20', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let f=0,t=0,ok=true;for(const x of a){if(x===5)f++;else if(x===10){if(!f){ok=false;break;}f--;t++;}else if(t&&f){t--;f--;}else if(f>=3)f-=3;else{ok=false;break;}}console.log(ok?'true':'false');`
    },
    {
        title: 'Palindrome Linked List',
        description: `Treat the input values as a singly linked list. Print true if the list reads the same forward and backward; otherwise print false.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '4\n1 2 2 1', expectedOutput: 'true', isHidden: false },
            { input: '2\n1 2', expectedOutput: 'false', isHidden: false },
            { input: '1\n7', expectedOutput: 'true', isHidden: false },
            { input: '5\n1 2 3 2 1', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let ok=true;for(let l=0,r=a.length-1;l<r;l++,r--)if(a[l]!==a[r]){ok=false;break;}console.log(ok?'true':'false');`
    },
    {
        title: 'Palindromic Substrings',
        description: `Given a lowercase string, print how many of its contiguous substrings are palindromes.\n\nInput\n- Line 1: a lowercase string\n\nOutput\nOne integer: the number of palindromic substrings.`,
        testCases: [
            { input: 'abc', expectedOutput: '3', isHidden: false },
            { input: 'aaa', expectedOutput: '6', isHidden: false },
            { input: 'a', expectedOutput: '1', isHidden: false },
            { input: 'ababa', expectedOutput: '9', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim();let count=0;for(let c=0;c<2*s.length-1;c++){let l=c>>1,r=l+c%2;while(l>=0&&r<s.length&&s[l]===s[r]){count++;l--;r++;}}console.log(count);`
    },
    {
        title: 'Pascal',
        description: `Given n, print the first n rows of Pascal's triangle. Numbers in a row are separated by one space.\n\nInput\n- Line 1: integer n\n\nOutput\nn lines of Pascal's triangle.`,
        testCases: [
            { input: '1', expectedOutput: '1', isHidden: false },
            { input: '3', expectedOutput: '1\n1 1\n1 2 1', isHidden: false },
            { input: '5', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', isHidden: false },
            { input: '4', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),out=[];for(let i=0;i<n;i++){const row=Array(i+1).fill(1);for(let j=1;j<i;j++)row[j]=out[i-1][j-1]+out[i-1][j];out.push(row);}console.log(out.map(r=>r.join(' ')).join('\\n'));`
    },
    {
        title: 'Task Scheduler',
        description: `Tasks are uppercase letters. Each unit of time runs one task or is idle, and equal tasks must be separated by at least n intervals. Print the least total time needed.\n\nInput\n- Line 1: integer task count\n- Line 2: task letters separated by spaces\n- Line 3: cooldown n\n\nOutput\nOne integer: the least schedule length.`,
        testCases: [
            { input: '6\nA A A B B B\n2', expectedOutput: '8', isHidden: false },
            { input: '6\nA A A B B B\n0', expectedOutput: '6', isHidden: false },
            { input: '4\nA A A B\n2', expectedOutput: '7', isHidden: false },
            { input: '8\nA A A A B B C C\n2', expectedOutput: '10', isHidden: true }
        ],
        referenceJavaScript: `const p=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),n=+p[0],tasks=p.slice(1,n+1),cool=+p[n+1],m=Math.max(...Object.values(tasks.reduce((o,x)=>(o[x]=(o[x]||0)+1,o),{}))),k=Object.values(tasks.reduce((o,x)=>(o[x]=(o[x]||0)+1,o),{})).filter(x=>x===m).length;console.log(Math.max(n,(m-1)*(cool+1)+k));`
    },
    {
        title: 'Triangle',
        description: `Given a triangle of integers, start at the top and move to one of the two adjacent numbers in the next row each step. Print the minimum path sum.\n\nInput\n- Line 1: number of rows r\n- Next r lines: row i contains i integers\n\nOutput\nOne integer: the minimum path sum.`,
        testCases: [
            { input: '4\n2\n3 4\n6 5 7\n4 1 8 3', expectedOutput: '11', isHidden: false },
            { input: '1\n-10', expectedOutput: '-10', isHidden: false },
            { input: '3\n1\n2 3\n4 5 6', expectedOutput: '7', isHidden: false },
            { input: '3\n-1\n2 3\n1 -1 -3', expectedOutput: '-1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],rows=[];let p=1;for(let i=1;i<=r;i++){rows.push(t.slice(p,p+i));p+=i;}let dp=rows[r-1];for(let i=r-2;i>=0;i--)dp=rows[i].map((x,j)=>x+Math.min(dp[j],dp[j+1]));console.log(dp[0]);`
    },
    {
        title: 'Uncrossed Lines',
        description: `Given two integer arrays, connect equal values without crossing lines. Each value may be used once. Print the largest possible number of connections.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n- Line 3: integer m\n- Line 4: m integers\n\nOutput\nOne integer: the maximum number of lines.`,
        testCases: [
            { input: '3\n1 4 2\n3\n1 2 4', expectedOutput: '2', isHidden: false },
            { input: '3\n2 5 1\n6\n10 5 2 1 5 2', expectedOutput: '2', isHidden: false },
            { input: '1\n1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '4\n1 3 7 1\n5\n1 9 2 5 1', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),m=t[n+1],b=t.slice(n+2,n+2+m),dp=Array(m+1).fill(0);for(const x of a){let prev=0;for(let j=1;j<=m;j++){const old=dp[j];dp[j]=x===b[j-1]?prev+1:Math.max(dp[j],dp[j-1]);prev=old;}}console.log(dp[m]);`
    },
    {
        title: 'Maximal Square',
        description: `Given a binary matrix, print the area of its largest square containing only 1 values.\n\nInput\n- Line 1: rows and columns\n- Next rows lines: binary values separated by spaces\n\nOutput\nOne integer: the largest square area.`,
        testCases: [
            { input: '4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0', expectedOutput: '4', isHidden: false },
            { input: '1 1\n0', expectedOutput: '0', isHidden: false },
            { input: '2 2\n1 1\n1 1', expectedOutput: '4', isHidden: false },
            { input: '3 4\n0 1 1 0\n1 1 1 1\n0 1 1 1', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],dp=Array(c+1).fill(0);let best=0;for(let i=0;i<r;i++){let prev=0;for(let j=1;j<=c;j++){const old=dp[j];dp[j]=t[2+i*c+j-1]?1+Math.min(dp[j],dp[j-1],prev):0;best=Math.max(best,dp[j]);prev=old;}}console.log(best*best);`
    },
    {
        title: 'Minimum Falling Path Sum',
        description: `Given a square integer matrix, choose one value from each row. From a cell you may move down, down-left, or down-right. Print the smallest possible sum.\n\nInput\n- Line 1: matrix size n\n- Next n lines: n integers\n\nOutput\nOne integer: the minimum falling path sum.`,
        testCases: [
            { input: '3\n2 1 3\n6 5 4\n7 8 9', expectedOutput: '13', isHidden: false },
            { input: '2\n-19 57\n-40 -5', expectedOutput: '-59', isHidden: false },
            { input: '1\n7', expectedOutput: '7', isHidden: false },
            { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '12', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0];let dp=t.slice(1,n+1);for(let i=1;i<n;i++){const row=t.slice(1+i*n,1+(i+1)*n),next=[];for(let j=0;j<n;j++)next[j]=row[j]+Math.min(dp[j],j?dp[j-1]:Infinity,j+1<n?dp[j+1]:Infinity);dp=next;}console.log(Math.min(...dp));`
    },
    {
        title: 'Minimum Path Sum',
        description: `Given a grid of nonnegative integers, move only right or down from the top-left cell to the bottom-right cell. Print the minimum path sum including both endpoints.\n\nInput\n- Line 1: rows and columns\n- Next rows lines: grid values\n\nOutput\nOne integer: the minimum path sum.`,
        testCases: [
            { input: '3 3\n1 3 1\n1 5 1\n4 2 1', expectedOutput: '7', isHidden: false },
            { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '12', isHidden: false },
            { input: '1 1\n5', expectedOutput: '5', isHidden: false },
            { input: '3 2\n1 2\n5 1\n2 1', expectedOutput: '5', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],dp=Array(c).fill(Infinity);dp[0]=0;for(let i=0;i<r;i++)for(let j=0;j<c;j++)dp[j]=t[2+i*c+j]+Math.min(dp[j],j?dp[j-1]:Infinity);console.log(dp[c-1]);`
    },
    {
        title: 'Most Stones Removed with Same Row or Column',
        description: `A stone may be removed when another stone remains in the same row or column. Print the maximum number of stones that can be removed.\n\nInput\n- Line 1: integer n\n- Next n lines: row and column of a stone\n\nOutput\nOne integer: the maximum removable stones.`,
        testCases: [
            { input: '6\n0 0\n0 1\n1 0\n1 2\n2 1\n2 2', expectedOutput: '5', isHidden: false },
            { input: '5\n0 0\n0 2\n1 1\n2 0\n2 2', expectedOutput: '3', isHidden: false },
            { input: '1\n0 0', expectedOutput: '0', isHidden: false },
            { input: '3\n0 0\n1 2\n3 4', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],p=Array.from({length:n},(_,i)=>i);const find=x=>p[x]===x?x:p[x]=find(p[x]);let groups=n;for(let i=0;i<n;i++)for(let j=0;j<i;j++)if(t[1+2*i]===t[1+2*j]||t[2+2*i]===t[2+2*j]){const a=find(i),b=find(j);if(a!==b){p[a]=b;groups--;}}console.log(n-groups);`
    },
    {
        title: 'Path with Maximum Probability',
        description: `An undirected graph has numbered vertices and each edge has a success probability. Print the highest probability of reaching end from start, rounded to exactly five decimal places.\n\nInput\n- Line 1: vertices n and edges m\n- Next m lines: endpoints u v\n- Next line: m probabilities\n- Final line: start end\n\nOutput\nThe maximum probability with five decimal places.`,
        testCases: [
            { input: '3 3\n0 1\n1 2\n0 2\n0.5 0.5 0.2\n0 2', expectedOutput: '0.25000', isHidden: false },
            { input: '3 1\n0 1\n0.5\n0 2', expectedOutput: '0.00000', isHidden: false },
            { input: '2 1\n0 1\n0.7\n0 1', expectedOutput: '0.70000', isHidden: false },
            { input: '4 4\n0 1\n1 3\n0 2\n2 3\n0.5 0.5 0.8 0.3\n0 3', expectedOutput: '0.25000', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],g=Array.from({length:n},()=>[]);for(let i=0;i<m;i++){const u=t[2+2*i],v=t[3+2*i],p=t[2+2*m+i];g[u].push([v,p]);g[v].push([u,p]);}const start=t[2+3*m],end=t[3+3*m],best=Array(n).fill(0);best[start]=1;for(let k=0;k<n;k++)for(let u=0;u<n;u++)for(const [v,p] of g[u])if(best[v]<best[u]*p)best[v]=best[u]*p;console.log(best[end].toFixed(5));`
    },
    {
        title: 'Path With Minimum Effort',
        description: `Given a grid of heights, move four directions from top-left to bottom-right. A route's effort is its largest absolute height difference between consecutive cells. Print the smallest possible effort.\n\nInput\n- Line 1: rows and columns\n- Next rows lines: heights\n\nOutput\nOne integer: the minimum effort.`,
        testCases: [
            { input: '3 3\n1 2 2\n3 8 2\n5 3 5', expectedOutput: '2', isHidden: false },
            { input: '3 3\n1 2 3\n3 8 4\n5 3 5', expectedOutput: '1', isHidden: false },
            { input: '1 1\n7', expectedOutput: '0', isHidden: false },
            { input: '2 3\n1 10 6\n7 5 2', expectedOutput: '6', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],a=t.slice(2),d=Array(r*c).fill(Infinity);d[0]=0;const q=[[0,0]];while(q.length){q.sort((x,y)=>x[0]-y[0]);const [e,u]=q.shift();if(e!==d[u])continue;for(const v of [u-c,u+c,u-1,u+1])if(v>=0&&v<r*c&&((v===u-1||v===u+1)?Math.floor(v/c)===Math.floor(u/c):true)){const ne=Math.max(e,Math.abs(a[u]-a[v]));if(ne<d[v]){d[v]=ne;q.push([ne,v]);}}}console.log(d[r*c-1]);`
    },
    {
        title: 'Shortest Bridge',
        description: `A binary grid contains exactly two islands connected by four-directional adjacency. Change the fewest 0 values to 1 so the islands become connected, and print that number.\n\nInput\n- Line 1: rows and columns\n- Next rows lines: binary grid values\n\nOutput\nOne integer: the shortest bridge length.`,
        testCases: [
            { input: '2 2\n0 1\n1 0', expectedOutput: '1', isHidden: false },
            { input: '3 3\n0 1 0\n0 0 0\n0 0 1', expectedOutput: '2', isHidden: false },
            { input: '3 3\n1 1 0\n1 0 1\n0 1 1', expectedOutput: '1', isHidden: false },
            { input: '2 3\n1 0 0\n0 0 1', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],a=t.slice(2),q=[];let start=a.indexOf(1),stack=[start];a[start]=2;while(stack.length){const u=stack.pop();q.push([u,0]);for(const v of [u-c,u+c,u-1,u+1])if(v>=0&&v<r*c&&((v===u-1||v===u+1)?Math.floor(v/c)===Math.floor(u/c):true)&&a[v]===1){a[v]=2;stack.push(v);}}for(let h=0;h<q.length;h++){const [u,d]=q[h];for(const v of [u-c,u+c,u-1,u+1])if(v>=0&&v<r*c&&((v===u-1||v===u+1)?Math.floor(v/c)===Math.floor(u/c):true)){if(a[v]===1){console.log(d);process.exit();}if(a[v]===0){a[v]=2;q.push([v,d+1]);}}}`
    },
    {
        title: 'Swim in Rising Water',
        description: `A square grid gives the time when each cell becomes passable. Starting at top-left, move four directions and reach bottom-right as early as possible. Print that earliest time.\n\nInput\n- Line 1: grid size n\n- Next n lines: n elevations\n\nOutput\nOne integer: the earliest arrival time.`,
        testCases: [
            { input: '2\n0 2\n1 3', expectedOutput: '3', isHidden: false },
            { input: '5\n0 1 2 3 4\n24 23 22 21 5\n12 13 14 15 16\n11 17 18 19 20\n10 9 8 7 6', expectedOutput: '16', isHidden: false },
            { input: '1\n0', expectedOutput: '0', isHidden: false },
            { input: '3\n0 1 4\n7 8 5\n2 3 6', expectedOutput: '6', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1),d=Array(n*n).fill(Infinity);d[0]=a[0];const q=[[d[0],0]];while(q.length){q.sort((x,y)=>x[0]-y[0]);const [time,u]=q.shift();if(u===n*n-1){console.log(time);break;}if(time!==d[u])continue;for(const v of [u-n,u+n,u-1,u+1])if(v>=0&&v<n*n&&((v===u-1||v===u+1)?Math.floor(v/n)===Math.floor(u/n):true)){const nt=Math.max(time,a[v]);if(nt<d[v]){d[v]=nt;q.push([nt,v]);}}}`
    }
];
