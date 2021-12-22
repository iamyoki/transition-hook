export type Canceller = {
  id?: number;
};

export function setAnimationFrameTimeout(
  callback: Function,
  timeout: number = 0
) {
  const startTime = performance.now();
  const canceller: Canceller = {};

  function call() {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback();
      } else {
        call();
      }
    });
  }

  call();
  return canceller;
}

export function clearAnimationFrameTimeout(canceller: Canceller) {
  if (canceller.id) cancelAnimationFrame(canceller.id);
}
