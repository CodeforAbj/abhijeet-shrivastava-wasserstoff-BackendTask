export default class RoundRobinQueue {
  constructor() {
    this.queue = [];
    this.index = 0;
  }

  enqueue(request) {
    this.queue.push(request);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const request = this.queue[this.index];
    // Remove the request from the queue
    this.queue.splice(this.index, 1);
    // Adjust the index to point to the next request
    if (this.queue.length > 0) {
      this.index = this.index % this.queue.length;
    } else {
      this.index = 0; // Reset index if the queue is empty
    }
    return request;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
