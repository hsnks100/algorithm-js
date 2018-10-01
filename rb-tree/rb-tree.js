
var s = new sigma('container');
function Node(v) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = "red";
    this.value = v;
}

function RBTree() {
    this.root = null; 
} 

RBTree.prototype.insert = function(v) {
    var node = new Node(v);
    if(this.root === null) {
        this.root = node;
    }
    else {
        var inserter = function myself(node, newNode) {
            if(node.value >= newNode.value) {
                if(node.left === null) {
                    node.left = newNode;
                    newNode.parent = node;
                }
                else {
                    myself(node.left, newNode);
                }
            }
            else {
                if(node.right === null) {
                    node.right = newNode;
                    newNode.parent = node;
                }
                else {
                    myself(node.right, newNode);
                }
            }

        };
        inserter(this.root, node);
    } 
    this.fix(node); 
};

RBTree.prototype.rotateLeft = function(root) {
    var temp = root.right; 
    var rootParent = root.parent;

    var beta = temp.left;
    root.right = beta;
    if(beta !== null) {
        beta.parent = root;
    }

    temp.left = root;
    root.parent = temp;

    if(rootParent.right === root) {
        rootParent.right = temp;
    }
    else {
        rootParent.left = temp;
    } 
};

RBTree.prototype.rotateRight = function(pivot) {
    var pivotParent = pivot.parent;
    var pivotRight = pivot.right;
    var pivotParentParent = pivot.parent.parent;
    pivot.right = pivotParent;
    pivotParent.parent = pivot;

    pivotParent.left = pivotRight;
    if(pivotRight !== null) {
        pivotRight.parent = pivotParent;
    }

    if(pivotParentParent === null) {
        this.root = pivotParent;
        pivotParent.parent = null;
    }
    else {
        if(pivotParentParent.right === pivotParent) {
            pivotParentParent.right = pivot;
            pivot.parent = pivotParentParent;
        }
        else {
            pivotParentParent.left = pivot;
            pivot.parent = pivotParentParent;
        }
    } 
};

RBTree.prototype.fix = function(node) {
    console.log("fix value: ", node.value);
    if(node === this.root) {
        node.color = "black";
    }
    else {
        if(node.parent.color === "red") {
            console.log("it(", node.value, ")", "needs to be fixed.");

            /*
                         R
                        /
                       N 
              */
            // > shape
            if(node.parent.left === node && node.parent.parent.right === node.parent) {
                console.log("> shape");
                var pivot = node;
                this.rotateRight(pivot);
                // this.rotateLeft(node);
                // pivotParent.right = node;
                // node.parent = pivotParent; 
                // this.rotateLeft(pivotParent);
                
                
                // pivot.parent.right = newPivot;
                // newPivot.parent = pivot.parent;
                // this.rotateLeft(newPivot);
            }
            // / shape
            else if(node.parent.left === node && node.parent.parent.left === node.parent) {
                console.log("/ shape");
                var pivot = node.parent;
                var newPivot = this.rotateRight(pivot);
                node.parent.parent.left = newPivot;
            }
            // \ shape
            else if(node.parent.right === node && node.parent.parent.right === node.parent) {
                console.log("\ shape");
                var pivot = node.parent;
                var newPivot = this.rotateLeft(pivot);
                node.parent.parent.right = newPivot;
            }
            // < shape
            else if(node.parent.right === node && node.parent.parent.left === node.parent) {
                console.log("< shape");
                var pivot = node.parent;
                var newPivot = this.rotateLeft(pivot);
                node.parent.parent.left = newPivot;
                this.rotateRight(newPivot);
            }
            
        } 
    } 
};
RBTree.prototype.insertBinary = function(v) {
    var node = new Node(v);
    if(this.root === null) {
        this.root = node;
    }
    else {
        var inserter = function myself(node, newNode) {
            if(node.value >= newNode.value) {
                if(node.left === null) {
                    node.left = newNode;
                    newNode.parent = node;
                }
                else {
                    myself(node.left, newNode);
                }
            }
            else {
                if(node.right === null) {
                    node.right = newNode;
                    newNode.parent = node;
                }
                else {
                    myself(node.right, newNode);
                }
            }

        };
        inserter(this.root, node);

    }
}; 


RBTree.prototype.show = function() {
    var idstr = 'id';
    var cnt = 0;
    var shower = function myself(node, depth, parentID) {
        if(node === null) {
        }
        else {

            s.graph.addNode({
                // Main attributes:
                id: idstr + cnt,
                label: '' + node.value,
                // Display attributes:
                size: 1,
                color: '#f00'
            });

            s.graph.addEdge({
                id: 'e' + cnt,
                // Reference extremities:
                source: parentID,
                target: idstr + cnt
            });

            var myID = idstr + cnt;
            cnt++;
            // var logStr = "";
            // if(node.color === "red") {
            //     logStr = "<font color=\"red\">";
            // }
            // else {
            //     logStr = "<font color=\"black\">";
            // }
            // console.log("depth: ", depth);
            // for(var i=0; i<depth; i++) {
            //     logStr += "&gt;";
            // }
            // logStr += node.value;
            // logStr += "</font>";
            // window.document.write(logStr + "</br>");
            // console.log(logStr);
            myself(node.left, depth + 1, myID);
            myself(node.right, depth + 1, myID);
        }

    };
    shower(this.root, 0);
};

var tree = new RBTree();

// 8 18 5 15 17 25 40 80
tree.insert(8);
tree.insert(18);
tree.insert(5);
tree.insert(15);

console.log(tree);
// tree.insertBinary(3);
// tree.insertBinary(5);
// tree.insertBinary(1);
// tree.insertBinary(8);
// tree.insertBinary(7);
// tree.insertBinary(2);
// tree.insertBinary(4);
// tree.show();




// Let's first initialize sigma:

// // Then, let's add some data to display:
s.graph.addNode({
    // Main attributes:
    id: 'n0',
    label: 'Hello',
    x:0,
    y:0,
    // Display attributes:
    size: 1,
    color: '#f00'
});
s.graph.addNode({
    // Main attributes:
    id: 'n1',
    label: 'World !',
    x:1,
    y:1,
    // Display attributes:
    size: 1,
    color: '#00f'
});

s.graph.addEdge({
    id: 'e0',
    // Reference extremities:
    source: 'n0',
    target: 'n1'
});

// Finally, let's ask our sigma instance to refresh:
s.refresh();
