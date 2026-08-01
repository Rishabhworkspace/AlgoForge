import { terminalCatalogBatch2 } from './terminalCatalogBatch2';
import { terminalCatalogDpBatch } from './terminalCatalogDpBatch';
import { terminalCatalogGraphBatch } from './terminalCatalogGraphBatch';
import { terminalCatalogInterviewBatch } from './terminalCatalogInterviewBatch';
import { terminalCatalogStringBatch } from './terminalCatalogStringBatch';
import { terminalCatalogArrayBatch } from './terminalCatalogArrayBatch';
import { terminalCatalogTreeBatch } from './terminalCatalogTreeBatch';
import { terminalCatalogRemainingOne } from './terminalCatalogRemainingOne';
import { terminalCatalogRemainingThree } from './terminalCatalogRemainingThree';
import { terminalCatalogRemainingTwo } from './terminalCatalogRemainingTwo';
import { terminalCatalogFinalAlgorithms } from './terminalCatalogFinalAlgorithms';

export type TerminalTestCase = {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
};

export type TerminalProblem = {
    title: string;
    description: string;
    testCases: TerminalTestCase[];
    referenceJavaScript: string;
};

const arrayInput = (values: number[]) => `${values.length}\n${values.join(' ')}`;

export const terminalCatalog: TerminalProblem[] = [
    {
        title: 'Two Sum',
        description: `Given an integer array and a target value, print the zero-based indices of two different elements whose sum equals the target. Print the smaller index first. Exactly one answer exists.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: target integer\n\nOutput\nTwo space-separated indices.`,
        testCases: [
            { input: '4\n2 7 11 15\n9', expectedOutput: '0 1', isHidden: false },
            { input: '3\n3 2 4\n6', expectedOutput: '1 2', isHidden: false },
            { input: '2\n3 3\n6', expectedOutput: '0 1', isHidden: false },
            { input: '5\n-1 0 1 2 -2\n0', expectedOutput: '0 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number); const n=t[0], a=t.slice(1,n+1), target=t[n+1], seen=new Map(); for(let i=0;i<n;i++){const j=seen.get(target-a[i]); if(j!==undefined){console.log(j+' '+i); break;} seen.set(a[i],i);}`
    },
    {
        title: 'Best Time to Buy and Sell Stock',
        description: `You may buy one stock on one day and sell it on a later day. Given daily prices, print the maximum profit. Print 0 when no profitable sale is possible.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated prices\n\nOutput\nOne integer: the maximum profit.`,
        testCases: [
            { input: arrayInput([7, 1, 5, 3, 6, 4]), expectedOutput: '5', isHidden: false },
            { input: arrayInput([7, 6, 4, 3, 1]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([2, 4, 1]), expectedOutput: '2', isHidden: false },
            { input: arrayInput([1, 2, 3, 4, 5]), expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number), a=t.slice(1); let low=Infinity,best=0; for(const p of a){low=Math.min(low,p); best=Math.max(best,p-low);} console.log(best);`
    },
    {
        title: 'Contains Duplicate',
        description: `Given an integer array, print true if any value occurs at least twice; otherwise print false.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: arrayInput([1, 2, 3, 1]), expectedOutput: 'true', isHidden: false },
            { input: arrayInput([1, 2, 3, 4]), expectedOutput: 'false', isHidden: false },
            { input: arrayInput([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), expectedOutput: 'true', isHidden: false },
            { input: arrayInput([0]), expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1); console.log(new Set(a).size===a.length?'false':'true');`
    },
    {
        title: 'Product of Array Except Self',
        description: `Given an integer array, print an array where each position contains the product of every input element except the element at that position. Do not use division.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nn space-separated integers.`,
        testCases: [
            { input: arrayInput([1, 2, 3, 4]), expectedOutput: '24 12 8 6', isHidden: false },
            { input: arrayInput([-1, 1, 0, -3, 3]), expectedOutput: '0 0 9 0 0', isHidden: false },
            { input: arrayInput([2, 3]), expectedOutput: '3 2', isHidden: false },
            { input: arrayInput([0, 0, 5]), expectedOutput: '0 0 0', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number), a=t.slice(1), out=Array(a.length).fill(1); let p=1; for(let i=0;i<a.length;i++){out[i]=p;p*=a[i];} p=1; for(let i=a.length-1;i>=0;i--){out[i]*=p;p*=a[i];} console.log(out.join(' '));`
    },
    {
        title: 'Maximum Subarray',
        description: `Given an integer array, print the largest possible sum of a non-empty contiguous subarray.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the maximum subarray sum.`,
        testCases: [
            { input: arrayInput([-2, 1, -3, 4, -1, 2, 1, -5, 4]), expectedOutput: '6', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([5, 4, -1, 7, 8]), expectedOutput: '23', isHidden: false },
            { input: arrayInput([-3, -2, -5]), expectedOutput: '-2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1); let best=a[0], sum=a[0]; for(let i=1;i<a.length;i++){sum=Math.max(a[i],sum+a[i]);best=Math.max(best,sum);} console.log(best);`
    },
    {
        title: 'Find Minimum in Rotated Sorted Array',
        description: `A strictly increasing array was rotated between zero and n-1 times. Given the resulting array, print its minimum element.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the minimum value.`,
        testCases: [
            { input: arrayInput([3, 4, 5, 1, 2]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([4, 5, 6, 7, 0, 1, 2]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([11, 13, 15, 17]), expectedOutput: '11', isHidden: false },
            { input: arrayInput([2, 1]), expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1); let l=0,r=a.length-1; while(l<r){const m=Math.floor((l+r)/2); if(a[m]>a[r])l=m+1;else r=m;} console.log(a[l]);`
    },
    {
        title: 'Search in Rotated Sorted Array',
        description: `A sorted array of distinct integers was rotated. Given the array and a target, print its zero-based index, or -1 if it is absent.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: target integer\n\nOutput\nOne integer: the target index or -1.`,
        testCases: [
            { input: '7\n4 5 6 7 0 1 2\n0', expectedOutput: '4', isHidden: false },
            { input: '7\n4 5 6 7 0 1 2\n3', expectedOutput: '-1', isHidden: false },
            { input: '1\n1\n0', expectedOutput: '-1', isHidden: false },
            { input: '6\n6 7 8 1 2 3\n7', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number), n=t[0], a=t.slice(1,n+1), x=t[n+1]; let l=0,r=n-1,ans=-1; while(l<=r){const m=Math.floor((l+r)/2); if(a[m]===x){ans=m;break;} if(a[l]<=a[m]){if(a[l]<=x&&x<a[m])r=m-1;else l=m+1;}else{if(a[m]<x&&x<=a[r])l=m+1;else r=m-1;}} console.log(ans);`
    },
    {
        title: 'Container With Most Water',
        description: `Each integer is the height of a vertical line at its array index. Choose two lines that hold the most water and print that maximum area.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated heights\n\nOutput\nOne integer: the largest area.`,
        testCases: [
            { input: arrayInput([1, 8, 6, 2, 5, 4, 8, 3, 7]), expectedOutput: '49', isHidden: false },
            { input: arrayInput([1, 1]), expectedOutput: '1', isHidden: false },
            { input: arrayInput([4, 3, 2, 1, 4]), expectedOutput: '16', isHidden: false },
            { input: arrayInput([1, 2, 1]), expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1); let l=0,r=a.length-1,best=0; while(l<r){best=Math.max(best,(r-l)*Math.min(a[l],a[r])); if(a[l]<a[r])l++;else r--;} console.log(best);`
    },
    {
        title: 'Missing Number',
        description: `The input contains n distinct integers from the range 0 through n with exactly one value missing. Print the missing value.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nOne integer: the missing value.`,
        testCases: [
            { input: arrayInput([3, 0, 1]), expectedOutput: '2', isHidden: false },
            { input: arrayInput([0, 1]), expectedOutput: '2', isHidden: false },
            { input: arrayInput([9, 6, 4, 2, 3, 5, 7, 0, 1]), expectedOutput: '8', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number), n=t[0], a=t.slice(1); let sum=n*(n+1)/2; for(const x of a)sum-=x; console.log(sum);`
    },
    {
        title: 'Valid Anagram',
        description: `Given two lowercase strings, print true if one is an anagram of the other; otherwise print false.\n\nInput\n- Line 1: first string\n- Line 2: second string\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'anagram\nnagaram', expectedOutput: 'true', isHidden: false },
            { input: 'rat\ncar', expectedOutput: 'false', isHidden: false },
            { input: 'a\na', expectedOutput: 'true', isHidden: false },
            { input: 'listen\nsilent', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const [a='',b='']=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/); console.log(a.length===b.length&&[...a].sort().join('')===[...b].sort().join('')?'true':'false');`
    },
    {
        title: 'Valid Parentheses',
        description: `Given a string containing only (), [], and {}, print true when every opening bracket is closed by the same kind of bracket in the correct order. Otherwise print false.\n\nInput\n- Line 1: bracket string\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '()', expectedOutput: 'true', isHidden: false },
            { input: '()[]{}', expectedOutput: 'true', isHidden: false },
            { input: '(]', expectedOutput: 'false', isHidden: false },
            { input: '([)]', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(), pairs={')':'(',']':'[','}':'{'}, stack=[]; for(const c of s){if('([{'.includes(c))stack.push(c);else if(stack.pop()!==pairs[c]){console.log('false');process.exit();}} console.log(stack.length?'false':'true');`
    },
    {
        title: 'Binary Search',
        description: `Given a sorted array of integers and a target, print the target's zero-based index or -1 if it is absent.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers in nondecreasing order\n- Line 3: target integer\n\nOutput\nOne integer: the index or -1.`,
        testCases: [
            { input: '6\n-1 0 3 5 9 12\n9', expectedOutput: '4', isHidden: false },
            { input: '6\n-1 0 3 5 9 12\n2', expectedOutput: '-1', isHidden: false },
            { input: '1\n5\n5', expectedOutput: '0', isHidden: false },
            { input: '5\n1 3 5 7 9\n1', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),x=t[n+1];let l=0,r=n-1,ans=-1;while(l<=r){const m=(l+r)>>1;if(a[m]===x){ans=m;break;}if(a[m]<x)l=m+1;else r=m-1;}console.log(ans);`
    },
    {
        title: 'Search Insert Position',
        description: `Given a sorted array of distinct integers and a target, print the index where the target appears or would be inserted to keep the array sorted.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n- Line 3: target integer\n\nOutput\nOne integer: the insertion index.`,
        testCases: [
            { input: '4\n1 3 5 6\n5', expectedOutput: '2', isHidden: false },
            { input: '4\n1 3 5 6\n2', expectedOutput: '1', isHidden: false },
            { input: '4\n1 3 5 6\n7', expectedOutput: '4', isHidden: false },
            { input: '4\n1 3 5 6\n0', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),x=t[n+1];let l=0,r=n;while(l<r){const m=(l+r)>>1;if(a[m]<x)l=m+1;else r=m;}console.log(l);`
    },
    {
        title: 'Valid Palindrome',
        description: `Given a string, ignore non-alphanumeric characters and letter case. Print true if the resulting sequence reads the same forward and backward; otherwise print false.\n\nInput\n- Line 1: a string\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', isHidden: false },
            { input: 'race a car', expectedOutput: 'false', isHidden: false },
            { input: ' ', expectedOutput: 'true', isHidden: false },
            { input: '0P', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').toLowerCase().replace(/[^a-z0-9]/g,'');let l=0,r=s.length-1,ok=true;while(l<r)if(s[l++]!==s[r--]){ok=false;break;}console.log(ok?'true':'false');`
    },
    {
        title: 'Remove Duplicates from Sorted Array',
        description: `Given a sorted integer array, remove duplicates in place conceptually. Print the number of unique values on the first line and those unique values, in order, on the second line.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated sorted integers\n\nOutput\n- Line 1: integer k\n- Line 2: k space-separated unique values.`,
        testCases: [
            { input: arrayInput([1, 1, 2]), expectedOutput: '2\n1 2', isHidden: false },
            { input: arrayInput([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), expectedOutput: '5\n0 1 2 3 4', isHidden: false },
            { input: arrayInput([1]), expectedOutput: '1\n1', isHidden: false },
            { input: arrayInput([-1, -1, 0, 0, 2]), expectedOutput: '3\n-1 0 2', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),out=[];for(const x of a)if(!out.length||out[out.length-1]!==x)out.push(x);console.log(out.length+'\\n'+out.join(' '));`
    },
    {
        title: 'Move Zeroes',
        description: `Given an integer array, move every zero to the end while preserving the relative order of nonzero values. Print the resulting array.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nn space-separated integers.`,
        testCases: [
            { input: arrayInput([0, 1, 0, 3, 12]), expectedOutput: '1 3 12 0 0', isHidden: false },
            { input: arrayInput([0]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([1, 2, 3]), expectedOutput: '1 2 3', isHidden: false },
            { input: arrayInput([0, 0, 1]), expectedOutput: '1 0 0', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),out=a.filter(x=>x!==0);while(out.length<a.length)out.push(0);console.log(out.join(' '));`
    },
    {
        title: 'Squares of a Sorted Array',
        description: `Given a nondecreasing array of integers, square every value and print the squares in nondecreasing order.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated integers\n\nOutput\nn space-separated integers.`,
        testCases: [
            { input: arrayInput([-4, -1, 0, 3, 10]), expectedOutput: '0 1 9 16 100', isHidden: false },
            { input: arrayInput([-7, -3, 2, 3, 11]), expectedOutput: '4 9 9 49 121', isHidden: false },
            { input: arrayInput([0]), expectedOutput: '0', isHidden: false },
            { input: arrayInput([-2, -1]), expectedOutput: '1 4', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);console.log(a.map(x=>x*x).sort((x,y)=>x-y).join(' '));`
    },
    {
        title: 'Longest Substring Without Repeating Characters',
        description: `Given a string, print the length of its longest contiguous substring that contains no repeated character.\n\nInput\n- Line 1: a string\n\nOutput\nOne integer: the maximum length.`,
        testCases: [
            { input: 'abcabcbb', expectedOutput: '3', isHidden: false },
            { input: 'bbbbb', expectedOutput: '1', isHidden: false },
            { input: 'pwwkew', expectedOutput: '3', isHidden: false },
            { input: '', expectedOutput: '0', isHidden: true }
        ],
        referenceJavaScript: `const s=require('fs').readFileSync(0,'utf8').trim(),seen=new Map();let l=0,best=0;for(let r=0;r<s.length;r++){if(seen.has(s[r]))l=Math.max(l,seen.get(s[r])+1);seen.set(s[r],r);best=Math.max(best,r-l+1);}console.log(best);`
    },
    {
        title: 'Climbing Stairs',
        description: `You can climb either one or two steps at a time. Given n steps, print the number of distinct ways to reach the top.\n\nInput\n- Line 1: integer n\n\nOutput\nOne integer: the number of ways.`,
        testCases: [
            { input: '2', expectedOutput: '2', isHidden: false },
            { input: '3', expectedOutput: '3', isHidden: false },
            { input: '5', expectedOutput: '8', isHidden: false },
            { input: '1', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim());let a=1,b=1;for(let i=2;i<=n;i++){[a,b]=[b,a+b];}console.log(b);`
    },
    {
        title: 'Coin Change',
        description: `Given coin denominations and an amount, print the fewest coins needed to make exactly that amount. Print -1 when it is impossible.\n\nInput\n- Line 1: integer n\n- Line 2: n space-separated positive coin values\n- Line 3: target amount\n\nOutput\nOne integer: the minimum number of coins or -1.`,
        testCases: [
            { input: '3\n1 2 5\n11', expectedOutput: '3', isHidden: false },
            { input: '1\n2\n3', expectedOutput: '-1', isHidden: false },
            { input: '1\n1\n0', expectedOutput: '0', isHidden: false },
            { input: '3\n2 5 10\n27', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],coins=t.slice(1,n+1),amount=t[n+1],dp=Array(amount+1).fill(Infinity);dp[0]=0;for(let x=1;x<=amount;x++)for(const c of coins)if(c<=x)dp[x]=Math.min(dp[x],dp[x-c]+1);console.log(dp[amount]===Infinity?-1:dp[amount]);`
    }
];

const rawTerminalCatalog = [...terminalCatalog, ...terminalCatalogBatch2, ...terminalCatalogDpBatch, ...terminalCatalogGraphBatch, ...terminalCatalogInterviewBatch, ...terminalCatalogStringBatch, ...terminalCatalogArrayBatch, ...terminalCatalogTreeBatch, ...terminalCatalogRemainingOne, ...terminalCatalogRemainingThree, ...terminalCatalogRemainingTwo, ...terminalCatalogFinalAlgorithms];
const seenTerminalTitles = new Set<string>();
export const allTerminalCatalog = rawTerminalCatalog.filter(problem => {
    if (seenTerminalTitles.has(problem.title)) return false;
    seenTerminalTitles.add(problem.title);
    return true;
});
export const terminalCatalogByTitle = new Map(allTerminalCatalog.map(problem => [problem.title, problem]));
