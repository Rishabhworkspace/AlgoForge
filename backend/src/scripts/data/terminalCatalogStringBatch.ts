import type { TerminalProblem } from './terminalCatalog';

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalogStringBatch: TerminalProblem[] = [
    {
        title: 'Implement Stack using Queues',
        description: `Process stack commands using last-in, first-out behavior. Commands are push x, pop, top, and empty. Print one line for every pop, top, or empty command. A pop or top command is only given when the stack is nonempty.\n\nInput\n- Line 1: integer q\n- Next q lines: one command\n\nOutput\nOne result per output-producing command; empty prints true or false.`,
        testCases: [
            { input: '6\npush 1\npush 2\ntop\npop\nempty\ntop', expectedOutput: '2\n2\nfalse\n1', isHidden: false },
            { input: '5\nempty\npush -3\npush 4\npop\ntop', expectedOutput: 'true\n4\n-3', isHidden: false },
            { input: '4\npush 7\npop\npush 8\npop', expectedOutput: '7\n8', isHidden: false },
            { input: '7\npush 3\npush 5\npop\npush 9\ntop\npop\ntop', expectedOutput: '5\n9\n9\n3', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),s=[];for(const line of lines.slice(1)){const [op,x]=line.split(' ');if(op==='push')s.push(Number(x));else if(op==='pop')console.log(s.pop());else if(op==='top')console.log(s[s.length-1]);else console.log(s.length?'false':'true');}`
    },
    {
        title: 'Largest Rectangle in Histogram',
        description: `Given bar heights in a histogram with width 1, print the largest area of a rectangle that can be formed from consecutive bars.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative heights\n\nOutput\nOne integer: the maximum rectangle area.`,
        testCases: [
            { input: arrayInput([2, 1, 5, 6, 2, 3]), expectedOutput: '10', isHidden: false },
            { input: arrayInput([2, 4]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([1, 1, 1, 1]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([6, 2, 5, 4, 5, 1, 6]), expectedOutput: '12', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),s=[],h=[...a,0];let best=0;for(let i=0;i<h.length;i++){while(s.length&&h[s[s.length-1]]>h[i]){const height=h[s.pop()],left=s.length?s[s.length-1]:-1;best=Math.max(best,height*(i-left-1));}s.push(i);}console.log(best);`
    },
    {
        title: 'Trapping Rain Water',
        description: `Each number is the height of a bar of width 1. Print the total units of water trapped after raining.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated nonnegative heights\n\nOutput\nOne integer: total trapped water.`,
        testCases: [
            { input: arrayInput([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), expectedOutput: '6', isHidden: false },
            { input: arrayInput([4, 2, 0, 3, 2, 5]), expectedOutput: '9', isHidden: false },
            { input: arrayInput([1, 2, 3]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([5, 4, 1, 2]), expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let l=0,r=a.length-1,L=0,R=0,water=0;while(l<r){if(a[l]<a[r]){L=Math.max(L,a[l]);water+=L-a[l++];}else{R=Math.max(R,a[r]);water+=R-a[r--];}}console.log(water);`
    },
    {
        title: 'Basic Calculator II',
        description: `Evaluate an expression containing nonnegative integers, spaces, and the operators +, -, *, and /. Division truncates toward zero.\n\nInput\n- Line 1: expression\n\nOutput\nOne integer: the expression value.`,
        testCases: [
            { input: '3+2*2', expectedOutput: '7', isHidden: false },
            { input: ' 3/2 ', expectedOutput: '1', isHidden: false },
            { input: ' 3+5 / 2 ', expectedOutput: '5', isHidden: false },
            { input: '14-3/2', expectedOutput: '13', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim()+'+',st=[];let n=0,op='+';for(const c of s){if(c>='0'&&c<='9')n=n*10+Number(c);else if(c!==' '){if(op==='+')st.push(n);else if(op==='-')st.push(-n);else if(op==='*')st.push(st.pop()*n);else st.push(Math.trunc(st.pop()/n));op=c;n=0;}}console.log(st.reduce((a,b)=>a+b,0));`
    },
    {
        title: 'Design Circular Queue',
        description: `Implement a circular queue with a fixed capacity. Commands are enQueue x, deQueue, Front, Rear, isEmpty, and isFull. Print a result for every command: enQueue and deQueue print true or false; Front and Rear print the value or -1; isEmpty and isFull print true or false.\n\nInput\n- Line 1: capacity k\n- Line 2: integer q\n- Next q lines: one command\n\nOutput\nOne result per command.`,
        testCases: [
            { input: '3\n8\nenQueue 1\nenQueue 2\nenQueue 3\nenQueue 4\nRear\nisFull\ndeQueue\nenQueue 4', expectedOutput: 'true\ntrue\ntrue\nfalse\n3\ntrue\ntrue\ntrue', isHidden: false },
            { input: '1\n6\nisEmpty\nFront\nenQueue 5\nisFull\ndeQueue\nRear', expectedOutput: 'true\n-1\ntrue\ntrue\ntrue\n-1', isHidden: false },
            { input: '2\n5\nenQueue -1\nenQueue -2\nFront\ndeQueue\nFront', expectedOutput: 'true\ntrue\n-1\ntrue\n-2', isHidden: false },
            { input: '2\n9\nenQueue 1\nenQueue 2\ndeQueue\nenQueue 3\nFront\nRear\ndeQueue\ndeQueue\nisEmpty', expectedOutput: 'true\ntrue\ntrue\ntrue\n2\n3\ntrue\ntrue\ntrue', isHidden: true }
        ],
        referenceJavaScript: `const lines=require('fs').readFileSync(0,'utf8').trim().split(/\\r?\\n/),k=Number(lines[0]),q=[],out=[];for(const line of lines.slice(2)){const [op,x]=line.split(' ');if(op==='enQueue'){const ok=q.length<k;if(ok)q.push(Number(x));out.push(String(ok));}else if(op==='deQueue'){const ok=q.length>0;if(ok)q.shift();out.push(String(ok));}else if(op==='Front')out.push(String(q[0]??-1));else if(op==='Rear')out.push(String(q[q.length-1]??-1));else if(op==='isEmpty')out.push(String(!q.length));else out.push(String(q.length===k));}console.log(out.join('\\n'));`
    },
    {
        title: 'Sliding Window Maximum',
        description: `Given an integer array and a window size k, print the maximum value in every contiguous window of k elements.\n\nInput\n- Line 1: integers n and k\n- Line 2: n space-separated integers\n\nOutput\nn-k+1 space-separated window maxima.`,
        testCases: [
            { input: '8 3\n1 3 -1 -3 5 3 6 7', expectedOutput: '3 3 5 5 6 7', isHidden: false },
            { input: '1 1\n1', expectedOutput: '1', isHidden: false },
            { input: '5 2\n9 8 7 6 5', expectedOutput: '9 8 7 6', isHidden: false },
            { input: '6 4\n1 3 1 2 0 5', expectedOutput: '3 3 5', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],k=t[1],a=t.slice(2),q=[],out=[];for(let i=0;i<n;i++){while(q.length&&q[0]<=i-k)q.shift();while(q.length&&a[q[q.length-1]]<=a[i])q.pop();q.push(i);if(i>=k-1)out.push(a[q[0]]);}console.log(out.join(' '));`
    },
    {
        title: 'Basic Calculator',
        description: `Evaluate an expression containing integers, spaces, +, -, (, and ).\n\nInput\n- Line 1: expression\n\nOutput\nOne integer: the expression value.`,
        testCases: [
            { input: '1 + 1', expectedOutput: '2', isHidden: false },
            { input: ' 2-1 + 2 ', expectedOutput: '3', isHidden: false },
            { input: '(1+(4+5+2)-3)+(6+8)', expectedOutput: '23', isHidden: false },
            { input: '2-(5-6)', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim();let total=0,n=0,sign=1,st=[];for(const c of s+'+'){if(c>='0'&&c<='9')n=n*10+Number(c);else if(c!==' '){total+=sign*n;n=0;if(c==='+')sign=1;else if(c==='-')sign=-1;else if(c==='('){st.push(total,sign);total=0;sign=1;}else if(c===')'){total*=st.pop();total+=st.pop();}}}console.log(total);`
    },
    {
        title: 'Find All Anagrams in a String',
        description: `Given lowercase strings s and p, print the zero-based starting indices of every substring of s that is an anagram of p, in increasing order. Print an empty line when there are none.\n\nInput\n- Line 1: string s\n- Line 2: string p\n\nOutput\nSpace-separated indices.`,
        testCases: [
            { input: 'cbaebabacd\nabc', expectedOutput: '0 6', isHidden: false },
            { input: 'abab\nab', expectedOutput: '0 1 2', isHidden: false },
            { input: 'a\na', expectedOutput: '0', isHidden: false },
            { input: 'af\nbe', expectedOutput: '', isHidden: true }
        ],
        referenceJavaScript: `const [s='',p='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),need=Array(26).fill(0),have=Array(26).fill(0),out=[];for(const c of p)need[c.charCodeAt(0)-97]++;for(let i=0;i<s.length;i++){have[s.charCodeAt(i)-97]++;if(i>=p.length)have[s.charCodeAt(i-p.length)-97]--;if(i>=p.length-1&&have.every((x,j)=>x===need[j]))out.push(i-p.length+1);}console.log(out.join(' '));`
    },
    {
        title: 'Fruit Into Baskets',
        description: `Each number identifies a fruit type on a row of trees. You may collect from one contiguous segment containing at most two fruit types. Print the largest possible number of fruits.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated fruit types\n\nOutput\nOne integer.`,
        testCases: [
            { input: arrayInput([1, 2, 1]), expectedOutput: '3', isHidden: false },
            { input: arrayInput([0, 1, 2, 2]), expectedOutput: '3', isHidden: false },
            { input: arrayInput([1, 2, 3, 2, 2]), expectedOutput: '4', isHidden: false },
            { input: arrayInput([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]), expectedOutput: '5', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),m=new Map();let l=0,best=0;for(let r=0;r<a.length;r++){m.set(a[r],(m.get(a[r])||0)+1);while(m.size>2){m.set(a[l],m.get(a[l])-1);if(!m.get(a[l]))m.delete(a[l]);l++;}best=Math.max(best,r-l+1);}console.log(best);`
    },
    {
        title: 'Minimum Window Substring',
        description: `Given strings s and t, print the shortest substring of s that contains every character of t with at least its required multiplicity. If multiple shortest windows exist, print the leftmost. Print an empty line if no window exists.\n\nInput\n- Line 1: string s\n- Line 2: string t\n\nOutput\nThe chosen substring.`,
        testCases: [
            { input: 'ADOBECODEBANC\nABC', expectedOutput: 'BANC', isHidden: false },
            { input: 'a\na', expectedOutput: 'a', isHidden: false },
            { input: 'a\naa', expectedOutput: '', isHidden: false },
            { input: 'aaabdabcefaecbef\nabc', expectedOutput: 'abc', isHidden: true }
        ],
        referenceJavaScript: `const [s='',t='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),need=new Map(),have=new Map();for(const c of t)need.set(c,(need.get(c)||0)+1);let formed=0,l=0,best='';for(let r=0;r<s.length;r++){const c=s[r];have.set(c,(have.get(c)||0)+1);if(have.get(c)===need.get(c))formed++;while(formed===need.size){if(!best||r-l+1<best.length)best=s.slice(l,r+1);const d=s[l++];have.set(d,have.get(d)-1);if(have.get(d)<need.get(d))formed--;}}console.log(best);`
    },
    {
        title: 'Longest Repeating Character Replacement',
        description: `Given an uppercase string and integer k, you may replace at most k characters in one substring so every character in that substring is equal. Print the maximum possible substring length.\n\nInput\n- Line 1: uppercase string\n- Line 2: integer k\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'ABAB\n2', expectedOutput: '4', isHidden: false },
            { input: 'AABABBA\n1', expectedOutput: '4', isHidden: false },
            { input: 'AAAA\n0', expectedOutput: '4', isHidden: false },
            { input: 'ABCDE\n1', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const [s='',ks='0']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),m=new Map();let l=0,max=0,best=0,k=Number(ks);for(let r=0;r<s.length;r++){m.set(s[r],(m.get(s[r])||0)+1);max=Math.max(max,m.get(s[r]));while(r-l+1-max>k)m.set(s[l],m.get(s[l++])-1);best=Math.max(best,r-l+1);}console.log(best);`
    },
    {
        title: 'Max Consecutive Ones III',
        description: `Given a binary array and integer k, you may flip at most k zeroes to ones. Print the maximum length of a contiguous run of ones obtainable.\n\nInput\n- Line 1: integers n and k\n- Line 2: n space-separated 0 or 1 values\n\nOutput\nOne integer.`,
        testCases: [
            { input: '11 2\n1 1 1 0 0 0 1 1 1 1 0', expectedOutput: '6', isHidden: false },
            { input: '6 0\n1 1 0 1 1 1', expectedOutput: '3', isHidden: false },
            { input: '3 3\n0 0 0', expectedOutput: '3', isHidden: false },
            { input: '8 1\n0 1 1 0 1 0 1 1', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],k=t[1],a=t.slice(2);let l=0,z=0,best=0;for(let r=0;r<n;r++){z+=a[r]===0;while(z>k)z-=a[l++]===0;best=Math.max(best,r-l+1);}console.log(best);`
    },
    {
        title: 'Maximum Number of Vowels in a Substring of Given Length',
        description: `Given a lowercase string and k, print the largest number of vowels in any substring of exactly k characters. Vowels are a, e, i, o, and u.\n\nInput\n- Line 1: string\n- Line 2: integer k\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'abciiidef\n3', expectedOutput: '3', isHidden: false },
            { input: 'aeiou\n2', expectedOutput: '2', isHidden: false },
            { input: 'leetcode\n3', expectedOutput: '2', isHidden: false },
            { input: 'rhythms\n4', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const [s='',ks='0']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),k=Number(ks),v=new Set('aeiou');let count=0,best=0;for(let i=0;i<s.length;i++){count+=v.has(s[i]);if(i>=k)count-=v.has(s[i-k]);if(i>=k-1)best=Math.max(best,count);}console.log(best);`
    },
    {
        title: 'Permutation in String',
        description: `Given lowercase strings s1 and s2, print true if some substring of s2 is a permutation of s1; otherwise print false.\n\nInput\n- Line 1: string s1\n- Line 2: string s2\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'ab\neidbaooo', expectedOutput: 'true', isHidden: false },
            { input: 'ab\neidboaoo', expectedOutput: 'false', isHidden: false },
            { input: 'adc\ndcda', expectedOutput: 'true', isHidden: false },
            { input: 'hello\nolelhx', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const [a='',b='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),need=Array(26).fill(0),have=Array(26).fill(0);for(const c of a)need[c.charCodeAt(0)-97]++;for(let i=0;i<b.length;i++){have[b.charCodeAt(i)-97]++;if(i>=a.length)have[b.charCodeAt(i-a.length)-97]--;if(i>=a.length-1&&have.every((x,j)=>x===need[j])){console.log('true');process.exit();}}console.log('false');`
    },
    {
        title: 'Subarrays with K Different Integers',
        description: `Given an integer array and k, print how many contiguous subarrays contain exactly k distinct values.\n\nInput\n- Line 1: integers n and k\n- Line 2: n space-separated integers\n\nOutput\nOne integer.`,
        testCases: [
            { input: '5 2\n1 2 1 2 3', expectedOutput: '7', isHidden: false },
            { input: '5 3\n1 2 1 3 4', expectedOutput: '3', isHidden: false },
            { input: '3 1\n1 1 1', expectedOutput: '6', isHidden: false },
            { input: '4 2\n1 2 3 4', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],k=t[1],a=t.slice(2);function atMost(x){let m=new Map(),l=0,out=0;for(let r=0;r<n;r++){m.set(a[r],(m.get(a[r])||0)+1);while(m.size>x){m.set(a[l],m.get(a[l])-1);if(!m.get(a[l]))m.delete(a[l]);l++;}out+=r-l+1;}return out;}console.log(atMost(k)-atMost(k-1));`
    },
    {
        title: 'Valid Palindrome II',
        description: `Given a lowercase string, print true if it can become a palindrome after deleting at most one character; otherwise print false.\n\nInput\n- Line 1: string\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'aba', expectedOutput: 'true', isHidden: false },
            { input: 'abca', expectedOutput: 'true', isHidden: false },
            { input: 'abc', expectedOutput: 'false', isHidden: false },
            { input: 'deeee', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim();function pal(l,r){while(l<r)if(s[l++]!==s[r--])return false;return true;}let l=0,r=s.length-1;while(l<r&&s[l]===s[r])l++,r--;console.log(l>=r||pal(l+1,r)||pal(l,r-1)?'true':'false');`
    },
    {
        title: 'Partition Labels',
        description: `Partition a lowercase string into as many parts as possible so that each letter appears in at most one part. Print the length of every part.\n\nInput\n- Line 1: string\n\nOutput\nSpace-separated part lengths.`,
        testCases: [
            { input: 'ababcbacadefegdehijhklij', expectedOutput: '9 7 8', isHidden: false },
            { input: 'eccbbbbdec', expectedOutput: '10', isHidden: false },
            { input: 'a', expectedOutput: '1', isHidden: false },
            { input: 'caedbdedda', expectedOutput: '1 9', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),last={};for(let i=0;i<s.length;i++)last[s[i]]=i;let start=0,end=0,out=[];for(let i=0;i<s.length;i++){end=Math.max(end,last[s[i]]);if(i===end)out.push(i-start+1),start=i+1;}console.log(out.join(' '));`
    },
    {
        title: 'Reorganize String',
        description: `Rearrange a lowercase string so adjacent characters differ. At each position, choose the available character with the largest remaining frequency; break ties alphabetically. Print the resulting deterministic arrangement, or an empty line if no such arrangement exists.\n\nInput\n- Line 1: lowercase string\n\nOutput\nThe rearranged string or an empty line.`,
        testCases: [
            { input: 'aab', expectedOutput: 'aba', isHidden: false },
            { input: 'vvvlo', expectedOutput: 'vlvov', isHidden: false },
            { input: 'abc', expectedOutput: 'abc', isHidden: false },
            { input: 'aaabbc', expectedOutput: 'ababac', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),m=new Map();for(const c of s)m.set(c,(m.get(c)||0)+1);let out='',prev='';while(m.size){const choices=[...m.keys()].filter(c=>c!==prev).sort((a,b)=>m.get(b)-m.get(a)||a.localeCompare(b));if(!choices.length){out='';break;}const c=choices[0];out+=c;prev=c;m.set(c,m.get(c)-1);if(!m.get(c))m.delete(c);}console.log(out);`
    },
    {
        title: 'Sort Characters By Frequency',
        description: `Given a string, print its characters ordered by decreasing frequency. When frequencies tie, order characters alphabetically.\n\nInput\n- Line 1: string\n\nOutput\nThe sorted string.`,
        testCases: [
            { input: 'tree', expectedOutput: 'eert', isHidden: false },
            { input: 'cccaaa', expectedOutput: 'aaaccc', isHidden: false },
            { input: 'Aabb', expectedOutput: 'bbaA', isHidden: false },
            { input: 'programming', expectedOutput: 'ggmmrrainop', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),m=new Map();for(const c of s)m.set(c,(m.get(c)||0)+1);console.log([...m.keys()].sort((a,b)=>m.get(b)-m.get(a)||a.localeCompare(b)).map(c=>c.repeat(m.get(c))).join(''));`
    }
];
