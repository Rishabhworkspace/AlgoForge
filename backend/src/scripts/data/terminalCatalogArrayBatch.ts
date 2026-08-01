import type { TerminalProblem } from './terminalCatalog';

export const terminalCatalogArrayBatch: TerminalProblem[] = [
    {
        title: 'H-Index',
        description: `A researcher has n papers. Given their citation counts, print the largest h such that at least h papers have at least h citations.\n\nInput\n- Line 1: integer n\n- Line 2: n nonnegative citation counts\n\nOutput\nOne integer: the h-index.`,
        testCases: [
            { input: '5\n3 0 6 1 5', expectedOutput: '3', isHidden: false },
            { input: '1\n1', expectedOutput: '1', isHidden: false },
            { input: '3\n0 0 0', expectedOutput: '0', isHidden: false },
            { input: '6\n10 8 5 4 3 3', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1).sort((x,y)=>y-x);let h=0;while(h<a.length&&a[h]>=h+1)h++;console.log(h);`
    },
    {
        title: 'Maximum Gap',
        description: `Given an unsorted array of nonnegative integers, sort it conceptually and print the largest difference between adjacent values in that sorted order. Print 0 when fewer than two values are given.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n\nOutput\nOne integer: the maximum adjacent gap.`,
        testCases: [
            { input: '4\n3 6 9 1', expectedOutput: '3', isHidden: false },
            { input: '1\n10', expectedOutput: '0', isHidden: false },
            { input: '5\n10 3 1 20 15', expectedOutput: '7', isHidden: false },
            { input: '4\n1 100 1000 10000', expectedOutput: '9000', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1).sort((x,y)=>x-y);let best=0;for(let i=1;i<a.length;i++)best=Math.max(best,a[i]-a[i-1]);console.log(best);`
    },
    {
        title: 'Largest Number',
        description: `Arrange the given nonnegative integers so that their concatenation is as large as possible. Print that concatenated number. If every value is zero, print a single 0.\n\nInput\n- Line 1: integer n\n- Line 2: n nonnegative integers\n\nOutput\nThe largest possible concatenated number.`,
        testCases: [
            { input: '2\n10 2', expectedOutput: '210', isHidden: false },
            { input: '5\n3 30 34 5 9', expectedOutput: '9534330', isHidden: false },
            { input: '2\n0 0', expectedOutput: '0', isHidden: false },
            { input: '4\n12 121 9 90', expectedOutput: '99012121', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).slice(1).sort((x,y)=>(y+x).localeCompare(x+y));const out=a.join('');console.log(out[0]==='0'?'0':out);`
    },
    {
        title: 'Global and Local Inversions',
        description: `The input is a permutation of 0 through n-1. A local inversion uses adjacent positions; a global inversion uses any earlier and later positions. Print true if every global inversion is also local, otherwise print false.\n\nInput\n- Line 1: integer n\n- Line 2: the permutation\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '3\n1 0 2', expectedOutput: 'true', isHidden: false },
            { input: '3\n1 2 0', expectedOutput: 'false', isHidden: false },
            { input: '1\n0', expectedOutput: 'true', isHidden: false },
            { input: '5\n0 1 2 4 3', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let min=a[a.length-1],ok=true;for(let i=a.length-3;i>=0;i--){if(a[i]>min){ok=false;break;}min=Math.min(min,a[i+1]);}console.log(ok?'true':'false');`
    },
    {
        title: 'Search a 2D Matrix',
        description: `Rows of the matrix are sorted left to right, and the first value of each row is greater than the last value of the previous row. Print true if target occurs, otherwise false.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: matrix values\n- Final line: target\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3', expectedOutput: 'true', isHidden: false },
            { input: '3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n13', expectedOutput: 'false', isHidden: false },
            { input: '1 1\n5\n5', expectedOutput: 'true', isHidden: false },
            { input: '2 3\n1 2 3\n8 9 10\n8', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],x=t[2+r*c];let l=0,h=r*c-1,ok=false;while(l<=h){const m=(l+h)>>1,v=t[2+m];if(v===x){ok=true;break;}if(v<x)l=m+1;else h=m-1;}console.log(ok?'true':'false');`
    },
    {
        title: 'Search a 2D Matrix II',
        description: `Every row and every column of the matrix is sorted in nondecreasing order. Print true if target occurs, otherwise false.\n\nInput\n- Line 1: integers rows and columns\n- Next rows lines: matrix values\n- Final line: target\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n5', expectedOutput: 'true', isHidden: false },
            { input: '5 5\n1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n20', expectedOutput: 'false', isHidden: false },
            { input: '1 3\n1 2 3\n2', expectedOutput: 'true', isHidden: false },
            { input: '2 2\n-5 -3\n-2 0\n-4', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),r=t[0],c=t[1],x=t[2+r*c];let i=0,j=c-1,ok=false;while(i<r&&j>=0){const v=t[2+i*c+j];if(v===x){ok=true;break;}if(v>x)j--;else i++;}console.log(ok?'true':'false');`
    },
    {
        title: 'Koko Eating Bananas',
        description: `Koko chooses one integer eating speed k. In each hour she eats up to k bananas from one pile. Given pile sizes and h hours, print the smallest k that lets her finish in time.\n\nInput\n- Line 1: integer n\n- Line 2: n pile sizes\n- Line 3: integer h\n\nOutput\nOne integer: the minimum speed.`,
        testCases: [
            { input: '4\n3 6 7 11\n8', expectedOutput: '4', isHidden: false },
            { input: '5\n30 11 23 4 20\n5', expectedOutput: '30', isHidden: false },
            { input: '5\n30 11 23 4 20\n6', expectedOutput: '23', isHidden: false },
            { input: '1\n312884470\n968709470', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),h=t[n+1];let l=1,r=Math.max(...a);while(l<r){const m=(l+r)>>1;if(a.reduce((s,x)=>s+Math.ceil(x/m),0)<=h)r=m;else l=m+1;}console.log(l);`
    },
    {
        title: 'Capacity To Ship Packages Within D Days',
        description: `Packages must be shipped in their listed order. Given their weights and a number of days, print the smallest ship capacity that delivers every package within that many days.\n\nInput\n- Line 1: integer n\n- Line 2: n package weights\n- Line 3: integer days\n\nOutput\nOne integer: the minimum capacity.`,
        testCases: [
            { input: '10\n1 2 3 4 5 6 7 8 9 10\n5', expectedOutput: '15', isHidden: false },
            { input: '6\n3 2 2 4 1 4\n3', expectedOutput: '6', isHidden: false },
            { input: '5\n1 2 3 1 1\n4', expectedOutput: '3', isHidden: false },
            { input: '3\n10 50 50\n1', expectedOutput: '110', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),d=t[n+1];let l=Math.max(...a),r=a.reduce((s,x)=>s+x,0);while(l<r){const m=(l+r)>>1;let used=1,sum=0;for(const x of a){if(sum+x>m){used++;sum=0;}sum+=x;}if(used<=d)r=m;else l=m+1;}console.log(l);`
    },
    {
        title: 'Median of Two Sorted Arrays',
        description: `Given two nondecreasing integer arrays, print the median of all their values together. Print an integer without a decimal point when the median is whole; otherwise print .5.\n\nInput\n- Line 1: integer n\n- Line 2: n sorted integers\n- Line 3: integer m\n- Line 4: m sorted integers\n\nOutput\nThe median.`,
        testCases: [
            { input: '2\n1 3\n1\n2', expectedOutput: '2', isHidden: false },
            { input: '2\n1 2\n2\n3 4', expectedOutput: '2.5', isHidden: false },
            { input: '1\n0\n1\n0', expectedOutput: '0', isHidden: false },
            { input: '3\n-5 -3 0\n4\n1 2 3 4', expectedOutput: '1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),m=t[n+1],b=t.slice(n+2,n+2+m),v=[...a,...b].sort((x,y)=>x-y),k=v.length;console.log(k%2?v[k>>1]:(v[k/2-1]+v[k/2])/2);`
    },
    {
        title: 'Two Sum II - Input Array Is Sorted',
        description: `Given a nondecreasing array and a target, print the one-based indices of two different elements whose sum equals the target. Exactly one answer exists.\n\nInput\n- Line 1: integer n\n- Line 2: n sorted integers\n- Line 3: target integer\n\nOutput\nTwo one-based indices, separated by a space.`,
        testCases: [
            { input: '4\n2 7 11 15\n9', expectedOutput: '1 2', isHidden: false },
            { input: '3\n2 3 4\n6', expectedOutput: '1 3', isHidden: false },
            { input: '2\n-1 0\n-1', expectedOutput: '1 2', isHidden: false },
            { input: '5\n1 2 4 6 10\n16', expectedOutput: '4 5', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),x=t[n+1];let l=0,r=n-1;while(a[l]+a[r]!==x)a[l]+a[r]<x?l++:r--;console.log((l+1)+' '+(r+1));`
    },
    {
        title: '3Sum Closest',
        description: `Choose three distinct values whose sum is closest to target. Print that sum. Inputs are chosen so the closest sum is unique.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n- Line 3: target integer\n\nOutput\nOne integer: the closest three-value sum.`,
        testCases: [
            { input: '4\n-1 2 1 -4\n1', expectedOutput: '2', isHidden: false },
            { input: '3\n0 0 0\n1', expectedOutput: '0', isHidden: false },
            { input: '4\n1 1 1 0\n-100', expectedOutput: '2', isHidden: false },
            { input: '5\n-3 -2 -5 3 -4\n-1', expectedOutput: '-2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1).sort((x,y)=>x-y),x=t[n+1];let best=a[0]+a[1]+a[2];for(let i=0;i<n-2;i++){let l=i+1,r=n-1;while(l<r){const s=a[i]+a[l]+a[r];if(Math.abs(s-x)<Math.abs(best-x))best=s;if(s<x)l++;else if(s>x)r--;else{best=s;l=r;}}}console.log(best);`
    },
    {
        title: 'Remove Element',
        description: `Remove every occurrence of value val from the array conceptually while preserving the order of the remaining values. Print their count, then the remaining values.\n\nInput\n- Line 1: integer n\n- Line 2: n integers\n- Line 3: integer val\n\nOutput\n- Line 1: count of remaining values\n- Line 2: remaining values separated by spaces (blank when none remain).`,
        testCases: [
            { input: '4\n3 2 2 3\n3', expectedOutput: '2\n2 2', isHidden: false },
            { input: '8\n0 1 2 2 3 0 4 2\n2', expectedOutput: '5\n0 1 3 0 4', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '0', isHidden: false },
            { input: '3\n1 2 3\n4', expectedOutput: '3\n1 2 3', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=t.slice(1,n+1),v=t[n+1],out=a.filter(x=>x!==v);console.log(out.length+(out.length?'\\n'+out.join(' '):''));`
    },
    {
        title: 'Minimum Size Subarray Sum',
        description: `All array values are positive. Print the smallest length of a contiguous subarray whose sum is at least target. Print 0 if none exists.\n\nInput\n- Line 1: integers n and target\n- Line 2: n positive integers\n\nOutput\nOne integer: the minimum length.`,
        testCases: [
            { input: '6 7\n2 3 1 2 4 3', expectedOutput: '2', isHidden: false },
            { input: '1 4\n1', expectedOutput: '0', isHidden: false },
            { input: '5 11\n1 1 1 1 1', expectedOutput: '0', isHidden: false },
            { input: '8 15\n5 1 3 5 10 7 4 9 2', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],x=t[1],a=t.slice(2,2+n);let l=0,sum=0,best=Infinity;for(let r=0;r<n;r++){sum+=a[r];while(sum>=x){best=Math.min(best,r-l+1);sum-=a[l++];}}console.log(best===Infinity?0:best);`
    },
    {
        title: 'Jump Game',
        description: `Each array value gives the farthest jump length from that position. Starting at index 0, print true if the final index can be reached, otherwise false.\n\nInput\n- Line 1: integer n\n- Line 2: n nonnegative integers\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '5\n2 3 1 1 4', expectedOutput: 'true', isHidden: false },
            { input: '5\n3 2 1 0 4', expectedOutput: 'false', isHidden: false },
            { input: '1\n0', expectedOutput: 'true', isHidden: false },
            { input: '4\n2 0 0 0', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let far=0;for(let i=0;i<a.length&&i<=far;i++)far=Math.max(far,i+a[i]);console.log(far>=a.length-1?'true':'false');`
    },
    {
        title: 'Jump Game II',
        description: `Each array value gives the farthest jump length from that position. The final index is reachable. Print the minimum number of jumps needed from index 0.\n\nInput\n- Line 1: integer n\n- Line 2: n nonnegative integers\n\nOutput\nOne integer: the minimum jumps.`,
        testCases: [
            { input: '5\n2 3 1 1 4', expectedOutput: '2', isHidden: false },
            { input: '2\n2 3', expectedOutput: '1', isHidden: false },
            { input: '1\n0', expectedOutput: '0', isHidden: false },
            { input: '6\n1 2 3 4 5 0', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1);let jumps=0,end=0,far=0;for(let i=0;i<a.length-1;i++){far=Math.max(far,i+a[i]);if(i===end){jumps++;end=far;}}console.log(jumps);`
    },
    {
        title: 'Gas Station',
        description: `At station i you gain gas[i] fuel and spend cost[i] fuel to drive to the next station in a circle. Print the unique starting index from which a complete circuit is possible, or -1 if none exists.\n\nInput\n- Line 1: integer n\n- Line 2: n gas amounts\n- Line 3: n travel costs\n\nOutput\nOne integer: the starting index or -1.`,
        testCases: [
            { input: '5\n1 2 3 4 5\n3 4 5 1 2', expectedOutput: '3', isHidden: false },
            { input: '3\n2 3 4\n3 4 3', expectedOutput: '-1', isHidden: false },
            { input: '1\n5\n4', expectedOutput: '0', isHidden: false },
            { input: '4\n5 1 2 3\n4 4 1 5', expectedOutput: '-1', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],g=t.slice(1,n+1),c=t.slice(n+1,n+n+1);let total=0,tank=0,start=0;for(let i=0;i<n;i++){const d=g[i]-c[i];total+=d;tank+=d;if(tank<0){start=i+1;tank=0;}}console.log(total<0?-1:start);`
    },
    {
        title: 'Candy',
        description: `Each child has a rating. Give every child at least one candy, and give a child more candy than each adjacent child with a lower rating. Print the minimum total candies needed.\n\nInput\n- Line 1: integer n\n- Line 2: n ratings\n\nOutput\nOne integer: the minimum total candies.`,
        testCases: [
            { input: '3\n1 0 2', expectedOutput: '5', isHidden: false },
            { input: '3\n1 2 2', expectedOutput: '4', isHidden: false },
            { input: '5\n1 3 4 5 2', expectedOutput: '11', isHidden: false },
            { input: '7\n1 2 87 87 87 2 1', expectedOutput: '13', isHidden: true }
        ],
        referenceJavaScript: `const a=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number).slice(1),c=Array(a.length).fill(1);for(let i=1;i<a.length;i++)if(a[i]>a[i-1])c[i]=c[i-1]+1;for(let i=a.length-2;i>=0;i--)if(a[i]>a[i+1])c[i]=Math.max(c[i],c[i+1]+1);console.log(c.reduce((s,x)=>s+x,0));`
    },
    {
        title: 'Non-overlapping Intervals',
        description: `Given closed intervals, print the fewest intervals that must be removed so no two remaining intervals overlap. Intervals that touch at an endpoint do not overlap.\n\nInput\n- Line 1: integer n\n- Next n lines: start and end\n\nOutput\nOne integer: the minimum removals.`,
        testCases: [
            { input: '3\n1 2\n2 3\n3 4', expectedOutput: '0', isHidden: false },
            { input: '3\n1 2\n1 2\n1 2', expectedOutput: '2', isHidden: false },
            { input: '2\n1 2\n2 3', expectedOutput: '0', isHidden: false },
            { input: '4\n1 100\n11 22\n1 11\n2 12', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=[];for(let i=0;i<n;i++)a.push([t[1+2*i],t[2+2*i]]);a.sort((x,y)=>x[1]-y[1]);let end=-Infinity,removed=0;for(const [s,e] of a)if(s<end)removed++;else end=e;console.log(removed);`
    },
    {
        title: 'Queue Reconstruction by Height',
        description: `Each person is described by height h and k, the number of people in front of them whose height is at least h. Reconstruct the unique queue.\n\nInput\n- Line 1: integer n\n- Next n lines: h and k\n\nOutput\nn lines, each containing h and k in queue order.`,
        testCases: [
            { input: '6\n7 0\n4 4\n7 1\n5 0\n6 1\n5 2', expectedOutput: '5 0\n7 0\n5 2\n6 1\n4 4\n7 1', isHidden: false },
            { input: '4\n6 0\n5 1\n4 2\n3 3', expectedOutput: '6 0\n5 1\n4 2\n3 3', isHidden: false },
            { input: '1\n9 0', expectedOutput: '9 0', isHidden: false },
            { input: '3\n5 0\n5 1\n5 2', expectedOutput: '5 0\n5 1\n5 2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=[];for(let i=0;i<n;i++)a.push([t[1+2*i],t[2+2*i]]);a.sort((x,y)=>y[0]-x[0]||x[1]-y[1]);const out=[];for(const p of a)out.splice(p[1],0,p);console.log(out.map(p=>p.join(' ')).join('\\n'));`
    },
    {
        title: 'Minimum Number of Arrows to Burst Balloons',
        description: `Each balloon is a closed horizontal interval. One vertical arrow bursts every balloon whose interval contains its x-coordinate. Print the fewest arrows needed to burst all balloons.\n\nInput\n- Line 1: integer n\n- Next n lines: interval start and end\n\nOutput\nOne integer: the minimum arrows.`,
        testCases: [
            { input: '4\n10 16\n2 8\n1 6\n7 12', expectedOutput: '2', isHidden: false },
            { input: '4\n1 2\n3 4\n5 6\n7 8', expectedOutput: '4', isHidden: false },
            { input: '2\n1 2\n2 3', expectedOutput: '1', isHidden: false },
            { input: '3\n-2147483648 2147483647\n0 1\n2 3', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: `const t=require('fs').readFileSync(0,'utf8').trim().split(/\\s+/).map(Number),n=t[0],a=[];for(let i=0;i<n;i++)a.push([t[1+2*i],t[2+2*i]]);a.sort((x,y)=>x[1]-y[1]);let arrows=0,end=-Infinity;for(const [s,e] of a)if(s>end){arrows++;end=e;}console.log(arrows);`
    }
];
