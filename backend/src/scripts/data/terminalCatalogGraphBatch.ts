import type { TerminalProblem } from './terminalCatalog';

export const terminalCatalogGraphBatch: TerminalProblem[] = [
    {
        title: 'Find Center of Star Graph',
        description: `A star graph has one center connected to every other vertex. Given its edges, print the center vertex. Vertices are numbered 1 through n.\n\nInput\n- Line 1: integer n\n- Next n - 1 lines: two endpoints of an undirected edge\n\nOutput\nOne integer: the center vertex.`,
        testCases: [
            { input: '4\n1 2\n2 3\n4 2', expectedOutput: '2', isHidden: false },
            { input: '4\n1 2\n5 1\n1 3', expectedOutput: '1', isHidden: false },
            { input: '5\n3 1\n2 3\n3 4\n3 5', expectedOutput: '3', isHidden: false },
            { input: '3\n2 1\n2 3', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);const x=a[1],y=a[2],u=a[3],v=a[4];console.log(x===u||x===v?x:y);`
    },
    {
        title: 'Find the Town Judge',
        description: `In a town of n people, the judge trusts nobody and every other person trusts the judge. Given directed trust pairs a b meaning a trusts b, print the judge's label or -1 if no judge exists.\n\nInput\n- Line 1: integers n and m\n- Next m lines: trust pair a b\n\nOutput\nOne integer: the judge label or -1.`,
        testCases: [
            { input: '2 1\n1 2', expectedOutput: '2', isHidden: false },
            { input: '3 2\n1 3\n2 3', expectedOutput: '3', isHidden: false },
            { input: '3 3\n1 3\n2 3\n3 1', expectedOutput: '-1', isHidden: false },
            { input: '1 0', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],score=Array(n+1).fill(0);for(let i=2;i<t.length;i+=2){score[t[i]]--;score[t[i+1]]++;}const ans=score.slice(1).findIndex(x=>x===n-1);console.log(ans<0?-1:ans+1);`
    },
    {
        title: 'Number of Provinces',
        description: `An n by n matrix describes an undirected graph: 1 means two cities are directly connected and 0 means they are not. A province is a connected component. Print the number of provinces.\n\nInput\n- Line 1: integer n\n- Next n lines: n space-separated 0 or 1 values\n\nOutput\nOne integer: the number of connected components.`,
        testCases: [
            { input: '3\n1 1 0\n1 1 0\n0 0 1', expectedOutput: '2', isHidden: false },
            { input: '3\n1 0 0\n0 1 0\n0 0 1', expectedOutput: '3', isHidden: false },
            { input: '4\n1 1 1 1\n1 1 0 0\n1 0 1 0\n1 0 0 1', expectedOutput: '1', isHidden: false },
            { input: '1\n1', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=Array.from({length:n},(_,i)=>t.slice(1+i*n,1+(i+1)*n)),seen=new Set();let ans=0;for(let s=0;s<n;s++)if(!seen.has(s)){ans++;const st=[s];seen.add(s);while(st.length){const u=st.pop();for(let v=0;v<n;v++)if(g[u][v]&&!seen.has(v)){seen.add(v);st.push(v);}}}console.log(ans);`
    },
    {
        title: 'Reconstruct Itinerary',
        description: `You are given airline tickets as directed pairs. Starting at JFK, use every ticket exactly once and print the itinerary. If more than one itinerary is possible, print the lexicographically smallest sequence of airport codes.\n\nInput\n- Line 1: integer m\n- Next m lines: departure and arrival airport codes\n\nOutput\nThe m + 1 airport codes in order, separated by spaces.`,
        testCases: [
            { input: '4\nMUC LHR\nJFK MUC\nSFO SJC\nLHR SFO', expectedOutput: 'JFK MUC LHR SFO SJC', isHidden: false },
            { input: '4\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK', expectedOutput: 'JFK ATL JFK SFO ATL', isHidden: false },
            { input: '5\nJFK KUL\nJFK NRT\nNRT JFK\nKUL AAA\nAAA KUL', expectedOutput: 'JFK NRT JFK KUL AAA KUL', isHidden: false },
            { input: '3\nJFK A\nA JFK\nJFK B', expectedOutput: 'JFK A JFK B', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),m=+l[0],g=new Map();for(let i=0;i<m;i++){const a=l[1+2*i],b=l[2+2*i];if(!g.has(a))g.set(a,[]);g.get(a).push(b);}for(const a of g.values())a.sort().reverse();const out=[];function dfs(a){while(g.get(a)?.length)dfs(g.get(a).pop());out.push(a);}dfs('JFK');console.log(out.reverse().join(' '));`
    },
    {
        title: 'All Paths From Source to Target',
        description: `Given a directed acyclic graph with vertices numbered 0 through n - 1, print every path from 0 to n - 1. Print each path as space-separated vertices, one path per line, in lexicographic order.\n\nInput\n- Line 1: integer n\n- Next n lines: integer k followed by k outgoing neighbors\n\nOutput\nEvery source-to-target path, one per line.`,
        testCases: [
            { input: '4\n2 1 2\n1 3\n1 3\n0', expectedOutput: '0 1 3\n0 2 3', isHidden: false },
            { input: '5\n3 4 3 1\n1 4\n0\n1 4\n0', expectedOutput: '0 1 4\n0 3 4\n0 4', isHidden: false },
            { input: '2\n1 1\n0', expectedOutput: '0 1', isHidden: false },
            { input: '4\n2 2 1\n1 3\n1 3\n0', expectedOutput: '0 1 3\n0 2 3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=[];let p=1;for(let i=0;i<n;i++){const k=t[p++];g.push(t.slice(p,p+k).sort((a,b)=>a-b));p+=k;}const out=[];function dfs(u,path){if(u===n-1)out.push(path.join(' '));else for(const v of g[u])dfs(v,[...path,v]);}dfs(0,[0]);console.log(out.join('\\n'));`
    },
    {
        title: 'Keys and Rooms',
        description: `There are n rooms numbered 0 through n - 1. Room 0 is initially unlocked; each room lists keys for other rooms. Print true if every room can be visited, otherwise print false.\n\nInput\n- Line 1: integer n\n- Next n lines: integer k followed by k keys in that room\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '4\n1 1\n1 2\n1 3\n0', expectedOutput: 'true', isHidden: false },
            { input: '4\n1 1\n1 2\n0\n1 0', expectedOutput: 'false', isHidden: false },
            { input: '1\n0', expectedOutput: 'true', isHidden: false },
            { input: '3\n2 1 2\n0\n0', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=[];let p=1;for(let i=0;i<n;i++){const k=t[p++];g.push(t.slice(p,p+k));p+=k;}const seen=new Set([0]),st=[0];while(st.length)for(const v of g[st.pop()])if(!seen.has(v)){seen.add(v);st.push(v);}console.log(seen.size===n?'true':'false');`
    },
    {
        title: 'Evaluate Division',
        description: `Each equation a b value means a / b = value. For each query x y, print x / y. Print -1.00000 when the value cannot be determined.\n\nInput\n- Line 1: integer e\n- Next e lines: variable a, variable b, decimal value\n- Next line: integer q\n- Next q lines: query variables x y\n\nOutput\nOne result per query, formatted with exactly five decimal places.`,
        testCases: [
            { input: '2\na b 2\nb c 3\n5\na c\nb a\na e\na a\nx x', expectedOutput: '6.00000\n0.50000\n-1.00000\n1.00000\n-1.00000', isHidden: false },
            { input: '1\na b 0.5\n3\na b\nb a\na a', expectedOutput: '0.50000\n2.00000\n1.00000', isHidden: false },
            { input: '2\nx y 4\ny z 0.25\n2\nx z\nz x', expectedOutput: '1.00000\n1.00000', isHidden: false },
            { input: '0\n2\na a\na b', expectedOutput: '-1.00000\n-1.00000', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),e=+s[0],g=new Map();let p=1;for(let i=0;i<e;i++){const a=s[p++],b=s[p++],v=+s[p++];for(const [x,y,w] of [[a,b,v],[b,a,1/v]]){if(!g.has(x))g.set(x,[]);g.get(x).push([y,w]);}}const q=+s[p++],out=[];for(let i=0;i<q;i++){const a=s[p++],b=s[p++];if(!g.has(a)||!g.has(b)){out.push('-1.00000');continue;}const st=[[a,1]],seen=new Set([a]);let ans=-1;while(st.length){const [u,w]=st.pop();if(u===b){ans=w;break;}for(const [v,x] of g.get(u))if(!seen.has(v)){seen.add(v);st.push([v,w*x]);}}out.push(ans<0?'-1.00000':ans.toFixed(5));}console.log(out.join('\\n'));`
    },
    {
        title: 'Number of Islands',
        description: `Given a grid of 0 (water) and 1 (land), print the number of islands. Cells belong to the same island when they share a horizontal or vertical side.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated 0 or 1 values\n\nOutput\nOne integer: the number of islands.`,
        testCases: [
            { input: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', expectedOutput: '1', isHidden: false },
            { input: '4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1', expectedOutput: '3', isHidden: false },
            { input: '1 3\n0 0 0', expectedOutput: '0', isHidden: false },
            { input: '2 2\n1 0\n0 1', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],g=Array.from({length:r},(_,i)=>t.slice(2+i*c,2+(i+1)*c));let ans=0;for(let i=0;i<r;i++)for(let j=0;j<c;j++)if(g[i][j]){ans++;const st=[[i,j]];g[i][j]=0;while(st.length){const [x,y]=st.pop();for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<r&&b>=0&&b<c&&g[a][b]){g[a][b]=0;st.push([a,b]);}}}console.log(ans);`
    },
    {
        title: 'Rotting Oranges',
        description: `A grid contains 0 (empty), 1 (fresh orange), and 2 (rotten orange). Every minute, a rotten orange makes its four neighboring fresh oranges rotten. Print the minimum minutes until no fresh orange remains, or -1 if impossible.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated integers\n\nOutput\nOne integer: minutes or -1.`,
        testCases: [
            { input: '3 3\n2 1 1\n1 1 0\n0 1 1', expectedOutput: '4', isHidden: false },
            { input: '3 3\n2 1 1\n0 1 1\n1 0 1', expectedOutput: '-1', isHidden: false },
            { input: '1 2\n0 2', expectedOutput: '0', isHidden: false },
            { input: '2 2\n2 1\n1 1', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],g=Array.from({length:r},(_,i)=>t.slice(2+i*c,2+(i+1)*c)),q=[];let fresh=0,p=0,mins=0;for(let i=0;i<r;i++)for(let j=0;j<c;j++)if(g[i][j]===2)q.push([i,j]);else if(g[i][j]===1)fresh++;while(p<q.length&&fresh){const end=q.length;while(p<end){const [x,y]=q[p++];for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<r&&b>=0&&b<c&&g[a][b]===1){g[a][b]=2;fresh--;q.push([a,b]);}}mins++;}console.log(fresh?-1:mins);`
    },
    {
        title: 'Word Ladder',
        description: `Given a begin word, an end word, and a dictionary of same-length words, print the number of words in the shortest transformation sequence. Each step may change exactly one letter and every intermediate word must be in the dictionary. Print 0 if no sequence exists.\n\nInput\n- Line 1: integer n\n- Next n lines: dictionary words\n- Next line: begin word\n- Next line: end word\n\nOutput\nOne integer: the shortest sequence length or 0.`,
        testCases: [
            { input: '6\nhot\ndot\ndog\nlot\nlog\ncog\nhit\ncog', expectedOutput: '5', isHidden: false },
            { input: '5\nhot\ndot\ndog\nlot\nlog\nhit\ncog', expectedOutput: '0', isHidden: false },
            { input: '1\na\na\na', expectedOutput: '1', isHidden: false },
            { input: '4\nb\nc\na\nd\na\nc', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),n=+l[0],dict=new Set(l.slice(1,n+1)),begin=l[n+1],end=l[n+2];if(!dict.has(end)){console.log(0);process.exit();}const q=[[begin,1]];let p=0;while(p<q.length){const [w,d]=q[p++];if(w===end){console.log(d);process.exit();}for(let i=0;i<w.length;i++)for(let c=97;c<=122;c++){const x=w.slice(0,i)+String.fromCharCode(c)+w.slice(i+1);if(dict.has(x)){dict.delete(x);q.push([x,d+1]);}}}console.log(0);`
    },
    {
        title: 'Surrounded Regions',
        description: `Given a board of X and O, replace every O that is fully surrounded by X with X. An O connected to a border O is not surrounded. Print the transformed board.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: a string of columns X or O characters\n\nOutput\nThe transformed rows, one per line.`,
        testCases: [
            { input: '4 4\nXXXX\nXOOX\nXXOX\nXOXX', expectedOutput: 'XXXX\nXXXX\nXXXX\nXOXX', isHidden: false },
            { input: '1 1\nX', expectedOutput: 'X', isHidden: false },
            { input: '3 3\nOOO\nOOO\nOOO', expectedOutput: 'OOO\nOOO\nOOO', isHidden: false },
            { input: '3 4\nXXXX\nXOOX\nXXXX', expectedOutput: 'XXXX\nXXXX\nXXXX', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),r=+l[0],c=+l[1],g=l.slice(2).map(x=>[...x]),st=[];for(let i=0;i<r;i++)for(let j=0;j<c;j++)if((i===0||j===0||i===r-1||j===c-1)&&g[i][j]==='O'){g[i][j]='S';st.push([i,j]);}while(st.length){const [x,y]=st.pop();for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<r&&b>=0&&b<c&&g[a][b]==='O'){g[a][b]='S';st.push([a,b]);}}console.log(g.map(row=>row.map(x=>x==='S'?'O':'X').join('')).join('\\n'));`
    },
    {
        title: 'Pacific Atlantic Water Flow',
        description: `A matrix gives land heights. Water can flow from a cell to a neighboring cell of equal or lower height. The Pacific touches the top and left edges; the Atlantic touches the bottom and right edges. Print every coordinate that can reach both oceans, sorted by row then column.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated heights\n\nOutput\nOne qualifying coordinate as row column per line.`,
        testCases: [
            { input: '5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4', expectedOutput: '0 4\n1 3\n1 4\n2 2\n3 0\n3 1\n4 0', isHidden: false },
            { input: '1 1\n7', expectedOutput: '0 0', isHidden: false },
            { input: '2 2\n1 2\n4 3', expectedOutput: '0 1\n1 0\n1 1', isHidden: false },
            { input: '1 3\n1 2 3', expectedOutput: '0 0\n0 1\n0 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],g=Array.from({length:r},(_,i)=>t.slice(2+i*c,2+(i+1)*c));function reach(seeds){const s=new Set(seeds.map(([x,y])=>x+','+y)),st=[...seeds];while(st.length){const [x,y]=st.pop();for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<r&&b>=0&&b<c&&!s.has(a+','+b)&&g[a][b]>=g[x][y]){s.add(a+','+b);st.push([a,b]);}}return s;}const p=reach([...Array(r).keys()].map(i=>[i,0]).concat([...Array(c).keys()].map(j=>[0,j]))),a=reach([...Array(r).keys()].map(i=>[i,c-1]).concat([...Array(c).keys()].map(j=>[r-1,j]))),out=[];for(let i=0;i<r;i++)for(let j=0;j<c;j++)if(p.has(i+','+j)&&a.has(i+','+j))out.push(i+' '+j);console.log(out.join('\\n'));`
    },
    {
        title: 'Course Schedule',
        description: `There are n courses numbered 0 through n - 1. A pair a b means course b must be completed before course a. Print true if all courses can be completed, otherwise print false.\n\nInput\n- Line 1: integers n and m\n- Next m lines: prerequisite pair a b\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '2 1\n1 0', expectedOutput: 'true', isHidden: false },
            { input: '2 2\n1 0\n0 1', expectedOutput: 'false', isHidden: false },
            { input: '4 3\n1 0\n2 1\n3 2', expectedOutput: 'true', isHidden: false },
            { input: '3 3\n1 0\n2 1\n0 2', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=Array.from({length:n},()=>[]),inD=Array(n).fill(0);for(let i=2;i<t.length;i+=2){g[t[i+1]].push(t[i]);inD[t[i]]++;}const q=[];for(let i=0;i<n;i++)if(!inD[i])q.push(i);let p=0;while(p<q.length)for(const v of g[q[p++]])if(!--inD[v])q.push(v);console.log(q.length===n?'true':'false');`
    },
    {
        title: 'Course Schedule II',
        description: `There are n courses numbered 0 through n - 1. A pair a b means b must come before a. Print the lexicographically smallest valid course order, or print an empty line if no valid order exists.\n\nInput\n- Line 1: integers n and m\n- Next m lines: prerequisite pair a b\n\nOutput\nA valid order as space-separated course numbers, or an empty line.`,
        testCases: [
            { input: '2 1\n1 0', expectedOutput: '0 1', isHidden: false },
            { input: '4 2\n1 0\n2 0', expectedOutput: '0 1 2 3', isHidden: false },
            { input: '2 2\n1 0\n0 1', expectedOutput: '', isHidden: false },
            { input: '4 3\n3 1\n3 2\n1 0', expectedOutput: '0 1 2 3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=Array.from({length:n},()=>[]),inD=Array(n).fill(0);for(let i=2;i<t.length;i+=2){g[t[i+1]].push(t[i]);inD[t[i]]++;}const q=[];for(let i=0;i<n;i++)if(!inD[i])q.push(i);const out=[];while(q.length){q.sort((a,b)=>a-b);const u=q.shift();out.push(u);for(const v of g[u])if(!--inD[v])q.push(v);}console.log(out.length===n?out.join(' '):'');`
    },
    {
        title: 'Graph Valid Tree',
        description: `Given n vertices numbered 0 through n - 1 and undirected edges, print true if the edges form one valid tree: every vertex is connected and no cycle exists.\n\nInput\n- Line 1: integers n and m\n- Next m lines: undirected edge endpoints\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '5 4\n0 1\n0 2\n0 3\n1 4', expectedOutput: 'true', isHidden: false },
            { input: '5 5\n0 1\n1 2\n2 3\n1 3\n1 4', expectedOutput: 'false', isHidden: false },
            { input: '4 2\n0 1\n2 3', expectedOutput: 'false', isHidden: false },
            { input: '1 0', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],p=Array.from({length:n},(_,i)=>i);function find(x){while(p[x]!==x){p[x]=p[p[x]];x=p[x];}return x;}let ok=m===n-1;for(let i=2;ok&&i<t.length;i+=2){const a=find(t[i]),b=find(t[i+1]);if(a===b)ok=false;else p[a]=b;}console.log(ok?'true':'false');`
    },
    {
        title: '01 Matrix',
        description: `Given a matrix containing only 0 and 1, replace every cell with its distance to the nearest 0. Adjacent cells share a horizontal or vertical side. Print the resulting matrix.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated 0 or 1 values\n\nOutput\nThe distance matrix, one space-separated row per line.`,
        testCases: [
            { input: '3 3\n0 0 0\n0 1 0\n0 0 0', expectedOutput: '0 0 0\n0 1 0\n0 0 0', isHidden: false },
            { input: '3 3\n0 0 0\n0 1 0\n1 1 1', expectedOutput: '0 0 0\n0 1 0\n1 2 1', isHidden: false },
            { input: '1 1\n0', expectedOutput: '0', isHidden: false },
            { input: '2 3\n1 0 1\n1 1 1', expectedOutput: '1 0 1\n2 1 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],d=Array.from({length:r},(_,i)=>t.slice(2+i*c,2+(i+1)*c).map(x=>x?Infinity:0)),q=[];let p=0;for(let i=0;i<r;i++)for(let j=0;j<c;j++)if(d[i][j]===0)q.push([i,j]);while(p<q.length){const [x,y]=q[p++];for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<r&&b>=0&&b<c&&d[a][b]>d[x][y]+1){d[a][b]=d[x][y]+1;q.push([a,b]);}}console.log(d.map(row=>row.join(' ')).join('\\n'));`
    },
    {
        title: 'As Far from Land as Possible',
        description: `A square grid contains 1 for land and 0 for water. For every water cell, its distance is the shortest number of horizontal or vertical moves to land. Print the largest such distance, or -1 if the grid has only land or only water.\n\nInput\n- Line 1: integer n\n- Next n lines: n space-separated 0 or 1 values\n\nOutput\nOne integer: the maximum distance or -1.`,
        testCases: [
            { input: '3\n1 0 1\n0 0 0\n1 0 1', expectedOutput: '2', isHidden: false },
            { input: '3\n1 0 0\n0 0 0\n0 0 0', expectedOutput: '4', isHidden: false },
            { input: '2\n1 1\n1 1', expectedOutput: '-1', isHidden: false },
            { input: '2\n0 0\n0 0', expectedOutput: '-1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=Array.from({length:n},(_,i)=>t.slice(1+i*n,1+(i+1)*n)),q=[];let p=0,dist=-1;for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(g[i][j])q.push([i,j]);if(!q.length||q.length===n*n){console.log(-1);process.exit();}while(p<q.length){const end=q.length;while(p<end){const [x,y]=q[p++];for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(a>=0&&a<n&&b>=0&&b<n&&!g[a][b]){g[a][b]=1;q.push([a,b]);}}dist++;}console.log(dist);`
    },
    {
        title: 'Shortest Path in Binary Matrix',
        description: `Given an n by n binary matrix, find the shortest clear path from the top-left cell to the bottom-right cell. A clear cell is 0, and you may move horizontally, vertically, or diagonally. Print -1 if no such path exists.\n\nInput\n- Line 1: integer n\n- Next n lines: n space-separated 0 or 1 values\n\nOutput\nOne integer: path length in cells, or -1.`,
        testCases: [
            { input: '2\n0 1\n1 0', expectedOutput: '2', isHidden: false },
            { input: '3\n0 0 0\n1 1 0\n1 1 0', expectedOutput: '4', isHidden: false },
            { input: '1\n1', expectedOutput: '-1', isHidden: false },
            { input: '1\n0', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=Array.from({length:n},(_,i)=>t.slice(1+i*n,1+(i+1)*n));if(g[0][0]||g[n-1][n-1]){console.log(-1);process.exit();}const q=[[0,0,1]];g[0][0]=1;let p=0;while(p<q.length){const [x,y,d]=q[p++];if(x===n-1&&y===n-1){console.log(d);process.exit();}for(let a=x-1;a<=x+1;a++)for(let b=y-1;b<=y+1;b++)if(a>=0&&a<n&&b>=0&&b<n&&!g[a][b]){g[a][b]=1;q.push([a,b,d+1]);}}console.log(-1);`
    },
    {
        title: 'Network Delay Time',
        description: `A directed weighted network has vertices numbered 1 through n. Starting from vertex k, print how long it takes for every vertex to receive a signal. Print -1 if any vertex is unreachable.\n\nInput\n- Line 1: integers n, m, and k\n- Next m lines: edge u v travelTime\n\nOutput\nOne integer: the network delay or -1.`,
        testCases: [
            { input: '4 3 2\n2 1 1\n2 3 1\n3 4 1', expectedOutput: '2', isHidden: false },
            { input: '2 1 1\n1 2 1', expectedOutput: '1', isHidden: false },
            { input: '2 1 2\n1 2 1', expectedOutput: '-1', isHidden: false },
            { input: '3 3 1\n1 2 5\n1 3 2\n3 2 1', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],k=t[2],d=Array(n+1).fill(Infinity);d[k]=0;for(let z=1;z<n;z++)for(let i=3;i<3+3*m;i+=3)if(d[t[i]]+t[i+2]<d[t[i+1]])d[t[i+1]]=d[t[i]]+t[i+2];const ans=Math.max(...d.slice(1));console.log(ans===Infinity?-1:ans);`
    },
    {
        title: 'Cheapest Flights Within K Stops',
        description: `Given directed flights u v price, print the cheapest price from src to dst using at most k stops. Print -1 if dst cannot be reached within that limit.\n\nInput\n- Line 1: integers n and m\n- Next m lines: flight u v price\n- Last line: integers src, dst, and k\n\nOutput\nOne integer: the cheapest allowed price or -1.`,
        testCases: [
            { input: '3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 1', expectedOutput: '200', isHidden: false },
            { input: '3 3\n0 1 100\n1 2 100\n0 2 500\n0 2 0', expectedOutput: '500', isHidden: false },
            { input: '4 2\n0 1 50\n1 2 50\n0 3 1', expectedOutput: '-1', isHidden: false },
            { input: '4 5\n0 1 100\n1 3 100\n0 2 500\n2 3 50\n0 3 1000\n0 3 1', expectedOutput: '200', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],base=2+3*m,src=t[base],dst=t[base+1],k=t[base+2];let d=Array(n).fill(Infinity);d[src]=0;for(let z=0;z<=k;z++){const next=[...d];for(let i=2;i<base;i+=3)if(d[t[i]]<Infinity)next[t[i+1]]=Math.min(next[t[i+1]],d[t[i]]+t[i+2]);d=next;}console.log(d[dst]===Infinity?-1:d[dst]);`
    }
];
