
function Node(v) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = "red";
    this.value = v;
};

function RBTree() {
    this.root = null; 
} 
RBTree.prototype.insert = function(v) {
    var node = new Node(v);
    if(this.root == null) {
        this.root = node;
    }
    else {
        var inserter = function myself(node, newNode) {
            if(node.value >= newNode.value) {
                if(node.left == null) {
                    node.left = newNode;
                }
                else {
                    myself(node.left, newNode);
                }
            }
            else {
                if(node.right == null) {
                    node.right = newNode;
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
        if(node == null) {
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

tree.insert(3);
tree.insert(5);
tree.insert(1);
tree.insert(8);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.show();