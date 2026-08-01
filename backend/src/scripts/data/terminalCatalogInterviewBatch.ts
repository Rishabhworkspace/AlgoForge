import type { TerminalProblem } from './terminalCatalog';

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalogInterviewBatch: TerminalProblem[] = [
    {
        title: 'Merge Intervals',
        description: `Given intervals with inclusive endpoints, merge every pair that overlaps. Sort the merged intervals by start, then print one interval per line.\n\nInput\n- Line 1: integer n\n- Next n lines: two integers start and end\n\nOutput\nOne merged interval per line, as start and end.`,
        testCases: [
            { input: '4\n1 3\n2 6\n8 10\n15 18', expectedOutput: '1 6\n8 10\n15 18', isHidden: false },
            { input: '2\n1 4\n4 5', expectedOutput: '1 5', isHidden: false },
            { input: '3\n5 7\n1 2\n3 4', expectedOutput: '1 2\n3 4\n5 7', isHidden: false },
            { input: '4\n1 4\n0 2\n3 5\n9 10', expectedOutput: '0 5\n9 10', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=[];for(let i=0;i<n;i++)a.push([t[1+2*i],t[2+2*i]]);a.sort((x,y)=>x[0]-y[0]);const out=[];for(const p of a){const last=out[out.length-1];if(last&&p[0]<=last[1])last[1]=Math.max(last[1],p[1]);else out.push([...p]);}console.log(out.map(p=>p.join(' ')).join('\\n'));`
    },
    {
        title: 'Next Permutation',
        description: `Rearrange an integer array into the next lexicographically greater permutation. If no greater permutation exists, rearrange it into ascending order. Print the resulting array.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nn space-separated integers.`,
        testCases: [
            { input: arrayInput([1, 2, 3]), expectedOutput: '1 3 2', isHidden: false },
            { input: arrayInput([3, 2, 1]), expectedOutput: '1 2 3', isHidden: false },
            { input: arrayInput([1, 1, 5]), expectedOutput: '1 5 1', isHidden: false },
            { input: arrayInput([1, 3, 2]), expectedOutput: '2 1 3', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let i=a.length-2;while(i>=0&&a[i]>=a[i+1])i--;if(i>=0){let j=a.length-1;while(a[j]<=a[i])j--;[a[i],a[j]]=[a[j],a[i]];}for(let l=i+1,r=a.length-1;l<r;l++,r--)[a[l],a[r]]=[a[r],a[l]];console.log(a.join(' '));`
    },
    {
        title: 'Longest Common Prefix',
        description: `Given n lowercase words, print their longest shared prefix. Print an empty line if they have no common prefix.\n\nInput\n- Line 1: integer n\n- Next n lines: one word each\n\nOutput\nThe longest common prefix.`,
        testCases: [
            { input: '3\nflower\nflow\nflight', expectedOutput: 'fl', isHidden: false },
            { input: '3\ndog\nracecar\ncar', expectedOutput: '', isHidden: false },
            { input: '2\ninterview\ninterview', expectedOutput: 'interview', isHidden: false },
            { input: '4\nprefix\npreach\nprevent\npremise', expectedOutput: 'pre', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1);let p=a[0]||'';for(const s of a)while(!s.startsWith(p))p=p.slice(0,-1);console.log(p);`
    },
    {
        title: 'String to Integer (atoi)',
        description: `Convert a line of text to a 32-bit signed integer. Ignore leading spaces, accept one optional sign, then consume consecutive digits. Clamp values outside [-2147483648, 2147483647]. Print 0 if no digit follows the optional sign.\n\nInput\n- Line 1: text\n\nOutput\nOne integer.`,
        testCases: [
            { input: '42', expectedOutput: '42', isHidden: false },
            { input: '   -42', expectedOutput: '-42', isHidden: false },
            { input: '4193 with words', expectedOutput: '4193', isHidden: false },
            { input: '-91283472332', expectedOutput: '-2147483648', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trimStart(),m=s.match(/^[+-]?\\d+/);let x=m?Number(m[0]):0;x=Math.max(-2147483648,Math.min(2147483647,x));console.log(x);`
    },
    {
        title: 'Group Anagrams',
        description: `Group lowercase words that are anagrams. Sort words within each group alphabetically, order groups by their first word, and print one group per line.\n\nInput\n- Line 1: integer n\n- Next n lines: one word each\n\nOutput\nOne space-separated anagram group per line.`,
        testCases: [
            { input: '6\neat\ntea\ntan\nate\nnat\nbat', expectedOutput: 'ate eat tea\nbat\nnat tan', isHidden: false },
            { input: '1\nsolo', expectedOutput: 'solo', isHidden: false },
            { input: '3\na\na\nb', expectedOutput: 'a a\nb', isHidden: false },
            { input: '4\nlisten\nsilent\nenlist\nrat', expectedOutput: 'enlist listen silent\nrat', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1),m=new Map();for(const s of a){const k=[...s].sort().join('');if(!m.has(k))m.set(k,[]);m.get(k).push(s);}const out=[...m.values()].map(g=>g.sort()).sort((x,y)=>x[0].localeCompare(y[0]));console.log(out.map(g=>g.join(' ')).join('\\n'));`
    },
    {
        title: 'Longest Palindromic Substring',
        description: `Given a lowercase string, print its longest contiguous palindrome. If several have the same maximum length, print the one with the smallest starting index.\n\nInput\n- Line 1: string\n\nOutput\nThe chosen palindrome.`,
        testCases: [
            { input: 'babad', expectedOutput: 'bab', isHidden: false },
            { input: 'cbbd', expectedOutput: 'bb', isHidden: false },
            { input: 'a', expectedOutput: 'a', isHidden: false },
            { input: 'forgeeksskeegfor', expectedOutput: 'geeksskeeg', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim();let start=0,len=0;for(let c=0;c<s.length;c++)for(const d of [0,1]){let l=c,r=c+d;while(l>=0&&r<s.length&&s[l]===s[r])l--,r++;if(r-l-1>len)start=l+1,len=r-l-1;}console.log(s.slice(start,start+len));`
    },
    {
        title: 'Implement strStr()',
        description: `Given a text and a pattern, print the zero-based index of the first occurrence of the pattern in the text. Print -1 when it is absent. An empty pattern occurs at index 0.\n\nInput\n- Line 1: text\n- Line 2: pattern\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'sadbutsad\nsad', expectedOutput: '0', isHidden: false },
            { input: 'leetcode\nleeto', expectedOutput: '-1', isHidden: false },
            { input: 'abc\n', expectedOutput: '0', isHidden: false },
            { input: 'mississippi\nissip', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').split(/\\r?\\n/),text=lines[0]||'',pattern=lines[1]||'';console.log(text.indexOf(pattern));`
    },
    {
        title: 'Merge Sorted Array',
        description: `Two nondecreasing arrays are provided. Print all their values merged into one nondecreasing array.\n\nInput\n- Line 1: integers m and n\n- Line 2: m space-separated integers (empty when m is 0)\n- Line 3: n space-separated integers (empty when n is 0)\n\nOutput\nm+n space-separated integers.`,
        testCases: [
            { input: '3 3\n1 2 3\n2 5 6', expectedOutput: '1 2 2 3 5 6', isHidden: false },
            { input: '1 0\n1\n', expectedOutput: '1', isHidden: false },
            { input: '0 1\n\n1', expectedOutput: '1', isHidden: false },
            { input: '3 4\n-2 0 4\n-3 1 2 5', expectedOutput: '-3 -2 0 1 2 4 5', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').split(/\\r?\\n/),[m,n]=lines[0].trim().split(/\\s+/).map(Number),a=(lines[1]||'').trim().split(/\\s+/).filter(Boolean).map(Number),b=(lines[2]||'').trim().split(/\\s+/).filter(Boolean).map(Number);let i=0,j=0,out=[];while(i<m||j<n)out.push(j===n||(i<m&&a[i]<=b[j])?a[i++]:b[j++]);console.log(out.join(' '));`
    },
    {
        title: 'Clone Graph',
        description: `An undirected graph has vertices numbered 1 through n and m edges. Starting from vertex 1, clone its reachable component conceptually, then print its adjacency lists in vertex order. Each neighbor list must be sorted.\n\nInput\n- Line 1: integers n and m\n- Next m lines: an undirected edge u v\n\nOutput\nFor every reachable vertex, print vertex followed by its sorted neighbors.`,
        testCases: [
            { input: '4 4\n1 2\n1 4\n2 3\n3 4', expectedOutput: '1 2 4\n2 1 3\n3 2 4\n4 1 3', isHidden: false },
            { input: '1 0', expectedOutput: '1', isHidden: false },
            { input: '4 2\n1 2\n3 4', expectedOutput: '1 2\n2 1', isHidden: false },
            { input: '5 5\n1 3\n1 2\n2 4\n3 4\n4 5', expectedOutput: '1 2 3\n2 1 4\n3 1 4\n4 2 3 5\n5 4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],g=Array.from({length:n+1},()=>[]);for(let i=0;i<m;i++){const u=t[2+2*i],v=t[3+2*i];g[u].push(v);g[v].push(u);}const seen=new Set([1]),q=[1];for(let i=0;i<q.length;i++)for(const v of g[q[i]])if(!seen.has(v))seen.add(v),q.push(v);console.log([...seen].sort((a,b)=>a-b).map(u=>[u,...g[u].sort((a,b)=>a-b)].join(' ')).join('\\n'));`
    },
    {
        title: 'Next Greater Element I',
        description: `nums1 is a subset of nums2, whose values are distinct. For each value in nums1, print the first greater value to its right in nums2, or -1 if none exists.\n\nInput\n- Line 1: integers m and n\n- Line 2: m space-separated nums1 values\n- Line 3: n space-separated nums2 values\n\nOutput\nm space-separated answers.`,
        testCases: [
            { input: '3 4\n4 1 2\n1 3 4 2', expectedOutput: '-1 3 -1', isHidden: false },
            { input: '2 4\n2 4\n1 2 3 4', expectedOutput: '3 -1', isHidden: false },
            { input: '1 1\n1\n1', expectedOutput: '-1', isHidden: false },
            { input: '3 5\n1 3 5\n5 1 2 3 4', expectedOutput: '2 4 -1', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),a=lines[1].trim().split(/\\s+/).map(Number),b=lines[2].trim().split(/\\s+/).map(Number),m=new Map(),s=[];for(const x of b){while(s.length&&x>s[s.length-1])m.set(s.pop(),x);s.push(x);}console.log(a.map(x=>m.get(x)||-1).join(' '));`
    },
    {
        title: 'Pow(x, n)',
        description: `Given an integer base x and nonnegative integer exponent n, print x raised to n. Inputs are chosen so the exact result is an integer.\n\nInput\n- Line 1: integers x and n\n\nOutput\nOne integer.`,
        testCases: [
            { input: '2 10', expectedOutput: '1024', isHidden: false },
            { input: '2 0', expectedOutput: '1', isHidden: false },
            { input: '-2 3', expectedOutput: '-8', isHidden: false },
            { input: '3 7', expectedOutput: '2187', isHidden: true }
        ],
        referenceJavaScript: `let [x,n]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),out=1;while(n){if(n&1)out*=x;x*=x;n>>=1;}console.log(out);`
    },
    {
        title: 'Number of Connected Components',
        description: `Given an undirected graph with vertices 0 through n-1, print its number of connected components.\n\nInput\n- Line 1: integers n and m\n- Next m lines: undirected edge u v\n\nOutput\nOne integer.`,
        testCases: [
            { input: '5 3\n0 1\n1 2\n3 4', expectedOutput: '2', isHidden: false },
            { input: '5 4\n0 1\n1 2\n2 3\n3 4', expectedOutput: '1', isHidden: false },
            { input: '3 0', expectedOutput: '3', isHidden: false },
            { input: '6 3\n0 1\n2 3\n4 5', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],m=t[1],p=Array.from({length:n},(_,i)=>i);function f(x){while(p[x]!==x)x=p[x]=p[p[x]];return x;}let count=n;for(let i=0;i<m;i++){const a=f(t[2+2*i]),b=f(t[3+2*i]);if(a!==b)p[a]=b,count--;}console.log(count);`
    },
    {
        title: 'Happy Number',
        description: `Starting with n, repeatedly replace it with the sum of the squares of its digits. Print true if the process reaches 1; otherwise print false when it loops.\n\nInput\n- Line 1: positive integer n\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '19', expectedOutput: 'true', isHidden: false },
            { input: '2', expectedOutput: 'false', isHidden: false },
            { input: '1', expectedOutput: 'true', isHidden: false },
            { input: '7', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `let n=Number(require('fs').readFileSync(0,'utf8').trim()),seen=new Set();while(n!==1&&!seen.has(n)){seen.add(n);n=String(n).split('').reduce((s,c)=>s+Number(c)**2,0);}console.log(n===1?'true':'false');`
    },
    {
        title: 'Count Primes',
        description: `Given a nonnegative integer n, print how many prime numbers are strictly smaller than n.\n\nInput\n- Line 1: integer n\n\nOutput\nOne integer.`,
        testCases: [
            { input: '10', expectedOutput: '4', isHidden: false },
            { input: '0', expectedOutput: '0', isHidden: false },
            { input: '2', expectedOutput: '0', isHidden: false },
            { input: '100', expectedOutput: '25', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),prime=Array(n).fill(true);let count=0;for(let i=2;i<n;i++)if(prime[i]){count++;for(let j=i*i;j<n;j+=i)prime[j]=false;}console.log(count);`
    },
    {
        title: 'Reverse Integer',
        description: `Reverse the decimal digits of a signed 32-bit integer. Preserve the sign and discard leading zeroes after reversal. Print 0 if the reversed value is outside the 32-bit signed range.\n\nInput\n- Line 1: integer x\n\nOutput\nOne integer.`,
        testCases: [
            { input: '123', expectedOutput: '321', isHidden: false },
            { input: '-123', expectedOutput: '-321', isHidden: false },
            { input: '120', expectedOutput: '21', isHidden: false },
            { input: '1534236469', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const x=Number(require('fs').readFileSync(0,'utf8').trim()),r=Math.sign(x)*Number(String(Math.abs(x)).split('').reverse().join(''));console.log(r<-2147483648||r>2147483647?0:r);`
    },
    {
        title: 'Implement Queue using Stacks',
        description: `Process queue commands using first-in, first-out behavior. Commands are push x, pop, peek, and empty. Print one line for every pop, peek, or empty command. A pop or peek is only given when the queue is nonempty.\n\nInput\n- Line 1: integer q\n- Next q lines: one command\n\nOutput\nOne result per output-producing command; empty prints true or false.`,
        testCases: [
            { input: '6\npush 1\npush 2\npeek\npop\nempty\npeek', expectedOutput: '1\n1\nfalse\n2', isHidden: false },
            { input: '4\npush 5\npop\npush 7\npop', expectedOutput: '5\n7', isHidden: false },
            { input: '1\nempty', expectedOutput: 'true', isHidden: false },
            { input: '7\npush 3\npush 4\npop\npush 5\npeek\npop\npop', expectedOutput: '3\n4\n4\n5', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),q=[];for(const line of lines.slice(1)){const [op,x]=line.split(' ');if(op==='push')q.push(Number(x));else if(op==='pop')console.log(q.shift());else if(op==='peek')console.log(q[0]);else console.log(q.length?'false':'true');}`
    },
    {
        title: 'Min Stack',
        description: `Process stack commands. Commands are push x, pop, top, getMin, and empty. Print one line for every top, getMin, or empty command. A pop, top, or getMin is only given when the stack is nonempty.\n\nInput\n- Line 1: integer q\n- Next q lines: one command\n\nOutput\nOne result per output-producing command; empty prints true or false.`,
        testCases: [
            { input: '7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', expectedOutput: '-3\n0\n-2', isHidden: false },
            { input: '4\npush 2\npush 1\ngetMin\ntop', expectedOutput: '1\n1', isHidden: false },
            { input: '3\nempty\npush 4\nempty', expectedOutput: 'true\nfalse', isHidden: false },
            { input: '8\npush 5\npush 6\npush 3\npop\ngetMin\npush 2\ntop\ngetMin', expectedOutput: '5\n2\n2', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),s=[],mins=[];for(const line of lines.slice(1)){const [op,x]=line.split(' ');if(op==='push'){const v=Number(x);s.push(v);mins.push(Math.min(v,mins[mins.length-1]??Infinity));}else if(op==='pop')s.pop(),mins.pop();else if(op==='top')console.log(s[s.length-1]);else if(op==='getMin')console.log(mins[mins.length-1]);else console.log(s.length?'false':'true');}`
    },
    {
        title: 'Longest Common Subsequence',
        description: `Given two strings, print the length of their longest common subsequence. A subsequence preserves order but need not be contiguous.\n\nInput\n- Line 1: first string\n- Line 2: second string\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'abcde\nace', expectedOutput: '3', isHidden: false },
            { input: 'abc\nabc', expectedOutput: '3', isHidden: false },
            { input: 'abc\ndef', expectedOutput: '0', isHidden: false },
            { input: 'bl\nyby', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const [a='',b='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/);let dp=Array(b.length+1).fill(0);for(const x of a){const next=[0];for(let j=0;j<b.length;j++)next.push(x===b[j]?dp[j]+1:Math.max(dp[j+1],next[j]));dp=next;}console.log(dp[b.length]);`
    },
    {
        title: 'Find First and Last Position of Element in Sorted Array',
        description: `Given a nondecreasing integer array and a target, print the first and last zero-based positions of the target. Print -1 -1 if it is absent.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: target integer\n\nOutput\nTwo integers: first and last position.`,
        testCases: [
            { input: '6\n5 7 7 8 8 10\n8', expectedOutput: '3 4', isHidden: false },
            { input: '6\n5 7 7 8 8 10\n6', expectedOutput: '-1 -1', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '0 0', isHidden: false },
            { input: '5\n2 2 2 2 2\n2', expectedOutput: '0 4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),x=t[n+1];function bound(upper){let l=0,r=n;while(l<r){const m=(l+r)>>1;if(a[m]<x||(upper&&a[m]===x))l=m+1;else r=m;}return l;}const l=bound(false),r=bound(true)-1;console.log(l<n&&a[l]===x?l+' '+r:'-1 -1');`
    },
    {
        title: 'Sort Colors',
        description: `An array contains only 0, 1, and 2. Sort it in nondecreasing order and print the result.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated values\n\nOutput\nn space-separated sorted values.`,
        testCases: [
            { input: arrayInput([2, 0, 2, 1, 1, 0]), expectedOutput: '0 0 1 1 2 2', isHidden: false },
            { input: arrayInput([2, 0, 1]), expectedOutput: '0 1 2', isHidden: false },
            { input: arrayInput([0]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([1, 2, 0, 1, 2, 0]), expectedOutput: '0 0 1 1 2 2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let l=0,i=0,r=a.length-1;while(i<=r){if(a[i]===0)[a[l++],a[i++]]=[a[i],a[l]];else if(a[i]===2)[a[r--],a[i]]=[a[i],a[r]];else i++;}console.log(a.join(' '));`
    }
];
