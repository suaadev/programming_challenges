class Node {
    constructor(previus, value, next) {
        this.value = value
        this.previus = previus
        this.next = next
    }
    getPrevius() {
        return this.previus
    }
    getNext() {
        return this.next
    }
    getValue() {
        return this.value
    }
    setNext(next) {
        this.next = next
    }
    setPrevius(previus) {
        this.previus = previus
    }
}


class LinkedList {
    constructor() {
        this.head = null
        this.size = -1
    }
    get(index) {
        if (index < 0 || this.size === -1) {
            throw new Error('IndexOutBounds')
        }
        let i = 0
        let current = this.head
        while (current && i < index) {
            current = current.getNext()
            i += 1
        }
        if (!current) {
            throw new Error('IndexOutBounds')
        }
        return current.getValue()
    }
    insert(value) {
        if (!this.head) {
            this.head = new Node(null, value, null)
            this.size = 1
        } else {
            let current = this.head
            while (current.getNext()) {
                current = current.getNext()
            }
            const new_node = new Node(current, value, null)
            current.setNext(new_node)
            this.size++
        }

    }
    delete(index) {
        if (index < 0) {
            throw new Error('IndexOutBounds')
        }
        let i = 0
        let previus = null
        let current = this.head
        while (current && i < index) {
            previus = current
            current = current.getNext()
            i += 1
        }
        if (!current) {
            throw new Error('IndexOutBounds')
        }

        //aislo el nodo eliminando las referencia hacia el y interconecto los extremos
        let next_current = current.getNext()
        if (!previus) {
            current.setNext(null)
            this.head = next_current
        } else {
            previus.setNext(next_current)
            current.setNext(null)
        }
        this.size--
    }
    getSize() {
        return this.size
    }
}

let test = new LinkedList()
test.insert(1)
test.insert(2)
test.insert(3)
test.insert(4)
test.insert(5)
test.insert(6)
test.insert(7)
test.delete(0)
test.delete(0)
test.delete(4)

for (let i = 0; i < test.getSize(); i++) {
    const element = test.get(i);
    console.log(element);

}
