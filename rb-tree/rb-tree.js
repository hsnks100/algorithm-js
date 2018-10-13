
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


function grandparent(n) {
    if ((n !== null) && (n.parent !== null))
        return n.parent.parent;
    else
        return null;
}

function uncle(n) {
    var g = grandparent(n);
    if (g === null)
        return null; // No grandparent means no uncle
    if (n.parent == g.left)
        return g.right;
    else
        return g.left;
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
                    console.log("insert!!");
                }
                else {
                    myself(node.left, newNode);
                }
            }
            else {
                if(node.right === null) {
                    node.right = newNode;
                    newNode.parent = node;
                    console.log("insert!!");
                }
                else {
                    myself(node.right, newNode);
                }
            }

        };
        inserter(this.root, node);
    } 
    this.insertCase1(node); 
    // console.log(node.value, "was fixed");
};

RBTree.prototype.insertCase1 = function(n) {
    if (n.parent === null)
        n.color = "black";
    else
        this.insertCase2(n);
};


RBTree.prototype.insertCase2 = function(n){
    if (n.parent.color == "black")
        return; /* Tree is still valid */
    else
        this.insertCase3(n);
};

RBTree.prototype.insertCase3 = function(n) {
    var u = uncle(n);

    if ((u !== null) && (u.color === "red")) {
        // recoloring process, it may need recursive process.
        n.parent.color = "black";
        u.color = "black";
        var g = grandparent(n);
        g.color = "red";
        this.insertCase1(g);
    } else {
        this.insertCase4(n);
    }
};


RBTree.prototype.rotateLeft = function(n) {
    var c = n.right;
    var p = n.parent;

    if (c.left !== null)
        c.left.parent = n;

    n.right = c.left;
    n.parent = c;
    c.left = n;
    c.parent = p;

    if (p !== null) {
        if (p.left === n)
            p.left = c;
        else
            p.right = c;
    }
    else {
        this.root = c;
    }
};

RBTree.prototype.rotateRight = function(n) {
    var c = n.left;
    var p = n.parent;

    if (c.right !== null)
        c.right.parent = n;

    n.left = c.right;
    n.parent = c;
    c.right = n;
    c.parent = p;

    if (p !== null) {
        if (p.right == n)
            p.right = c;
        else
            p.left = c;
    }
    else {
        this.root = c;
    }
};

RBTree.prototype.insertCase4 = function(n) {
    var g = grandparent(n);

    // To make / or \ shape
    // case: < shape, the tail is node;
    if ((n === n.parent.right) && (n.parent === g.left)) {
        this.rotateLeft(n.parent);
        n = n.left;
    } 
    // case: > shape, the tail is node;
    else if ((n === n.parent.left) && (n.parent === g.right)) {
        this.rotateRight(n.parent);
        n = n.right;
    }
    this.insertCase5(n);
};


RBTree.prototype.insertCase5 = function(n) {
    // re-construuct process
    var g = grandparent(n);

    n.parent.color = "black";
    g.color = "red";
    

    // shape: / or \, rotate top position(left or right).
    if (n === n.parent.left)
        this.rotateRight(g);
    else
        this.rotateLeft(g);
};

RBTree.prototype.show = function() {

    console.log(this.root);
    var idstr = 'id';
    var cnt = 0;
    s.graph.clear();
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
                                type: "arrow",
                                color: "#000"


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

var i = 0;
function ins() {
    setTimeout(function() {
        i++;
        tree.insert(i);
        tree.show(); 
        s.refresh();
        if(i<10) {
            ins();
        }
    }, 2000);

}
ins();
