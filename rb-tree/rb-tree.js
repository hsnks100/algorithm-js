
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

RBTree.protoype.insert = function(v) {
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
        this.fix(node); 
    } 
};


RBTree.protoype.rotateLeft = function(pivotNode) {

};

RBTree.protoype.rotateRight = function(pivotNode) {
};

RBTree.protoype.fix = function(node) {
    if(node === this.root) {
        node.color = "black";
    }
    else {

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
    var shower = function myself(node, depth) {
        if(node === null) {
        }
        else {
            var logStr = "";
            for(var i=0; i<depth; i++) {
                logStr += "&gt;";
            }
            logStr += node.value;
            window.document.write(logStr + "</br>");
            console.log(logStr);
            myself(node.left, depth + 1);
            myself(node.right, depth + 1);
        }

    };
    shower(this.root, 0);
};

var tree = new RBTree();

tree.insertBinary(3);
tree.insertBinary(5);
tree.insertBinary(1);
tree.insertBinary(8);
tree.insertBinary(7);
tree.insertBinary(2);
tree.insertBinary(4);
tree.show();
