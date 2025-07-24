self.onmessage = (e) => {
    const { buffer, workerId } = e.data;
    const sharedArray = new Int32Array(buffer);
    const increments = 100000; // Number of times each worker increments

    self.postMessage({ type: 'log', workerId: workerId, message: `Worker ${workerId} starting increments...` });

    for (let i = 0; i < increments; i++) {
        // Atomically increment the value at index 0
        Atomics.add(sharedArray, 0, 1);
    }

    self.postMessage({ type: 'completed', workerId: workerId });
};
