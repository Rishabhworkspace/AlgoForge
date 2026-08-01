import type { TerminalProblem } from './terminalCatalog';

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalogRemainingTwo: TerminalProblem[] = [
    {
        title: 'Find K Pairs with Smallest Sums',
        description: `Given two nondecreasing integer arrays and k, print up to k pairs (one value from each array) with the smallest sums. Order pairs by sum, then first value, then second value, and print compact JSON.\n\nInput\n- Line 1: integers n, m, k\n- Line 2: n integers\n- Line 3: m integers\n\nOutput\nA compact JSON array of pairs.`,
        testCases: [
            { input: '3 3 3\n1 7 11\n2 4 6', expectedOutput: '[[1,2],[1,4],[1,6]]', isHidden: false },
            { input: '2 2 2\n1 1\n1 2', expectedOutput: '[[1,1],[1,1]]', isHidden: false },
            { input: '1 2 5\n1\n3 5', expectedOutput: '[[1,3],[1,5]]', isHidden: false },
            { input: '3 2 4\n-1 0 2\n-2 1', expectedOutput: '[[-1,-2],[0,-2],[-1,1],[2,-2]]', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),[n,m,k]=l[0].trim().split(/\\s+/).map(Number),a=l[1].trim().split(/\\s+/).map(Number),b=l[2].trim().split(/\\s+/).map(Number);console.log(JSON.stringify(a.flatMap(x=>b.map(y=>[x,y])).sort((p,q)=>p[0]+p[1]-q[0]-q[1]||p[0]-q[0]||p[1]-q[1]).slice(0,k)));`
    },
    {
        title: 'Longest Palindromic Subsequence',
        description: `Given a string, print the length of its longest subsequence that is a palindrome. Characters in a subsequence need not be adjacent.\n\nInput\n- Line 1: a lowercase string\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'bbbab', expectedOutput: '4', isHidden: false },
            { input: 'cbbd', expectedOutput: '2', isHidden: false },
            { input: 'a', expectedOutput: '1', isHidden: false },
            { input: 'agbdba', expectedOutput: '5', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),n=s.length,d=Array.from({length:n},()=>Array(n).fill(0));for(let i=n-1;i>=0;i--){d[i][i]=1;for(let j=i+1;j<n;j++)d[i][j]=s[i]===s[j]?d[i+1][j-1]+2:Math.max(d[i+1][j],d[i][j-1]);}console.log(d[0][n-1]);`
    },
    {
        title: 'Interleaving String',
        description: `Given strings s1, s2, and s3, print true if s3 can be formed by interleaving s1 and s2 while preserving the order of characters from each source string.\n\nInput\n- Line 1: s1\n- Line 2: s2\n- Line 3: s3\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'aabcc\ndbbca\naadbbcbcac', expectedOutput: 'true', isHidden: false },
            { input: 'aabcc\ndbbca\naadbbbaccc', expectedOutput: 'false', isHidden: false },
            { input: 'a\nb\nab', expectedOutput: 'true', isHidden: false },
            { input: 'abc\ndef\nadbecf', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const [a,b,c]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/);if(a.length+b.length!==c.length)console.log('false');else{const d=Array(b.length+1).fill(false);d[0]=true;for(let j=1;j<=b.length;j++)d[j]=d[j-1]&&b[j-1]===c[j-1];for(let i=1;i<=a.length;i++){d[0]=d[0]&&a[i-1]===c[i-1];for(let j=1;j<=b.length;j++)d[j]=(d[j]&&a[i-1]===c[i+j-1])||(d[j-1]&&b[j-1]===c[i+j-1]);}console.log(d[b.length]?'true':'false');}`
    },
    {
        title: 'Distinct Subsequences',
        description: `Given strings s and t, print the number of distinct subsequences of s that equal t.\n\nInput\n- Line 1: source string s\n- Line 2: target string t\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'rabbbit\nrabbit', expectedOutput: '3', isHidden: false },
            { input: 'babgbag\nbag', expectedOutput: '5', isHidden: false },
            { input: 'abc\nabc', expectedOutput: '1', isHidden: false },
            { input: 'aaaaa\naa', expectedOutput: '10', isHidden: true }
        ],
        referenceJavaScript: `const [s,t]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),d=Array(t.length+1).fill(0);d[0]=1;for(const x of s)for(let j=t.length;j;j--)if(x===t[j-1])d[j]+=d[j-1];console.log(d[t.length]);`
    },
    {
        title: 'Minimum ASCII Delete Sum for Two Strings',
        description: `Delete characters from two strings so the remaining strings are equal. Print the minimum possible sum of ASCII values of deleted characters.\n\nInput\n- Line 1: first lowercase string\n- Line 2: second lowercase string\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'sea\neat', expectedOutput: '231', isHidden: false },
            { input: 'delete\nleet', expectedOutput: '403', isHidden: false },
            { input: 'a\na', expectedOutput: '0', isHidden: false },
            { input: 'abc\ndef', expectedOutput: '597', isHidden: true }
        ],
        referenceJavaScript: `const [a,b]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),m=a.length,n=b.length,d=Array.from({length:m+1},()=>Array(n+1).fill(0));for(let i=m-1;i>=0;i--)d[i][n]=d[i+1][n]+a.charCodeAt(i);for(let j=n-1;j>=0;j--)d[m][j]=d[m][j+1]+b.charCodeAt(j);for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)d[i][j]=a[i]===b[j]?d[i+1][j+1]:Math.min(a.charCodeAt(i)+d[i+1][j],b.charCodeAt(j)+d[i][j+1]);console.log(d[0][0]);`
    },
    {
        title: 'Burst Balloons',
        description: `A balloon i gives nums[left] * nums[i] * nums[right] coins when burst, where missing neighbors have value 1. Print the maximum coins obtainable by bursting every balloon.\n\nInput\n- Line 1: integer n\n- Line 2: n positive integers\n\nOutput\nOne integer.`,
        testCases: [
            { input: arrayInput([3, 1, 5, 8]), expectedOutput: '167', isHidden: false },
            { input: arrayInput([1, 5]), expectedOutput: '10', isHidden: false },
            { input: arrayInput([7]), expectedOutput: '7', isHidden: false },
            { input: arrayInput([1, 2, 3]), expectedOutput: '12', isHidden: true }
        ],
        referenceJavaScript: `const a=[1,...require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),1],n=a.length,d=Array.from({length:n},()=>Array(n).fill(0));for(let len=2;len<n;len++)for(let l=0;l+len<n;l++){const r=l+len;for(let k=l+1;k<r;k++)d[l][r]=Math.max(d[l][r],a[l]*a[k]*a[r]+d[l][k]+d[k][r]);}console.log(d[0][n-1]);`
    },
    {
        title: 'Dungeon Game',
        description: `A knight starts at the top-left of a dungeon and must reach the bottom-right, moving only right or down. Cell values change health. Print the minimum initial health needed to never drop to zero or below.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: columns space-separated integers\n\nOutput\nOne integer.`,
        testCases: [
            { input: '3 3\n-2 -3 3\n-5 -10 1\n10 30 -5', expectedOutput: '7', isHidden: false },
            { input: '1 1\n0', expectedOutput: '1', isHidden: false },
            { input: '1 1\n100', expectedOutput: '1', isHidden: false },
            { input: '2 2\n-1 -2\n-3 -4', expectedOutput: '8', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),[m,n]=l[0].trim().split(/\\s+/).map(Number),a=l.slice(1).map(x=>x.trim().split(/\\s+/).map(Number)),d=Array.from({length:m+1},()=>Array(n+1).fill(Infinity));d[m][n-1]=d[m-1][n]=1;for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)d[i][j]=Math.max(1,Math.min(d[i+1][j],d[i][j+1])-a[i][j]);console.log(d[0][0]);`
    },
    {
        title: 'Edit Distance',
        description: `Given two lowercase strings, print the minimum number of insertions, deletions, and replacements needed to transform the first string into the second.\n\nInput\n- Line 1: first string\n- Line 2: second string\n\nOutput\nOne integer.`,
        testCases: [
            { input: 'horse\nros', expectedOutput: '3', isHidden: false },
            { input: 'intention\nexecution', expectedOutput: '5', isHidden: false },
            { input: 'abc\nabc', expectedOutput: '0', isHidden: false },
            { input: 'kitten\nsitting', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const [a,b]=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/),d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:1+Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1]);console.log(d[a.length][b.length]);`
    },
    {
        title: 'Add Two Numbers',
        description: `Two non-empty linked lists represent nonnegative integers in reverse digit order. Add the numbers and print the resulting linked list in reverse digit order.\n\nInput\n- Line 1: lengths n and m\n- Line 2: n digits of the first list\n- Line 3: m digits of the second list\n\nOutput\nDigits of the sum separated by spaces.`,
        testCases: [
            { input: '3 3\n2 4 3\n5 6 4', expectedOutput: '7 0 8', isHidden: false },
            { input: '1 1\n0\n0', expectedOutput: '0', isHidden: false },
            { input: '7 4\n9 9 9 9 9 9 9\n9 9 9 9', expectedOutput: '8 9 9 9 0 0 0 1', isHidden: false },
            { input: '2 1\n5 9\n5', expectedOutput: '0 0 1', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),[n,m]=l[0].split(/\\s+/).map(Number),a=l[1].split(/\\s+/).map(Number),b=l[2].split(/\\s+/).map(Number),out=[];let i=0,j=0,c=0;while(i<n||j<m||c){const s=(a[i++]||0)+(b[j++]||0)+c;out.push(s%10);c=Math.floor(s/10);}console.log(out.join(' '));`
    },
    {
        title: 'Copy List with Random Pointer',
        description: `A linked list node has a value and a random pointer to a node index or null. Make a deep copy. The input gives values and random indices (-1 means null); print the copied list in the same format.\n\nInput\n- Line 1: integer n\n- Line 2: n values\n- Line 3: n random indices, each -1 or 0 through n-1\n\nOutput\nLine 1 copied values; line 2 copied random indices.`,
        testCases: [
            { input: '5\n7 13 11 10 1\n-1 0 4 2 0', expectedOutput: '7 13 11 10 1\n-1 0 4 2 0', isHidden: false },
            { input: '1\n1\n-1', expectedOutput: '1\n-1', isHidden: false },
            { input: '2\n1 2\n1 1', expectedOutput: '1 2\n1 1', isHidden: false },
            { input: '3\n4 5 6\n2 -1 0', expectedOutput: '4 5 6\n2 -1 0', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),a=l[1].trim().split(/\\s+/),r=l[2].trim().split(/\\s+/);console.log(a.join(' ')+'\\n'+r.join(' '));`
    },
    {
        title: 'Insertion Sort List',
        description: `Given the values of a singly linked list, sort the list in ascending order using insertion sort and print its values.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n\nOutput\nSorted values separated by spaces.`,
        testCases: [
            { input: arrayInput([4, 2, 1, 3]), expectedOutput: '1 2 3 4', isHidden: false },
            { input: arrayInput([-1, 5, 3, 4, 0]), expectedOutput: '-1 0 3 4 5', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([3, 3, 1, 2]), expectedOutput: '1 2 3 3', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),out=[];for(const x of a){let i=0;while(i<out.length&&out[i]<=x)i++;out.splice(i,0,x);}console.log(out.join(' '));`
    },
    {
        title: 'Intersection of Two Linked Lists',
        description: `Two singly linked lists may share a common tail. Print the value at their first shared node, or null when they do not intersect.\n\nInput\n- Line 1: prefix lengths a and b, then common-tail length c\n- Line 2: a values unique to list A\n- Line 3: b values unique to list B\n- Line 4: c values shared by both lists\n\nOutput\nThe intersection value or null.`,
        testCases: [
            { input: '2 3 2\n4 1\n5 6 1\n8 4', expectedOutput: '8', isHidden: false },
            { input: '1 1 0\n2\n3\n', expectedOutput: 'null', isHidden: false },
            { input: '0 0 1\n\n\n7', expectedOutput: '7', isHidden: false },
            { input: '2 1 3\n1 2\n9\n3 4 5', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').split(/\\n/),c=Number(l[0].trim().split(/\\s+/)[2]),tail=(l[3]||'').trim().split(/\\s+/).filter(Boolean);console.log(c?tail[0]:'null');`
    },
    {
        title: 'Linked List Cycle',
        description: `A singly linked list's tail optionally points to an earlier node. Given its values and the tail target index pos (-1 means null), print true if a cycle exists.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n- Line 3: pos\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '4\n3 2 0 -4\n1', expectedOutput: 'true', isHidden: false },
            { input: '2\n1 2\n0', expectedOutput: 'true', isHidden: false },
            { input: '1\n1\n-1', expectedOutput: 'false', isHidden: false },
            { input: '5\n1 2 3 4 5\n-1', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/);console.log(Number(l[2])>=0?'true':'false');`
    },
    {
        title: 'Linked List Cycle II',
        description: `A singly linked list's tail optionally points to an earlier node. Given its values and the tail target index pos (-1 means null), print the value where the cycle begins, or null.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n- Line 3: pos\n\nOutput\nCycle-start value or null.`,
        testCases: [
            { input: '4\n3 2 0 -4\n1', expectedOutput: '2', isHidden: false },
            { input: '2\n1 2\n0', expectedOutput: '1', isHidden: false },
            { input: '1\n1\n-1', expectedOutput: 'null', isHidden: false },
            { input: '5\n10 20 30 40 50\n3', expectedOutput: '40', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),a=l[1].trim().split(/\\s+/),p=Number(l[2]);console.log(p<0?'null':a[p]);`
    },
    {
        title: 'Merge k Sorted Lists',
        description: `Merge k sorted linked lists into one sorted list.\n\nInput\n- Line 1: integer k\n- Next k lines: a length followed by that many sorted values\n\nOutput\nMerged values separated by spaces.`,
        testCases: [
            { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', expectedOutput: '1 1 2 3 4 4 5 6', isHidden: false },
            { input: '1\n1 0', expectedOutput: '0', isHidden: false },
            { input: '2\n0\n2 1 2', expectedOutput: '1 2', isHidden: false },
            { input: '3\n2 -3 5\n3 -2 0 7\n1 1', expectedOutput: '-3 -2 0 1 5 7', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),k=Number(l[0]),out=[];for(let i=1;i<=k;i++)out.push(...l[i].trim().split(/\\s+/).map(Number).slice(1));console.log(out.sort((a,b)=>a-b).join(' '));`
    },
    {
        title: 'Merge Two Sorted Lists',
        description: `Merge two nondecreasing singly linked lists and print the values of the resulting nondecreasing list.\n\nInput\n- Line 1: lengths n and m\n- Line 2: n sorted values\n- Line 3: m sorted values\n\nOutput\nMerged values separated by spaces.`,
        testCases: [
            { input: '3 3\n1 2 4\n1 3 4', expectedOutput: '1 1 2 3 4 4', isHidden: false },
            { input: '0 0\n\n', expectedOutput: '', isHidden: false },
            { input: '0 1\n\n0', expectedOutput: '0', isHidden: false },
            { input: '2 3\n-2 5\n-3 0 6', expectedOutput: '-3 -2 0 5 6', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').split(/\\n/),[n,m]=l[0].trim().split(/\\s+/).map(Number),a=(l[1]||'').trim().split(/\\s+/).filter(Boolean).map(Number),b=(l[2]||'').trim().split(/\\s+/).filter(Boolean).map(Number);console.log([...a,...b].sort((x,y)=>x-y).join(' '));`
    },
    {
        title: 'Partition List',
        description: `Reorder a linked list so nodes with values less than x come before nodes with values at least x, preserving the original order inside both groups.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n- Line 3: pivot x\n\nOutput\nReordered values separated by spaces.`,
        testCases: [
            { input: '6\n1 4 3 2 5 2\n3', expectedOutput: '1 2 2 4 3 5', isHidden: false },
            { input: '2\n2 1\n2', expectedOutput: '1 2', isHidden: false },
            { input: '1\n1\n0', expectedOutput: '1', isHidden: false },
            { input: '5\n3 1 2 3 0\n3', expectedOutput: '1 2 0 3 3', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),a=l[1].trim().split(/\\s+/).map(Number),x=Number(l[2]);console.log([...a.filter(v=>v<x),...a.filter(v=>v>=x)].join(' '));`
    },
    {
        title: 'Remove Nth Node From End of List',
        description: `Remove the nth node from the end of a singly linked list and print the remaining values.\n\nInput\n- Line 1: integer list length\n- Line 2: list values\n- Line 3: n, the one-indexed position from the end\n\nOutput\nRemaining values separated by spaces.`,
        testCases: [
            { input: '5\n1 2 3 4 5\n2', expectedOutput: '1 2 3 5', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '', isHidden: false },
            { input: '2\n1 2\n1', expectedOutput: '1', isHidden: false },
            { input: '4\n10 20 30 40\n4', expectedOutput: '20 30 40', isHidden: true }
        ],
        referenceJavaScript: `const l=require('fs').readFileSync(0,'utf8').trim().split(/\\n/),a=l[1].trim().split(/\\s+/),n=Number(l[2]);a.splice(a.length-n,1);console.log(a.join(' '));`
    },
    {
        title: 'Reorder List',
        description: `Given a singly linked list L0 → L1 → … → Ln, reorder it as L0 → Ln → L1 → Ln-1 → … and print its values.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n\nOutput\nReordered values separated by spaces.`,
        testCases: [
            { input: arrayInput([1, 2, 3, 4]), expectedOutput: '1 4 2 3', isHidden: false },
            { input: arrayInput([1, 2, 3, 4, 5]), expectedOutput: '1 5 2 4 3', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([10, 20, 30]), expectedOutput: '10 30 20', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),out=[];let l=0,r=a.length-1;while(l<=r){out.push(a[l++]);if(l<=r)out.push(a[r--]);}console.log(out.join(' '));`
    },
    {
        title: 'Reverse Linked List',
        description: `Reverse a singly linked list and print the values from its new head to tail.\n\nInput\n- Line 1: integer n\n- Line 2: n list values\n\nOutput\nReversed values separated by spaces.`,
        testCases: [
            { input: arrayInput([1, 2, 3, 4, 5]), expectedOutput: '5 4 3 2 1', isHidden: false },
            { input: arrayInput([1, 2]), expectedOutput: '2 1', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([-1, 0, 1]), expectedOutput: '1 0 -1', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1);console.log(a.reverse().join(' '));`
    }
];
