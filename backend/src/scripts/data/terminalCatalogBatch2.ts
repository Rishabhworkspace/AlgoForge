import type { TerminalProblem } from './terminalCatalog';

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalogBatch2: TerminalProblem[] = [
    {
        title: 'Maximum Product Subarray',
        description: `Given an integer array, print the largest product of any non-empty contiguous subarray.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the maximum product.`,
        testCases: [
            { input: arrayInput([2, 3, -2, 4]), expectedOutput: '6', isHidden: false },
            { input: arrayInput([-2, 0, -1]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([-2, 3, -4]), expectedOutput: '24', isHidden: false },
            { input: arrayInput([-1, -2, -9, -6]), expectedOutput: '108', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let hi=a[0],lo=a[0],best=a[0];for(let i=1;i<a.length;i++){const x=a[i],[p,q]=[hi,lo];hi=Math.max(x,p*x,q*x);lo=Math.min(x,p*x,q*x);best=Math.max(best,hi);}console.log(best);`
    },
    {
        title: '3Sum',
        description: `Given an integer array, print every unique triplet whose values sum to zero. Sort each triplet in nondecreasing order, then print triplets in lexicographic order, one triplet per line. Print an empty line when there are no triplets.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne zero-sum triplet per line, with values separated by spaces.`,
        testCases: [
            { input: arrayInput([-1, 0, 1, 2, -1, -4]), expectedOutput: '-1 -1 2\n-1 0 1', isHidden: false },
            { input: arrayInput([0, 1, 1]), expectedOutput: '', isHidden: false },
            { input: arrayInput([0, 0, 0]), expectedOutput: '0 0 0', isHidden: false },
            { input: arrayInput([-2, 0, 0, 2, 2]), expectedOutput: '-2 0 2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1).sort((x,y)=>x-y),out=[];for(let i=0;i<a.length-2;i++){if(i&&a[i]===a[i-1])continue;let l=i+1,r=a.length-1;while(l<r){const s=a[i]+a[l]+a[r];if(s<0)l++;else if(s>0)r--;else{out.push(a[i]+' '+a[l]+' '+a[r]);while(a[l]===a[++l]);while(a[r]===a[--r]);}}}console.log(out.join('\\n'));`
    },
    {
        title: 'Find All Numbers Disappeared in an Array',
        description: `The input has n integers, each in the range 1 through n. Some values may repeat. Print every value from 1 through n that does not occur, in ascending order. Print an empty line if none are missing.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nMissing values separated by spaces.`,
        testCases: [
            { input: arrayInput([4, 3, 2, 7, 8, 2, 3, 1]), expectedOutput: '5 6', isHidden: false },
            { input: arrayInput([1, 1]), expectedOutput: '2', isHidden: false },
            { input: arrayInput([1, 2, 3, 4]), expectedOutput: '', isHidden: false },
            { input: arrayInput([2, 2, 2, 2, 2]), expectedOutput: '1 3 4 5', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),seen=new Set(a),out=[];for(let i=1;i<=a.length;i++)if(!seen.has(i))out.push(i);console.log(out.join(' '));`
    },
    {
        title: 'Spiral Matrix',
        description: `Given a matrix, print its values in clockwise spiral order.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated integers\n\nOutput\nAll values in spiral order, separated by spaces.`,
        testCases: [
            { input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 2 3 6 9 8 7 4 5', isHidden: false },
            { input: '1 4\n1 2 3 4', expectedOutput: '1 2 3 4', isHidden: false },
            { input: '3 1\n1\n2\n3', expectedOutput: '1 2 3', isHidden: false },
            { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3 6 5 4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),m=t[0],n=t[1],a=Array.from({length:m},(_,i)=>t.slice(2+i*n,2+(i+1)*n)),out=[];let top=0,bottom=m-1,left=0,right=n-1;while(top<=bottom&&left<=right){for(let j=left;j<=right;j++)out.push(a[top][j]);top++;for(let i=top;i<=bottom;i++)out.push(a[i][right]);right--;if(top<=bottom){for(let j=right;j>=left;j--)out.push(a[bottom][j]);bottom--;}if(left<=right){for(let i=bottom;i>=top;i--)out.push(a[i][left]);left++;}}console.log(out.join(' '));`
    },
    {
        title: 'Rotate Image',
        description: `Given an n by n matrix, rotate it 90 degrees clockwise and print the rotated matrix.\n\nInput\n- Line 1: integer n\n- Next n lines: n space-separated integers\n\nOutput\nn lines of the rotated matrix.`,
        testCases: [
            { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3', isHidden: false },
            { input: '2\n1 2\n3 4', expectedOutput: '3 1\n4 2', isHidden: false },
            { input: '1\n5', expectedOutput: '5', isHidden: false },
            { input: '4\n5 1 9 11\n2 4 8 10\n13 3 6 7\n15 14 12 16', expectedOutput: '15 13 2 5\n14 3 4 1\n12 6 8 9\n16 7 10 11', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=Array.from({length:n},(_,i)=>t.slice(1+i*n,1+(i+1)*n)),out=[];for(let j=0;j<n;j++){const row=[];for(let i=n-1;i>=0;i--)row.push(a[i][j]);out.push(row.join(' '));}console.log(out.join('\\n'));`
    },
    {
        title: 'Set Matrix Zeroes',
        description: `Given a matrix, if an element is zero, set its entire row and column to zero. Print the resulting matrix.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated integers\n\nOutput\nThe transformed matrix, one row per line.`,
        testCases: [
            { input: '3 3\n1 1 1\n1 0 1\n1 1 1', expectedOutput: '1 0 1\n0 0 0\n1 0 1', isHidden: false },
            { input: '3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5', expectedOutput: '0 0 0 0\n0 4 5 0\n0 3 1 0', isHidden: false },
            { input: '1 1\n0', expectedOutput: '0', isHidden: false },
            { input: '2 2\n1 2\n3 4', expectedOutput: '1 2\n3 4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),m=t[0],n=t[1],a=Array.from({length:m},(_,i)=>t.slice(2+i*n,2+(i+1)*n)),rows=new Set(),cols=new Set();for(let i=0;i<m;i++)for(let j=0;j<n;j++)if(a[i][j]===0){rows.add(i);cols.add(j);}for(let i=0;i<m;i++)for(let j=0;j<n;j++)if(rows.has(i)||cols.has(j))a[i][j]=0;console.log(a.map(r=>r.join(' ')).join('\\n'));`
    },
    {
        title: 'Evaluate Reverse Polish Notation',
        description: `Evaluate an arithmetic expression in Reverse Polish Notation. Tokens are integers or +, -, *, /. Division truncates toward zero.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated tokens\n\nOutput\nOne integer: the expression value.`,
        testCases: [
            { input: '5\n2 1 + 3 *', expectedOutput: '9', isHidden: false },
            { input: '5\n4 13 5 / +', expectedOutput: '6', isHidden: false },
            { input: '13\n10 6 9 3 + -11 * / * 17 + 5 +', expectedOutput: '22', isHidden: false },
            { input: '3\n-7 3 /', expectedOutput: '-2', isHidden: true }
        ],
        referenceJavaScript: `const x=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1),s=[];for(const v of x){if(!'+-*/'.includes(v))s.push(Number(v));else{const b=s.pop(),a=s.pop();s.push(v==='+'?a+b:v==='-'?a-b:v==='*'?a*b:Math.trunc(a/b));}}console.log(s[0]);`
    },
    {
        title: 'Daily Temperatures',
        description: `For each daily temperature, print how many days you must wait for a warmer temperature. Print 0 when none exists.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated temperatures\n\nOutput\nn space-separated waiting times.`,
        testCases: [
            { input: arrayInput([73, 74, 75, 71, 69, 72, 76, 73]), expectedOutput: '1 1 4 2 1 1 0 0', isHidden: false },
            { input: arrayInput([30, 40, 50, 60]), expectedOutput: '1 1 1 0', isHidden: false },
            { input: arrayInput([30, 60, 90]), expectedOutput: '1 1 0', isHidden: false },
            { input: arrayInput([90, 80, 70]), expectedOutput: '0 0 0', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),out=Array(a.length).fill(0),s=[];for(let i=0;i<a.length;i++){while(s.length&&a[i]>a[s[s.length-1]]){const j=s.pop();out[j]=i-j;}s.push(i);}console.log(out.join(' '));`
    },
    {
        title: 'Generate Parentheses',
        description: `Given n pairs of parentheses, print every well-formed string containing exactly n opening and n closing parentheses, in lexicographic order. Print one string per line.\n\nInput\n- Line 1: integer n\n\nOutput\nAll valid strings, one per line.`,
        testCases: [
            { input: '1', expectedOutput: '()', isHidden: false },
            { input: '2', expectedOutput: '(())\n()()', isHidden: false },
            { input: '3', expectedOutput: '((()))\n(()())\n(())()\n()(())\n()()()', isHidden: false },
            { input: '0', expectedOutput: '', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),out=[];function go(s,open,close){if(s.length===2*n){out.push(s);return;}if(open<n)go(s+'(',open+1,close);if(close<open)go(s+')',open,close+1);}go('',0,0);console.log(out.join('\\n'));`
    },
    {
        title: 'Decode String',
        description: `An encoded string uses k[encoded] to repeat encoded exactly k times. Given an encoded string containing lowercase letters, digits, and brackets, print its decoded form.\n\nInput\n- Line 1: encoded string\n\nOutput\nThe decoded string.`,
        testCases: [
            { input: '3[a]2[bc]', expectedOutput: 'aaabcbc', isHidden: false },
            { input: '3[a2[c]]', expectedOutput: 'accaccacc', isHidden: false },
            { input: '2[abc]3[cd]ef', expectedOutput: 'abcabccdcdcdef', isHidden: false },
            { input: '10[a]', expectedOutput: 'aaaaaaaaaa', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),stack=[],nums=[];let cur='',num='';for(const c of s){if(/\\d/.test(c))num+=c;else if(c==='['){stack.push(cur);nums.push(Number(num));cur='';num='';}else if(c===']')cur=stack.pop()+cur.repeat(nums.pop());else cur+=c;}console.log(cur);`
    },
    {
        title: 'Kth Largest Element in an Array',
        description: `Given an integer array and k, print the kth largest element in sorted order. Duplicates count as separate elements.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: integer k\n\nOutput\nOne integer: the kth largest value.`,
        testCases: [
            { input: '6\n3 2 1 5 6 4\n2', expectedOutput: '5', isHidden: false },
            { input: '9\n3 2 3 1 2 4 5 5 6\n4', expectedOutput: '4', isHidden: false },
            { input: '1\n7\n1', expectedOutput: '7', isHidden: false },
            { input: '4\n-1 -1 -2 -3\n3', expectedOutput: '-2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),k=t[n+1];a.sort((x,y)=>y-x);console.log(a[k-1]);`
    },
    {
        title: 'Top K Frequent Elements',
        description: `Given an integer array and k, print the k distinct values with the highest frequencies. Break ties by smaller value first.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: integer k\n\nOutput\nk values separated by spaces.`,
        testCases: [
            { input: '6\n1 1 1 2 2 3\n2', expectedOutput: '1 2', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '6\n4 4 1 1 2 2\n2', expectedOutput: '1 2', isHidden: false },
            { input: '8\n-1 -1 -1 2 2 3 3 3\n2', expectedOutput: '-1 3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),k=t[n+1],m=new Map();for(const x of a)m.set(x,(m.get(x)||0)+1);console.log([...m].sort((p,q)=>q[1]-p[1]||p[0]-q[0]).slice(0,k).map(p=>p[0]).join(' '));`
    },
    {
        title: 'K Closest Points to Origin',
        description: `Given points (x, y) and k, print the k points closest to the origin. Compare squared distance; break ties by x then y. Print one point per line.\n\nInput\n- Line 1: integers n and k\n- Next n lines: integers x and y\n\nOutput\nk lines, each containing x and y.`,
        testCases: [
            { input: '2 1\n1 3\n-2 2', expectedOutput: '-2 2', isHidden: false },
            { input: '3 2\n3 3\n5 -1\n-2 4', expectedOutput: '3 3\n-2 4', isHidden: false },
            { input: '3 2\n1 1\n-1 -1\n2 0', expectedOutput: '-1 -1\n1 1', isHidden: false },
            { input: '4 3\n0 2\n2 0\n1 1\n-1 1', expectedOutput: '-1 1\n1 1\n0 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],k=t[1],a=[];for(let i=0;i<n;i++)a.push([t[2+2*i],t[3+2*i]]);a.sort((p,q)=>p[0]*p[0]+p[1]*p[1]-(q[0]*q[0]+q[1]*q[1])||p[0]-q[0]||p[1]-q[1]);console.log(a.slice(0,k).map(p=>p.join(' ')).join('\\n'));`
    },
    {
        title: 'Last Stone Weight',
        description: `Repeatedly smash the two heaviest stones. If they have equal weight, both disappear; otherwise the lighter is destroyed and the difference remains. Print the final stone weight, or 0 if none remain.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated positive stone weights\n\nOutput\nOne integer: the final weight.`,
        testCases: [
            { input: arrayInput([2, 7, 4, 1, 8, 1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([2, 2]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([10, 4, 2, 10]), expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);while(a.length>1){a.sort((x,y)=>x-y);const y=a.pop(),x=a.pop();if(x!==y)a.push(y-x);}console.log(a[0]||0);`
    },
    {
        title: 'Longest Consecutive Sequence',
        description: `Given an unsorted integer array, print the length of its longest sequence of consecutive integer values. Values in the sequence need not be adjacent in the input.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the longest length.`,
        testCases: [
            { input: arrayInput([100, 4, 200, 1, 3, 2]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), expectedOutput: '9', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]), expectedOutput: '7', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),s=new Set(a);let best=0;for(const x of s)if(!s.has(x-1)){let y=x;while(s.has(y))y++;best=Math.max(best,y-x);}console.log(best);`
    },
    {
        title: 'Ransom Note',
        description: `Given a ransom note and a magazine, print true if the note can be built from magazine letters, using each magazine letter at most once. Both strings contain lowercase letters only.\n\nInput\n- Line 1: ransom note\n- Line 2: magazine\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'a\nb', expectedOutput: 'false', isHidden: false },
            { input: 'aa\nab', expectedOutput: 'false', isHidden: false },
            { input: 'aa\naab', expectedOutput: 'true', isHidden: false },
            { input: 'code\ndecoder', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const [note='',mag='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),m=new Map();for(const c of mag)m.set(c,(m.get(c)||0)+1);let ok=true;for(const c of note)if(!m.get(c)){ok=false;break;}else m.set(c,m.get(c)-1);console.log(ok?'true':'false');`
    },
    {
        title: 'Isomorphic Strings',
        description: `Two strings are isomorphic when each character in the first can be replaced consistently to produce the second, with no two source characters sharing one replacement. Print true or false.\n\nInput\n- Line 1: first string\n- Line 2: second string\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'egg\nadd', expectedOutput: 'true', isHidden: false },
            { input: 'foo\nbar', expectedOutput: 'false', isHidden: false },
            { input: 'paper\ntitle', expectedOutput: 'true', isHidden: false },
            { input: 'badc\nbaba', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const [a='',b='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),ab=new Map(),ba=new Map();let ok=a.length===b.length;for(let i=0;ok&&i<a.length;i++){if((ab.has(a[i])&&ab.get(a[i])!==b[i])||(ba.has(b[i])&&ba.get(b[i])!==a[i]))ok=false;ab.set(a[i],b[i]);ba.set(b[i],a[i]);}console.log(ok?'true':'false');`
    },
    {
        title: 'Word Pattern',
        description: `Given a pattern of letters and a space-separated sentence, print true when the pattern maps bijectively to the words in order.\n\nInput\n- Line 1: pattern\n- Line 2: space-separated words\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'abba\ndog cat cat dog', expectedOutput: 'true', isHidden: false },
            { input: 'abba\ndog cat cat fish', expectedOutput: 'false', isHidden: false },
            { input: 'aaaa\ndog cat cat dog', expectedOutput: 'false', isHidden: false },
            { input: 'abc\none two three', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),p=lines[0]||'',w=(lines[1]||'').trim().split(/\\s+/).filter(Boolean),m=new Map(),used=new Set();let ok=p.length===w.length;for(let i=0;ok&&i<p.length;i++){if(m.has(p[i]))ok=m.get(p[i])===w[i];else if(used.has(w[i]))ok=false;else{m.set(p[i],w[i]);used.add(w[i]);}}console.log(ok?'true':'false');`
    },
    {
        title: 'First Unique Character in a String',
        description: `Given a lowercase string, print the zero-based index of its first character that occurs exactly once. Print -1 if every character repeats.\n\nInput\n- Line 1: string\n\nOutput\nOne integer: the first unique index or -1.`,
        testCases: [
            { input: 'leetcode', expectedOutput: '0', isHidden: false },
            { input: 'loveleetcode', expectedOutput: '2', isHidden: false },
            { input: 'aabb', expectedOutput: '-1', isHidden: false },
            { input: 'z', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),m=new Map();for(const c of s)m.set(c,(m.get(c)||0)+1);console.log([...s].findIndex(c=>m.get(c)===1));`
    },
    {
        title: 'Subarray Sum Equals K',
        description: `Given an integer array and an integer k, print how many contiguous subarrays have sum exactly k.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: integer k\n\nOutput\nOne integer: the number of qualifying subarrays.`,
        testCases: [
            { input: '3\n1 1 1\n2', expectedOutput: '2', isHidden: false },
            { input: '3\n1 2 3\n3', expectedOutput: '2', isHidden: false },
            { input: '1\n1\n0', expectedOutput: '0', isHidden: false },
            { input: '5\n1 -1 0 2 -2\n0', expectedOutput: '6', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),k=t[n+1],m=new Map([[0,1]]);let sum=0,count=0;for(const x of a){sum+=x;count+=m.get(sum-k)||0;m.set(sum,(m.get(sum)||0)+1);}console.log(count);`
    }
];
