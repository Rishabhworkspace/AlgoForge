import type { TerminalProblem } from './terminalCatalog';

// Every tree is supplied as: line 1 = count, line 2 = level-order values.
// Use the literal `null` for a missing child; trailing nulls are optional.
const treeRuntime = String.raw`const lines=require('fs').readFileSync(0,'utf8').trimEnd().split(/\r?\n/);const values=i=>(lines[i]||'').trim().split(/\s+/).filter(Boolean).map(x=>x==='null'?null:Number(x));const build=a=>{if(!a.length||a[0]===null)return null;const r={v:a[0],l:null,r:null},q=[r];let i=1;for(let h=0;h<q.length&&i<a.length;h++){const n=q[h];for(const k of ['l','r'])if(i<a.length){const v=a[i++];if(v!==null)q.push(n[k]={v,l:null,r:null});}}return r;};const level=r=>{if(!r)return 'null';const a=[],q=[r];for(let h=0;h<q.length;h++){const n=q[h];if(n){a.push(n.v);q.push(n.l,n.r);}else a.push(null);}while(a.at(-1)===null)a.pop();return a.map(x=>x===null?'null':x).join(' ');};`;
const treeProgram = (body: string) => `${treeRuntime}${body}`;

export const terminalCatalogTreeBatch: TerminalProblem[] = [
    {
        title: 'Maximum Depth of Binary Tree',
        description: `Given a binary tree, print its maximum depth: the number of nodes on the longest path from the root to a leaf.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: space-separated integer values; use null for a missing child\n\nOutput\nOne integer.`,
        testCases: [
            { input: '7\n3 9 20 null null 15 7', expectedOutput: '3', isHidden: false },
            { input: '1\n1', expectedOutput: '1', isHidden: false },
            { input: '1\nnull', expectedOutput: '0', isHidden: false },
            { input: '8\n1 2 null 3 null 4 null 5', expectedOutput: '5', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const depth=n=>n?1+Math.max(depth(n.l),depth(n.r)):0;console.log(depth(build(values(1))));`)
    },
    {
        title: 'Same Tree',
        description: `Given two binary trees, print true when they have identical structure and values; otherwise print false.\n\nTree input convention\n- Line 1: position count of the first tree\n- Line 2: its level-order values, using null for missing children\n- Line 3: position count of the second tree\n- Line 4: its level-order values, using null for missing children\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '7\n1 2 3 null null 4 5\n7\n1 2 3 null null 4 5', expectedOutput: 'true', isHidden: false },
            { input: '3\n1 2 3\n3\n1 2 4', expectedOutput: 'false', isHidden: false },
            { input: '1\nnull\n1\nnull', expectedOutput: 'true', isHidden: false },
            { input: '4\n1 2 null 3\n5\n1 2 null null 3', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const same=(a,b)=>!a||!b?a===b:a.v===b.v&&same(a.l,b.l)&&same(a.r,b.r);console.log(same(build(values(1)),build(values(3)))?'true':'false');`)
    },
    {
        title: 'Invert Binary Tree',
        description: `Invert a binary tree by swapping every node's left and right child. Print the inverted tree in level order.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nLevel-order values separated by spaces, using null for internal missing children and no trailing null values.`,
        testCases: [
            { input: '7\n4 2 7 1 3 6 9', expectedOutput: '4 7 2 9 6 3 1', isHidden: false },
            { input: '3\n2 1 3', expectedOutput: '2 3 1', isHidden: false },
            { input: '1\nnull', expectedOutput: 'null', isHidden: false },
            { input: '6\n1 2 3 null 4 5', expectedOutput: '1 3 2 null 5 4', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const flip=n=>{if(n){[n.l,n.r]=[flip(n.r),flip(n.l)];}return n;};console.log(level(flip(build(values(1)))));`)
    },
    {
        title: 'Binary Tree Level Order Traversal',
        description: `Return the values of a binary tree level by level, from left to right.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nA compact JSON array of arrays, one array per level.`,
        testCases: [
            { input: '7\n3 9 20 null null 15 7', expectedOutput: '[[3],[9,20],[15,7]]', isHidden: false },
            { input: '1\n1', expectedOutput: '[[1]]', isHidden: false },
            { input: '1\nnull', expectedOutput: '[]', isHidden: false },
            { input: '7\n1 2 3 4 null null 5', expectedOutput: '[[1],[2,3],[4,5]]', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const r=build(values(1)),out=[];if(r)for(let q=[r];q.length;){out.push(q.map(n=>n.v));q=q.flatMap(n=>[n.l,n.r].filter(Boolean));}console.log(JSON.stringify(out));`)
    },
    {
        title: 'Lowest Common Ancestor of a Binary Tree',
        description: `Given a binary tree with distinct values and two existing node values p and q, print the value of their lowest common ancestor.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n- Line 3: p and q\n\nOutput\nOne integer.`,
        testCases: [
            { input: '11\n3 5 1 6 2 0 8 null null 7 4\n5 1', expectedOutput: '3', isHidden: false },
            { input: '11\n3 5 1 6 2 0 8 null null 7 4\n5 4', expectedOutput: '5', isHidden: false },
            { input: '3\n1 2 3\n2 3', expectedOutput: '1', isHidden: false },
            { input: '7\n1 2 3 4 5 6 7\n4 5', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const [p,q]=values(2),lca=n=>{if(!n||n.v===p||n.v===q)return n;const a=lca(n.l),b=lca(n.r);return a&&b?n:a||b;};console.log(lca(build(values(1))).v);`)
    },
    {
        title: 'Validate Binary Search Tree',
        description: `Print true if a binary tree is a valid binary search tree: every left value is smaller and every right value is larger than its ancestor. Values are distinct.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '3\n2 1 3', expectedOutput: 'true', isHidden: false },
            { input: '7\n5 1 4 null null 3 6', expectedOutput: 'false', isHidden: false },
            { input: '1\nnull', expectedOutput: 'true', isHidden: false },
            { input: '7\n10 5 15 null null 6 20', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const ok=(n,lo=-Infinity,hi=Infinity)=>!n||(lo<n.v&&n.v<hi&&ok(n.l,lo,n.v)&&ok(n.r,n.v,hi));console.log(ok(build(values(1)))?'true':'false');`)
    },
    {
        title: 'Subtree of Another Tree',
        description: `Print true if the second binary tree occurs as a subtree of the first, with the same structure and values. An empty second tree is a subtree.\n\nTree input convention\n- Lines 1-2: first tree count and level-order values\n- Lines 3-4: second tree count and level-order values\n- Use null for a missing child\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '5\n3 4 5 1 2\n3\n4 1 2', expectedOutput: 'true', isHidden: false },
            { input: '10\n3 4 5 1 2 null null null null 0\n3\n4 1 2', expectedOutput: 'false', isHidden: false },
            { input: '1\n1\n1\nnull', expectedOutput: 'true', isHidden: false },
            { input: '5\n1 1 1 1 1\n3\n1 1 1', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const eq=(a,b)=>!a||!b?a===b:a.v===b.v&&eq(a.l,b.l)&&eq(a.r,b.r),has=(a,b)=>!b||!!a&&(eq(a,b)||has(a.l,b)||has(a.r,b));console.log(has(build(values(1)),build(values(3)))?'true':'false');`)
    },
    {
        title: 'Construct Binary Tree from Preorder and Inorder Traversal',
        description: `Given preorder and inorder traversals of a binary tree with distinct integer values, reconstruct the tree and print its level order.\n\nInput\n- Line 1: integer n\n- Line 2: n preorder values\n- Line 3: n inorder values\n\nOutput\nLevel-order values separated by spaces. Use null for internal missing children and omit trailing null values.`,
        testCases: [
            { input: '5\n3 9 20 15 7\n9 3 15 20 7', expectedOutput: '3 9 20 null null 15 7', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '3\n1 2 3\n3 2 1', expectedOutput: '1 2 null 3', isHidden: false },
            { input: '4\n1 2 4 3\n4 2 1 3', expectedOutput: '1 2 3 4', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const pre=values(1),ino=values(2),pos=new Map(ino.map((v,i)=>[v,i]));let i=0;const make=(l,r)=>{if(l>r)return null;const v=pre[i++],m=pos.get(v),n={v,l:null,r:null};n.l=make(l,m-1);n.r=make(m+1,r);return n;};console.log(level(make(0,ino.length-1)));`)
    },
    {
        title: 'Binary Tree Maximum Path Sum',
        description: `A path may start and end at any nodes but cannot reuse an edge. Print the largest sum of values along any non-empty path in the binary tree.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nOne integer.`,
        testCases: [
            { input: '3\n1 2 3', expectedOutput: '6', isHidden: false },
            { input: '7\n-10 9 20 null null 15 7', expectedOutput: '42', isHidden: false },
            { input: '1\n-3', expectedOutput: '-3', isHidden: false },
            { input: '3\n2 -1 -2', expectedOutput: '2', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`let best=-Infinity;const gain=n=>{if(!n)return 0;const l=Math.max(0,gain(n.l)),r=Math.max(0,gain(n.r));best=Math.max(best,n.v+l+r);return n.v+Math.max(l,r);};gain(build(values(1)));console.log(best);`)
    },
    {
        title: 'Serialize and Deserialize Binary Tree',
        description: `Serialize a binary tree and then deserialize it. Print the reconstructed tree in canonical level order. This checks that structure and values survive the round trip.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nLevel-order values separated by spaces, using null for internal missing children and no trailing null values.`,
        testCases: [
            { input: '7\n1 2 3 null null 4 5', expectedOutput: '1 2 3 null null 4 5', isHidden: false },
            { input: '1\nnull', expectedOutput: 'null', isHidden: false },
            { input: '6\n1 2 null 3 null 4', expectedOutput: '1 2 null 3 null 4', isHidden: false },
            { input: '5\n-1 0 2 null null', expectedOutput: '-1 0 2', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const serialize=n=>{if(!n)return '#';return n.v+','+serialize(n.l)+','+serialize(n.r);},deserialize=s=>{const a=s.split(','),go=()=>{const x=a.shift();if(x==='#')return null;return {v:Number(x),l:go(),r:go()};};return go();};console.log(level(deserialize(serialize(build(values(1))))));`)
    },
    {
        title: 'Kth Smallest Element in a BST',
        description: `Given a valid binary search tree and k, print its kth smallest value (one-indexed).\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n- Line 3: k\n\nOutput\nOne integer.`,
        testCases: [
            { input: '5\n3 1 4 null 2\n1', expectedOutput: '1', isHidden: false },
            { input: '8\n5 3 6 2 4 null null 1\n3', expectedOutput: '3', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '3\n2 1 3\n3', expectedOutput: '3', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const k=Number(lines[2]),a=[];const walk=n=>{if(n){walk(n.l);a.push(n.v);walk(n.r);}};walk(build(values(1)));console.log(a[k-1]);`)
    },
    {
        title: 'Binary Tree Zigzag Level Order Traversal',
        description: `Return a binary tree level by level, alternating left-to-right then right-to-left order.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nA compact JSON array of arrays, one array per level.`,
        testCases: [
            { input: '7\n3 9 20 null null 15 7', expectedOutput: '[[3],[20,9],[15,7]]', isHidden: false },
            { input: '1\n1', expectedOutput: '[[1]]', isHidden: false },
            { input: '1\nnull', expectedOutput: '[]', isHidden: false },
            { input: '7\n1 2 3 4 5 6 7', expectedOutput: '[[1],[3,2],[4,5,6,7]]', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const r=build(values(1)),out=[];if(r)for(let q=[r],d=0;q.length;d++){let a=q.map(n=>n.v);if(d%2)a.reverse();out.push(a);q=q.flatMap(n=>[n.l,n.r].filter(Boolean));}console.log(JSON.stringify(out));`)
    },
    {
        title: 'Path Sum',
        description: `Given a binary tree and a target sum, print true if any root-to-leaf path adds to the target; otherwise print false.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n- Line 3: target sum\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '13\n5 4 8 11 null 13 4 7 2 null null null 1\n22', expectedOutput: 'true', isHidden: false },
            { input: '13\n5 4 8 11 null 13 4 7 2 null null null 1\n26', expectedOutput: 'true', isHidden: false },
            { input: '1\n1\n2', expectedOutput: 'false', isHidden: false },
            { input: '3\n1 2 3\n5', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const target=Number(lines[2]),has=(n,s)=>!!n&&(!n.l&&!n.r?s+n.v===target:has(n.l,s+n.v)||has(n.r,s+n.v));console.log(has(build(values(1)),0)?'true':'false');`)
    },
    {
        title: 'Diameter of Binary Tree',
        description: `Print the diameter of a binary tree: the number of edges in the longest path between any two nodes.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nOne integer.`,
        testCases: [
            { input: '5\n1 2 3 4 5', expectedOutput: '3', isHidden: false },
            { input: '1\n1', expectedOutput: '0', isHidden: false },
            { input: '1\nnull', expectedOutput: '0', isHidden: false },
            { input: '8\n1 2 null 3 null 4 null 5', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`let best=0;const height=n=>{if(!n)return 0;const l=height(n.l),r=height(n.r);best=Math.max(best,l+r);return 1+Math.max(l,r);};height(build(values(1)));console.log(best);`)
    },
    {
        title: 'Balanced Binary Tree',
        description: `Print true when every node's left and right subtree heights differ by at most one; otherwise print false.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '7\n3 9 20 null null 15 7', expectedOutput: 'true', isHidden: false },
            { input: '9\n1 2 2 3 3 null null 4 4', expectedOutput: 'false', isHidden: false },
            { input: '1\nnull', expectedOutput: 'true', isHidden: false },
            { input: '6\n1 2 null 3 null 4', expectedOutput: 'false', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const height=n=>{if(!n)return 0;const l=height(n.l),r=height(n.r);return l<0||r<0||Math.abs(l-r)>1?-1:1+Math.max(l,r);};console.log(height(build(values(1)))>=0?'true':'false');`)
    },
    {
        title: 'Symmetric Tree',
        description: `Print true if a binary tree is a mirror of itself around its center; otherwise print false.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nThe lowercase word true or false.`,
        testCases: [
            { input: '7\n1 2 2 3 4 4 3', expectedOutput: 'true', isHidden: false },
            { input: '7\n1 2 2 null 3 null 3', expectedOutput: 'false', isHidden: false },
            { input: '1\nnull', expectedOutput: 'true', isHidden: false },
            { input: '7\n1 2 2 null 3 3 null', expectedOutput: 'true', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const mirror=(a,b)=>!a||!b?a===b:a.v===b.v&&mirror(a.l,b.r)&&mirror(a.r,b.l),r=build(values(1));console.log(mirror(r?.l,r?.r)?'true':'false');`)
    },
    {
        title: 'Binary Tree Right Side View',
        description: `Print the values visible when looking at a binary tree from its right side, ordered from top to bottom.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n\nOutput\nRight-side values separated by spaces; print an empty line for an empty tree.`,
        testCases: [
            { input: '7\n1 2 3 null 5 null 4', expectedOutput: '1 3 4', isHidden: false },
            { input: '1\n1', expectedOutput: '1', isHidden: false },
            { input: '1\nnull', expectedOutput: '', isHidden: false },
            { input: '7\n1 2 3 4 null null 5', expectedOutput: '1 3 5', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const r=build(values(1)),out=[];if(r)for(let q=[r];q.length;){out.push(q.at(-1).v);q=q.flatMap(n=>[n.l,n.r].filter(Boolean));}console.log(out.join(' '));`)
    },
    {
        title: 'Unique Binary Search Trees',
        description: `Given n distinct values 1 through n, print the number of structurally unique binary search trees that can be formed.\n\nInput\n- Line 1: integer n\n\nOutput\nOne integer.`,
        testCases: [
            { input: '1', expectedOutput: '1', isHidden: false },
            { input: '3', expectedOutput: '5', isHidden: false },
            { input: '5', expectedOutput: '42', isHidden: false },
            { input: '8', expectedOutput: '1430', isHidden: true }
        ],
        referenceJavaScript: `const n=Number(require('fs').readFileSync(0,'utf8').trim()),dp=Array(n+1).fill(0);dp[0]=dp[1]=1;for(let x=2;x<=n;x++)for(let root=1;root<=x;root++)dp[x]+=dp[root-1]*dp[x-root];console.log(dp[n]);`
    },
    {
        title: 'House Robber III',
        description: `Each tree node contains money. Robbing a node forbids robbing its direct children. Print the maximum amount that can be robbed.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: nonnegative integer values, using null for a missing child\n\nOutput\nOne integer.`,
        testCases: [
            { input: '7\n3 2 3 null 3 null 1', expectedOutput: '7', isHidden: false },
            { input: '7\n3 4 5 1 3 null 1', expectedOutput: '9', isHidden: false },
            { input: '1\n4', expectedOutput: '4', isHidden: false },
            { input: '5\n2 1 3 null 4', expectedOutput: '7', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const solve=n=>{if(!n)return [0,0];const l=solve(n.l),r=solve(n.r);return [n.v+l[1]+r[1],Math.max(...l)+Math.max(...r)];};console.log(Math.max(...solve(build(values(1)))));`)
    },
    {
        title: 'Path Sum III',
        description: `Given a binary tree and a target sum, print the number of downward paths whose node values add to the target. A path may start and end at any nodes but must go from parent to child.\n\nTree input convention\n- Line 1: number of level-order positions\n- Line 2: integer values, using null for a missing child\n- Line 3: target sum\n\nOutput\nOne integer.`,
        testCases: [
            { input: '11\n10 5 -3 3 2 null 11 3 -2 null 1\n8', expectedOutput: '3', isHidden: false },
            { input: '13\n5 4 8 11 null 13 4 7 2 null null 5 1\n22', expectedOutput: '3', isHidden: false },
            { input: '1\n1\n1', expectedOutput: '1', isHidden: false },
            { input: '8\n1 -2 -3 1 3 -2 null -1\n-1', expectedOutput: '4', isHidden: true }
        ],
        referenceJavaScript: treeProgram(`const target=Number(lines[2]),count=(n,s=0,m=new Map([[0,1]]))=>{if(!n)return 0;s+=n.v;const hit=m.get(s-target)||0;m.set(s,(m.get(s)||0)+1);const ans=hit+count(n.l,s,m)+count(n.r,s,m);m.set(s,m.get(s)-1);return ans;};console.log(count(build(values(1))));`)
    }
];
