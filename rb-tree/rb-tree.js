
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
            if(node.value > newNode.value) {
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
    console.log(node.value, "was fixed");
};

RBTree.prototype.rotateLeft = function(pivot) {
    var pivotParent = pivot.parent;
    var pivotLeft = pivot.left;
    var pivotParentParent = pivot.parent.parent;
    pivot.left = pivotParent;
    pivotParent.parent = pivot;

    pivotParent.right = pivotLeft;
    if(pivotLeft !== null) {
        pivotLeft.parent = pivotParent;
    }

    if(pivotParentParent === null) {
        this.root = pivot;
        pivot.parent = null;
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
        this.root = pivot;
        pivot.parent = null;
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
        while(node.parent.color === "red") {
            console.log("it(", node.value, ")", "needs to be fixed.");
            var U = null;
            if(node.parent.parent.right === node.parent) {
                U = node.parent.parent.left;
            }
            else {
                U = node.parent.parent.right;
            }

            if(U !== null && U.color === "red") {
                U.color = "black";
                node.parent.color = "black";
                node.parent.parent.color = "red";
                if(node.parent.parent === this.root) {
                    node.parent.parent.color = "black";
                    break;
                }
                node = node.parent.parent;
            }
            else {
                // > shape
                if(node.parent.left === node && node.parent.parent.right === node.parent) {
                    console.log("> shape");
                    var pivot = node;
                    this.rotateRight(pivot);
                    this.rotateLeft(node); 
                    node.left.color = "red";
                    node.right.color = "red";
                    node.color = "black";
                    //if(this.root === node) {
                        //node.color = "black";
                    //}
                }
                // < shape
                else if(node.parent.right === node && node.parent.parent.left === node.parent) {
                    console.log("< shape");
                    var pivot = node;
                    this.rotateLeft(pivot);
                    this.rotateRight(node); 
                    node.left.color = "red";
                    node.right.color = "red";
                    node.color = "black";
                }
                // / shape
                else if(node.parent.left === node && node.parent.parent.left === node.parent) {
                    console.log("/ shape");
                    var pivot = node.parent;
                    this.rotateRight(pivot);
                    pivot.left.color = "red";
                    pivot.right.color = "red";
                    pivot.color = "black";
                }
                // \ shape
                else if(node.parent.right === node && node.parent.parent.right === node.parent) {
                    console.log("\ shape");
                    var pivot = node.parent;
                    this.rotateLeft(pivot);
                    pivot.left.color = "red";
                    pivot.right.color = "red";
                    pivot.color = "black";
                }

                break;
            }
        } 
    } 
};


RBTree.prototype.show = function() {
    var idstr = 'id';
    var cnt = 0;
    var shower = function myself(node, depth, parentID, xPos) {
        if(node === null) {
        }
        else {
            var color = '';
            if(node.color === "red") {
                color = '#f00';
            }
            else {
                color = '#000';
            }
            s.graph.addNode({
                // Main attributes:
                id: idstr + cnt,
                x: xPos*2.0,
                y: depth*2.0,
                label: '' + node.value,
                // Display attributes:
                size: 30,
                color: color
            });

            console.log(parentID, "->", idstr + cnt);
            if(parentID !== '') {
                s.graph.addEdge({
                                id: 'e' + cnt,
                                // Reference extremities:
                                source: parentID,
                                target: idstr + cnt,
                                type: "arrow"


                });
            }

            var myID = idstr + cnt;
            cnt++;
            myself(node.left, depth + 1, myID, xPos - 0.5 / (depth + 1));
            myself(node.right, depth + 1, myID, xPos + 0.5 / (depth + 1));
        }

    };
    shower(this.root, 0, '', 0);
};

var tree = new RBTree();

for(var i=1; i<=9; i++) {
    tree.insert(i);
}
for(var i=8; i>=1; i--) {
    tree.insert(i);
}
tree.show(); 
s.refresh();
